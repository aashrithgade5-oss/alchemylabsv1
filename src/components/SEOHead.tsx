import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  structuredData?: object;
}

const defaultMeta = {
  title: 'Alchemy Labs — AI-Augmented Brand Architecture',
  description: 'Strategic brand systems engineered for the AI era. We architect identity, culture, and execution that scales through precision.',
  image: 'https://alchemylabsv1.lovable.app/og-image.png',
};

export const SEOHead = ({
  title,
  description,
  image,
  type = 'website',
  article,
  structuredData,
}: SEOHeadProps) => {
  const pageTitle = title 
    ? `${title} | Alchemy Labs` 
    : defaultMeta.title;
  const pageDescription = description || defaultMeta.description;
  const pageImage = image || defaultMeta.image;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogType = document.querySelector('meta[property="og:type"]');

    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);
    if (ogImage) ogImage.setAttribute('content', pageImage);
    if (ogType) ogType.setAttribute('content', type);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    if (twitterDescription) twitterDescription.setAttribute('content', pageDescription);
    if (twitterImage) twitterImage.setAttribute('content', pageImage);

    // Add article-specific meta tags
    if (type === 'article' && article) {
      // Add or update article meta tags dynamically
      const addMeta = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      if (article.publishedTime) addMeta('article:published_time', article.publishedTime);
      if (article.modifiedTime) addMeta('article:modified_time', article.modifiedTime);
      if (article.author) addMeta('article:author', article.author);
      article.tags?.forEach(tag => addMeta('article:tag', tag));
    }

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[data-seo-structured]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo-structured', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup
    return () => {
      document.title = defaultMeta.title;
    };
  }, [pageTitle, pageDescription, pageImage, type, article, structuredData]);

  return null;
};

// Pre-built structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Alchemy Labs',
  description: 'AI-Augmented Brand Architecture Agency',
  url: 'https://alchemylabsv1.lovable.app',
  logo: 'https://alchemylabsv1.lovable.app/favicon.ico',
  sameAs: [
    'https://instagram.com/alchemylabs',
    'https://twitter.com/AlchemyLabs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'brandalchemie@gmail.com',
    contactType: 'customer service',
  },
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  provider: {
    '@type': 'Organization',
    name: 'Alchemy Labs',
  },
  description: service.description,
  url: service.url,
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  author: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.publishedTime,
  author: {
    '@type': 'Person',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Alchemy Labs',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default SEOHead;
