'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface InstagramEmbedProps {
  username: string;
  className?: string;
  forceDarkMode?: boolean;
}

export default function InstagramEmbed({ 
  username, 
  className = '',
  forceDarkMode = false 
}: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Determine if dark mode should be used
  const isDarkMode = forceDarkMode || theme === 'dark';

  useEffect(() => {
    // Function to load Instagram embed script
    const loadInstagramEmbed = () => {
      // Remove any existing script first to avoid duplicates
      const existingScript = document.getElementById('instagram-embed-script');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and add the script
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Process embeds when script loads
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    };

    // Load the script
    loadInstagramEmbed();

    // Cleanup
    return () => {
      const script = document.getElementById('instagram-embed-script');
      if (script) {
        script.remove();
      }
    };
  }, [username]);

  return (
    <div ref={containerRef} className={`instagram-embed-container ${className}`}>
      <blockquote 
        className={`instagram-media ${isDarkMode ? 'instagram-media-dark' : 'instagram-media-light'}`}
        data-instgrm-permalink={`https://www.instagram.com/${username}/?utm_source=ig_embed&utm_campaign=loading`}
        data-instgrm-version="14"
      >
        <div className="instagram-padding">
          <a 
            href={`https://www.instagram.com/${username}/?utm_source=ig_embed&utm_campaign=loading`} 
            className={`instagram-link ${isDarkMode ? 'instagram-media-dark' : 'instagram-media-light'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="instagram-profile-wrapper">
              <div className={`instagram-profile-img-placeholder ${isDarkMode ? 'instagram-profile-img-placeholder-dark' : 'instagram-profile-img-placeholder-light'}`}></div>
              <div className="instagram-profile-info">
                <div className={`instagram-text-placeholder instagram-text-placeholder-username ${isDarkMode ? 'instagram-text-placeholder-dark' : 'instagram-text-placeholder-light'}`}></div>
                <div className={`instagram-text-placeholder instagram-text-placeholder-smaller ${isDarkMode ? 'instagram-text-placeholder-dark' : 'instagram-text-placeholder-light'}`}></div>
              </div>
            </div>
            <div className="instagram-padding-vertical"></div>
            <div className="instagram-logo-wrapper bg-white rounded-full p-1">
              <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-511.000000, -20.000000)" fill="black">
                    <g>
                      <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div className="instagram-badge-wrap">
              <div className={isDarkMode ? 'instagram-badge-text-dark' : 'instagram-badge-text-light'}>
                View this profile on Instagram
              </div>
            </div>
            <div className="instagram-spacing"></div>
            <div className="instagram-dot-decoration-container">
              <div>
                <div className={`instagram-dot instagram-dot-1 ${isDarkMode ? 'instagram-text-placeholder-dark' : 'instagram-text-placeholder-light'}`}></div>
                <div className={`instagram-dot instagram-dot-2 ${isDarkMode ? 'instagram-text-placeholder-dark' : 'instagram-text-placeholder-light'}`}></div>
                <div className={`instagram-dot instagram-dot-3 ${isDarkMode ? 'instagram-text-placeholder-dark' : 'instagram-text-placeholder-light'}`}></div>
              </div>
            </div>
          </a>
          <p className={isDarkMode ? 'instagram-footer-text-dark' : 'instagram-footer-text-light'}>
            <a
              href={`https://www.instagram.com/${username}/?utm_source=ig_embed&utm_campaign=loading`}
              className={isDarkMode ? 'instagram-footer-link-dark' : 'instagram-footer-link-light'}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{username}
            </a>
            • Instagram photos and videos
          </p>
        </div>
      </blockquote>
    </div>
  );
}

// Add type declaration for window with instgrm
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
} 