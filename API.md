# QuickFetch API Documentation

This document describes the API endpoints available in QuickFetch.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`

## Authentication

QuickFetch does not require user authentication. However:
- Rate limiting is applied per IP address
- YouTube API key is configured server-side

## Endpoints

### POST /api/metadata

Fetch metadata for a video URL.

#### Request

```http
POST /api/metadata
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | Valid video URL (YouTube, Vimeo, or direct link) |

#### Response (Success)

```json
{
  "success": true,
  "data": {
    "id": "dQw4w9WgXcQ",
    "title": "Rick Astley - Never Gonna Give You Up",
    "description": "The official video for...",
    "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    "duration": "3:33",
    "author": "Rick Astley",
    "viewCount": 1234567890,
    "publishedAt": "2009-10-25T06:57:33Z",
    "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "platform": "youtube",
    "isEmbeddable": true
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether the request was successful |
| data | object | Video metadata (if successful) |
| data.id | string | Video ID or URL |
| data.title | string | Video title |
| data.description | string | Video description |
| data.thumbnail | string | Thumbnail image URL |
| data.duration | string | Video duration (formatted) |
| data.author | string | Channel or author name |
| data.viewCount | number | View count (if available) |
| data.publishedAt | string | Publication date (ISO 8601) |
| data.embedUrl | string | Embed URL for iframe |
| data.platform | string | Platform: "youtube", "vimeo", or "direct" |
| data.isEmbeddable | boolean | Whether video can be embedded |

#### Response (Error)

```json
{
  "success": false,
  "error": "Video not found or is private"
}
```

#### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid URL or missing parameters) |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

#### Headers

**Request Headers:**
```http
Content-Type: application/json
```

**Response Headers:**
```http
Content-Type: application/json
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1704067200000
```

## Rate Limiting

QuickFetch implements rate limiting to prevent abuse:

- **Default Limit**: 10 requests per minute per IP
- **Window**: 60 seconds (rolling)
- **Response**: HTTP 429 when exceeded

### Rate Limit Headers

Every response includes:
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Timestamp when limit resets (Unix ms)

### Rate Limit Response

```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```

## Supported Platforms

### YouTube

**URL Formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

**Requirements:**
- Valid YouTube API key configured
- Video must be public or unlisted
- Video ID must be 11 characters

**API Used:** YouTube Data API v3

### Vimeo

**URL Formats:**
- `https://vimeo.com/VIDEO_ID`

**Requirements:**
- Video must be public
- No API key required (uses oEmbed)

**API Used:** Vimeo oEmbed API

### Direct Media Links

**URL Formats:**
- `https://example.com/video.mp4`
- Supported extensions: `.mp4`, `.webm`, `.ogg`, `.mov`

**Limitations:**
- Basic metadata only
- No embedding (security)
- No view counts or detailed info

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common Errors

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Invalid URL provided" | Malformed or missing URL | Check URL format |
| "Unsupported video URL" | Platform not supported | Use YouTube, Vimeo, or direct link |
| "Video not found or is private" | Video unavailable | Check video exists and is public |
| "YouTube API quota exceeded" | API limit reached | Wait for quota reset (daily) |
| "Rate limit exceeded" | Too many requests | Wait and retry |
| "YouTube API key not configured" | Missing API key | Configure YOUTUBE_API_KEY in .env |

## Examples

### JavaScript (Fetch API)

```javascript
async function fetchVideoMetadata(url) {
  try {
    const response = await fetch('/api/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Video:', data.data.title);
      console.log('Views:', data.data.viewCount);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
fetchVideoMetadata('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
```

### JavaScript (Axios)

```javascript
const axios = require('axios');

async function fetchVideoMetadata(url) {
  try {
    const response = await axios.post('/api/metadata', { url });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
```

### cURL

```bash
curl -X POST http://localhost:3000/api/metadata \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

### Python (Requests)

```python
import requests

def fetch_video_metadata(url):
    response = requests.post(
        'http://localhost:3000/api/metadata',
        json={'url': url}
    )
    
    data = response.json()
    
    if data['success']:
        return data['data']
    else:
        raise Exception(data['error'])

# Usage
metadata = fetch_video_metadata('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
print(f"Title: {metadata['title']}")
print(f"Views: {metadata['viewCount']}")
```

## Security

### Input Validation

All inputs are validated:
- URL format checking
- Platform detection
- Length limits
- Sanitization of output

### Output Sanitization

All text fields are sanitized to prevent XSS:
- HTML tags removed
- Length limits applied
- Special characters escaped

### CORS

CORS is configured for security:
- Allowed origins from environment variable
- Development mode allows localhost
- Production requires explicit configuration

## Performance

### Response Times

Typical response times:
- YouTube: 200-500ms
- Vimeo: 100-300ms
- Direct links: 50-100ms

### Optimization

- Responses are not cached (privacy)
- Parallel API calls where possible
- Minimal data processing
- Efficient rate limiting

## Limitations

### YouTube API Quotas

YouTube API has daily quotas:
- Free tier: 10,000 units/day
- Each metadata request: ~3 units
- ~3,300 video lookups per day

### Rate Limiting

Default limits:
- 10 requests per minute per IP
- Configurable via environment variables

### Platform Restrictions

- YouTube: Public/unlisted videos only
- Vimeo: Public videos only
- Direct links: Limited metadata

## Future Endpoints

Potential future additions:
- `/api/search` - Search functionality
- `/api/channels` - Channel information
- `/api/playlists` - Playlist metadata

**Note:** All future features will maintain legal and ethical standards.

## Support

For API issues:
- Check error messages
- Verify API key configuration
- Review rate limits
- Check platform status
- Open GitHub issue if needed

---

**API Version:** 1.0.0  
**Last Updated:** February 15, 2026
