import { useEffect } from 'react';
import {
  absoluteAssetUrl,
  absoluteUrl,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
  defaultSeo,
} from '../../data/seo';

function setMetaAttribute(selector, attribute, value) {
  if (!value) return;

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');

    if (selector.includes('property=')) {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) element.setAttribute('property', property);
    } else {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) element.setAttribute('name', name);
    }

    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
}

function setLink(rel, href) {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function setJsonLd(id, schema) {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

export function Seo({ seo }) {
  useEffect(() => {
    const pageSeo = { ...defaultSeo, ...seo };
    const canonical = absoluteUrl(pageSeo.path);
    const image = absoluteAssetUrl(pageSeo.image);

    document.title = pageSeo.title;

    setMetaAttribute('meta[name="description"]', 'content', pageSeo.description);
    setMetaAttribute('meta[name="robots"]', 'content', pageSeo.robots || 'index,follow');
    setMetaAttribute('meta[name="theme-color"]', 'content', '#020914');

    setMetaAttribute('meta[property="og:title"]', 'content', pageSeo.title);
    setMetaAttribute('meta[property="og:description"]', 'content', pageSeo.description);
    setMetaAttribute('meta[property="og:type"]', 'content', 'website');
    setMetaAttribute('meta[property="og:url"]', 'content', canonical);
    setMetaAttribute('meta[property="og:image"]', 'content', image);
    setMetaAttribute('meta[property="og:site_name"]', 'content', 'Peintner Family Sites');

    setMetaAttribute('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaAttribute('meta[name="twitter:title"]', 'content', pageSeo.title);
    setMetaAttribute('meta[name="twitter:description"]', 'content', pageSeo.description);
    setMetaAttribute('meta[name="twitter:image"]', 'content', image);

    setLink('canonical', canonical);

    setJsonLd('pfs-organization-schema', buildOrganizationSchema());
    setJsonLd('pfs-website-schema', buildWebsiteSchema());
    setJsonLd('pfs-page-schema', buildWebPageSchema(pageSeo));
  }, [seo]);

  return null;
}
