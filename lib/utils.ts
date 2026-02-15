export function extractVideoId(url: string): { platform: 'youtube' | 'vimeo' | 'direct'; id: string } | null {
  try {
    const parsedUrl = new URL(url);
    
    // YouTube
    if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
      let videoId: string | null = null;
      
      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.slice(1);
      } else if (parsedUrl.searchParams.has('v')) {
        videoId = parsedUrl.searchParams.get('v');
      }
      
      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return { platform: 'youtube', id: videoId };
      }
    }
    
    // Vimeo
    if (parsedUrl.hostname.includes('vimeo.com')) {
      const match = parsedUrl.pathname.match(/\/(\d+)/);
      if (match && match[1]) {
        return { platform: 'vimeo', id: match[1] };
      }
    }
    
    // Direct media links (simple validation)
    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      const extension = parsedUrl.pathname.split('.').pop()?.toLowerCase();
      if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) {
        return { platform: 'direct', id: url };
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 5000); // Limit length
}
