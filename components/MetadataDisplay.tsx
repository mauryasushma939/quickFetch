'use client';

import React from 'react';
import { VideoMetadata } from '@/types';

interface MetadataDisplayProps {
  metadata: VideoMetadata;
}

export default function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  const formatViewCount = (count?: number): string => {
    if (!count) return 'N/A';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700">
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-full object-cover"
        />
        {metadata.duration && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
            {metadata.duration}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {metadata.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {metadata.author}
            </span>
            {metadata.viewCount && (
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {formatViewCount(metadata.viewCount)} views
              </span>
            )}
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {formatDate(metadata.publishedAt)}
            </span>
          </div>
        </div>

        {metadata.description && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap line-clamp-3">
              {metadata.description}
            </p>
          </div>
        )}

        {/* Platform Badge */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {metadata.platform.toUpperCase()}
            </span>
            {metadata.isEmbeddable && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ✓ Embeddable
              </span>
            )}
          </div>

          {metadata.isEmbeddable && (
            <button
              onClick={() => {
                const embedSection = document.getElementById('embed-section');
                embedSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View Embed →
            </button>
          )}
        </div>
      </div>

      {/* Embed Section */}
      {metadata.isEmbeddable && (
        <div id="embed-section" className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Official Embed
          </h3>
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={metadata.embedUrl}
              title={metadata.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            This video is embedded using the official {metadata.platform} embed code and respects all platform policies.
          </p>
        </div>
      )}
    </div>
  );
}
