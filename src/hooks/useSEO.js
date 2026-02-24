import { useEffect } from 'react';

/**
 * Hook to manage SEO meta tags dynamically
 * Updates document title and meta tags without external dependencies
 */
export function useSEO(config = {}) {
  const {
    title = 'TCG Game Mats - Free Online Riftbound Playmat Designer',
    description = 'Design custom Riftbound and TCG playmat overlays with our free online designer.',
  } = config;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
  }, [title, description]);
}
