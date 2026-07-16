const R2_BASE = 'https://pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev';

/**
 * Transform R2 CDN URL to local proxy path (/r2/...) so images are served
 * through getsmoke.com instead of external R2 domain.
 * This avoids cross-origin CDN issues in certain browsers/regions.
 */
export function r2src(url: string | undefined | null): string {
  if (!url) return '/placeholder-vape.jpg';
  if (url.startsWith(R2_BASE)) {
    return url.replace(R2_BASE, '/r2');
  }
  return url;
}
