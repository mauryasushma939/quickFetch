export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  author: string;
  viewCount?: number;
  publishedAt: string;
  embedUrl: string;
  platform: 'youtube' | 'vimeo' | 'direct';
  isEmbeddable: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RateLimitInfo {
  remaining: number;
  reset: number;
}
