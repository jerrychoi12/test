import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const metaEnv = (import.meta as any).env || {};
const projectId = metaEnv.VITE_SANITY_PROJECT_ID || 'r0fcgsmf';
const dataset = metaEnv.VITE_SANITY_DATASET || 'news';
const apiVersion = metaEnv.VITE_SANITY_API_VERSION || '2026-05-26';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to retrieve the latest updates in real-time
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}
