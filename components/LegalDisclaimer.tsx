'use client';

import React, { useState } from 'react';

interface LegalDisclaimerProps {
  onAccept: () => void;
}

export default function LegalDisclaimer({ onAccept }: LegalDisclaimerProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('legal-disclaimer-accepted', 'true');
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Legal Notice & Terms of Use
            </h2>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Important:</strong> QuickFetch is designed exclusively for legal use.
                Read and accept these terms before proceeding.
              </p>
            </div>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                ✓ Permitted Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Fetching public metadata from video platforms</li>
                <li>Embedding videos using official platform APIs</li>
                <li>Viewing information about your own content</li>
                <li>Educational purposes within fair use guidelines</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
                ✗ Prohibited Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Downloading copyrighted content without permission</li>
                <li>Bypassing platform terms of service or DRM</li>
                <li>Infringing intellectual property rights</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Your Responsibilities
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                By using QuickFetch, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Verify legal rights before accessing content</li>
                <li>Comply with all platform terms of service</li>
                <li>Respect copyright and intellectual property laws</li>
                <li>Use this tool only for lawful purposes</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Privacy & Security
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>No video URLs are stored on our servers</li>
                <li>No personal data is collected or retained</li>
                <li>All requests are processed in real-time only</li>
                <li>No tracking beyond basic error logging</li>
              </ul>
            </section>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                <strong>Disclaimer:</strong> QuickFetch is provided "as is" without warranties.
                The developers are not responsible for misuse, copyright infringement, or any
                legal consequences resulting from improper use of this tool.
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="flex items-center mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700 dark:text-gray-300">
                I have read and agree to these terms. I will use QuickFetch only for legal
                purposes and comply with all applicable laws and platform terms of service.
              </span>
            </label>

            <button
              onClick={handleAccept}
              disabled={!accepted}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                accepted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {accepted ? 'Accept & Continue' : 'Please Accept Terms to Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
