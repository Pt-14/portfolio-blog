'use client';

import { Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ShareButtonProps {
  title: string;
  slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleShare('facebook')}
        className="social-link w-inline-block gradient"
        aria-label="Share on Facebook"
      >
        <div className="social-icon-wrapper" style={{ backgroundColor: '#f0f2f5' }}>
          <div className="social-icon">
            <Facebook className="w-5 h-5" />
          </div>
        </div>
      </button>
      
      <button
        type="button"
        onClick={() => handleShare('twitter')}
        className="social-link w-inline-block gradient"
        aria-label="Share on X"
      >
        <div className="social-icon-wrapper" style={{ backgroundColor: '#f0f2f5' }}>
          <div className="social-icon">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>
      </button>
      
      <button
        type="button"
        onClick={() => handleShare('linkedin')}
        className="social-link w-inline-block gradient"
        aria-label="Share on LinkedIn"
      >
        <div className="social-icon-wrapper" style={{ backgroundColor: '#f0f2f5' }}>
          <div className="social-icon">
            <Linkedin className="w-5 h-5" />
          </div>
        </div>
      </button>
      
      <button
        type="button"
        onClick={handleCopy}
        className="social-link w-inline-block gradient"
        aria-label="Copy link"
      >
        <div className="social-icon-wrapper" style={{ backgroundColor: '#f0f2f5' }}>
          <div className="social-icon">
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

