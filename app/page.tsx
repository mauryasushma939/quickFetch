'use client';

import React, { useState, useEffect } from 'react';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import VideoInput from '@/components/VideoInput';
import MetadataDisplay from '@/components/MetadataDisplay';
import ErrorDisplay from '@/components/ErrorDisplay';
import { VideoMetadata, ApiResponse } from '@/types';

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accepted = localStorage.getItem('legal-disclaimer-accepted');
    if (accepted === 'true') {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data: ApiResponse<VideoMetadata> = await response.json();

      if (data.success && data.data) {
        setMetadata(data.data);
      } else {
        setError(data.error || 'Failed to fetch metadata');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  if (showDisclaimer) {
    return <LegalDisclaimer onAccept={handleAcceptDisclaimer} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            QuickFetch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Legal Video Metadata & Embedding Tool
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fetch metadata and embed videos from supported platforms legally and ethically
          </p>
        </div>

        {/* Video Input */}
        <VideoInput onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Error Display */}
        {error && <ErrorDisplay error={error} onDismiss={handleDismissError} />}

        {/* Metadata Display */}
        {metadata && <MetadataDisplay metadata={metadata} />}

        {/* Features Section */}
        {!metadata && !error && !isLoading && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why QuickFetch?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  100% Legal
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Uses official APIs and respects platform terms of service. No copyright violations.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy First
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  No data storage, no tracking. All requests processed in real-time only.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Fast & Reliable
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quick metadata fetching with rate limiting to prevent abuse.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            Built with ❤️ for legal and ethical media access
          </p>
          <p>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              View Legal Terms
            </button>
          </p>
        </footer>
      </div>
    </main>
  );
}
