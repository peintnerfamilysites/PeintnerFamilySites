export const siteUrl = 'https://peintnerfamilysites.github.io/PeintnerFamilySites';

export const businessInfo = {
  name: 'Peintner Family Sites',
  shortName: 'PFS',
  phone: '+19034177043',
  phoneDisplay: '(903) 417-7043',
  email: 'peintnerfamilysites@gmail.com',
  city: 'Springfield',
  region: 'MO',
  country: 'US',
};

export const defaultSeo = {
  title: 'Peintner Family Sites | Premium Web Design & React Development',
  description:
    'Peintner Family Sites builds sharp, fast, mobile-ready websites and custom React experiences for small businesses that need trust, speed, and clear customer action.',
  path: '/',
  image: '/og-image.webp',
};

export const pageSeo = {
  home: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    path: '/',
  },
  services: {
    title: 'Web Design Services | Peintner Family Sites',
    description:
      'Premium business websites, custom React experiences, brand systems, technical SEO structure, and launch support for service brands and small businesses.',
    path: '/services',
  },
  work: {
    title: 'Portfolio Direction | Peintner Family Sites',
    description:
      'Explore portfolio direction, web design concepts, React experiences, local business layouts, and growth-ready website structures from Peintner Family Sites.',
    path: '/work',
  },
  process: {
    title: 'Website Design Process | Peintner Family Sites',
    description:
      'A clear website design and development process covering discovery, design, React development, launch support, mobile review, SEO structure, and performance checks.',
    path: '/process',
  },
  contact: {
    title: 'Contact Peintner Family Sites | Start a Website Project',
    description:
      'Contact Peintner Family Sites to discuss a website build, redesign, React experience, launch support, or local business web presence.',
    path: '/contact',
  },
  terms: {
    title: 'Terms of Use | Peintner Family Sites',
    description:
      'Terms of Use for Peintner Family Sites website design, development, project discussions, proposals, estimates, and related digital services.',
    path: '/terms',
    robots: 'noindex,follow',
  },
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath === '/') return `${siteUrl}/`;
  return `${siteUrl}${normalizedPath}`;
}

export function absoluteAssetUrl(assetPath = defaultSeo.image) {
  const normalizedAsset = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${siteUrl}${normalizedAsset}`;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: businessInfo.name,
    alternateName: businessInfo.shortName,
    url: `${siteUrl}/`,
    email: businessInfo.email,
    telephone: businessInfo.phone,
    areaServed: [
      {
        '@type': 'City',
        name: 'Springfield',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Missouri',
        addressCountry: 'US',
      },
    ],
    serviceType: [
      'Website design',
      'Web development',
      'React development',
      'Landing page design',
      'Technical SEO setup',
      'Website launch support',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.region,
      addressCountry: businessInfo.country,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: businessInfo.name,
    alternateName: businessInfo.shortName,
    url: `${siteUrl}/`,
    potentialAction: {
      '@type': 'ContactAction',
      target: `${siteUrl}/contact`,
      name: 'Start a website project',
    },
  };
}

export function buildWebPageSchema(seo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(seo.path),
    isPartOf: {
      '@type': 'WebSite',
      name: businessInfo.name,
      url: `${siteUrl}/`,
    },
  };
}
