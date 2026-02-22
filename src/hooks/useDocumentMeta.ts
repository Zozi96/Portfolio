import { useEffect } from "react";

export interface DocumentMetaOptions {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Imperatively manages document <head> metadata (title + meta tags).
 * Works reliably across all environments, including those where React 19's
 * automatic metadata hoisting is not active.
 */
export function useDocumentMeta(options: DocumentMetaOptions) {
  useEffect(() => {
    if (options.title) document.title = options.title;
    if (options.description) setMeta("description", options.description);
    if (options.keywords) setMeta("keywords", options.keywords);
    if (options.author) setMeta("author", options.author);
    if (options.ogTitle) setMeta("og:title", options.ogTitle, "property");
    if (options.ogDescription) setMeta("og:description", options.ogDescription, "property");
    if (options.ogType) setMeta("og:type", options.ogType, "property");
    if (options.twitterCard) setMeta("twitter:card", options.twitterCard);
    if (options.twitterTitle) setMeta("twitter:title", options.twitterTitle);
    if (options.twitterDescription) setMeta("twitter:description", options.twitterDescription);
  }, [
    options.title,
    options.description,
    options.keywords,
    options.author,
    options.ogTitle,
    options.ogDescription,
    options.ogType,
    options.twitterCard,
    options.twitterTitle,
    options.twitterDescription,
  ]);
}
