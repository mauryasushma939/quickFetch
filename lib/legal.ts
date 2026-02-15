export const LEGAL_NOTICE = {
  title: 'Legal Notice & Terms of Use',
  lastUpdated: 'February 15, 2026',
  
  sections: [
    {
      heading: 'Purpose',
      content: [
        'QuickFetch is designed exclusively for legal use cases, including:',
        '• Fetching public metadata from video platforms',
        '• Embedding videos using official platform APIs',
        '• Viewing information about your own uploaded content',
        '• Educational purposes within fair use guidelines',
      ],
    },
    {
      heading: 'Prohibited Uses',
      content: [
        'You may NOT use this tool to:',
        '• Download copyrighted content without permission',
        '• Bypass platform terms of service or DRM protection',
        '• Infringe on intellectual property rights',
        '• Violate any applicable laws or regulations',
        '• Download content from platforms that prohibit downloading',
      ],
    },
    {
      heading: 'User Responsibility',
      content: [
        'By using QuickFetch, you agree to:',
        '• Verify you have legal rights to access any content',
        '• Comply with all platform terms of service',
        '• Respect copyright and intellectual property laws',
        '• Use this tool only for legitimate, lawful purposes',
        '• Indemnify the developers from any misuse',
      ],
    },
    {
      heading: 'Platform Compliance',
      content: [
        'This tool respects platform policies:',
        '• YouTube: Uses official API for metadata only',
        '• Other platforms: Embedded content uses official embed codes',
        '• No scraping or API abuse',
        '• Rate limiting implemented to prevent abuse',
      ],
    },
    {
      heading: 'Privacy & Data',
      content: [
        'Your privacy matters:',
        '• No video URLs are stored on our servers',
        '• No personal data is collected or retained',
        '• API requests are processed in real-time only',
        '• No tracking or analytics beyond basic error logging',
      ],
    },
    {
      heading: 'Disclaimer',
      content: [
        'QuickFetch is provided "as is" without warranties. The developers are not responsible for:',
        '• Misuse of the tool by users',
        '• Copyright infringement by users',
        '• Changes to third-party platform APIs or policies',
        '• Any legal consequences of improper use',
      ],
    },
  ],
};

export const SUPPORTED_PLATFORMS = [
  {
    name: 'YouTube',
    features: ['Metadata', 'Embed', 'View Count', 'Duration'],
    restrictions: 'No downloads - viewing and embedding only via official API',
    legal: true,
  },
  {
    name: 'Vimeo',
    features: ['Metadata', 'Embed'],
    restrictions: 'Only public videos - respects privacy settings',
    legal: true,
  },
  {
    name: 'Direct Media Links',
    features: ['Preview', 'Metadata'],
    restrictions: 'Only for content you own or have permission to access',
    legal: true,
  },
];
