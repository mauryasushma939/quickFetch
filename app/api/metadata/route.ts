import { NextRequest, NextResponse } from 'next/server';
import { VideoMetadata, ApiResponse } from '@/types';
import { extractVideoId, formatDuration, sanitizeText } from '@/lib/utils';
import { rateLimiter, getClientIdentifier } from '@/lib/rateLimit';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = rateLimiter.check(clientId);
    
    if (!rateLimit.allowed) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.reset.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Invalid URL provided',
        },
        { status: 400 }
      );
    }

    // Extract video information
    const videoInfo = extractVideoId(url);
    
    if (!videoInfo) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: 'Unsupported video URL. Please provide a YouTube, Vimeo, or direct media link.',
        },
        { status: 400 }
      );
    }

    let metadata: VideoMetadata;

    // Fetch metadata based on platform
    switch (videoInfo.platform) {
      case 'youtube':
        metadata = await fetchYouTubeMetadata(videoInfo.id);
        break;
      case 'vimeo':
        metadata = await fetchVimeoMetadata(videoInfo.id);
        break;
      case 'direct':
        metadata = await fetchDirectMetadata(videoInfo.id);
        break;
      default:
        throw new Error('Unsupported platform');
    }

    return NextResponse.json<ApiResponse<VideoMetadata>>(
      {
        success: true,
        data: metadata,
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString(),
        },
      }
    );
  } catch (error: any) {
    console.error('Metadata fetch error:', error.message);
    
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error.message || 'Failed to fetch video metadata',
      },
      { status: 500 }
    );
  }
}

async function fetchYouTubeMetadata(videoId: string): Promise<VideoMetadata> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  if (!apiKey) {
    throw new Error('YouTube API key not configured. Please add YOUTUBE_API_KEY to .env');
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    );

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('Video not found or is private');
    }

    const video = response.data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;
    const statistics = video.statistics;

    // Parse ISO 8601 duration
    const duration = parseDuration(contentDetails.duration);

    return {
      id: videoId,
      title: sanitizeText(snippet.title),
      description: sanitizeText(snippet.description),
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default.url,
      duration: formatDuration(duration),
      author: sanitizeText(snippet.channelTitle),
      viewCount: parseInt(statistics.viewCount, 10),
      publishedAt: snippet.publishedAt,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      platform: 'youtube',
      isEmbeddable: true,
    };
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error('YouTube API quota exceeded or invalid API key');
    }
    throw new Error(error.message || 'Failed to fetch YouTube metadata');
  }
}

async function fetchVimeoMetadata(videoId: string): Promise<VideoMetadata> {
  try {
    // Vimeo oEmbed API (no auth required for public videos)
    const response = await axios.get(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`
    );

    const data = response.data;

    return {
      id: videoId,
      title: sanitizeText(data.title),
      description: sanitizeText(data.description || ''),
      thumbnail: data.thumbnail_url,
      duration: data.duration ? formatDuration(data.duration) : 'N/A',
      author: sanitizeText(data.author_name),
      publishedAt: data.upload_date || new Date().toISOString(),
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      platform: 'vimeo',
      isEmbeddable: true,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Vimeo video not found or is private');
    }
    throw new Error('Failed to fetch Vimeo metadata');
  }
}

async function fetchDirectMetadata(url: string): Promise<VideoMetadata> {
  // For direct media links, we provide basic metadata
  const filename = url.split('/').pop() || 'video';
  
  return {
    id: url,
    title: sanitizeText(decodeURIComponent(filename)),
    description: 'Direct media file',
    thumbnail: '/video-placeholder.png',
    duration: 'Unknown',
    author: 'Direct Link',
    publishedAt: new Date().toISOString(),
    embedUrl: url,
    platform: 'direct',
    isEmbeddable: false, // Don't embed direct links for security
  };
}

function parseDuration(duration: string): number {
  // Parse ISO 8601 duration (e.g., PT1H2M10S)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}
