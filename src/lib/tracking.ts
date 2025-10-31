declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined; // e.g. AW-XXXXXXXXX
const GOOGLE_ADS_CONVERSION_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined; // e.g. AbCdEfGhIjKlMnOpQr

function injectScript(src: string, async = true): void {
  const script = document.createElement('script');
  script.async = async;
  script.src = src;
  document.head.appendChild(script);
}

export function initTracking(): void {
  initMetaPixel();
  initGoogleAds();
}

export function initMetaPixel(): void {
  if (!META_PIXEL_ID) return;
  // Meta Pixel base code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return; n = f.fbq = function() {
      (n.callMethod ? n.callMethod : n.queue.push).apply(n, arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = true;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq!('init', META_PIXEL_ID);
  window.fbq!('consent', 'grant');
  window.fbq!('track', 'PageView');
}

export function initGoogleAds(): void {
  if (!GOOGLE_ADS_ID) return;
  // Load gtag
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer!.push(arguments as any); }
  window.gtag = gtag as any;
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);
}

export function trackPurchase(amount: number, currency: string, details?: { packageName?: string; guests?: number; }): void {
  // Meta Pixel Purchase
  try {
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: amount,
        currency,
        content_name: details?.packageName,
        num_items: details?.guests,
      });
    }
  } catch {}

  // Google Ads Conversion
  try {
    if (window.gtag && GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL) {
      window.gtag('event', 'conversion', {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
        value: amount,
        currency,
      });
    }
  } catch {}
}