import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
    _turnstileReady?: boolean;
    _turnstileCallbacks?: (() => void)[];
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const render = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme: 'light',
      callback: (t: string) => { setToken(t); setError(false); },
      'error-callback': () => { setError(true); setToken(null); },
      'expired-callback': () => { setToken(null); },
    });
  }, []);

  useEffect(() => {
    if (!SITE_KEY) return;

    if (window.turnstile) { render(); return; }

    // Queue callback
    window._turnstileCallbacks = window._turnstileCallbacks || [];
    window._turnstileCallbacks.push(render);

    // Load script once
    if (!document.getElementById('cf-turnstile-script')) {
      (window as Record<string, unknown>)['onTurnstileLoad'] = () => {
        window._turnstileReady = true;
        (window._turnstileCallbacks || []).forEach(cb => cb());
        window._turnstileCallbacks = [];
      };
      const s = document.createElement('script');
      s.id = 'cf-turnstile-script';
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    } else if (window._turnstileReady) {
      render();
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [render]);

  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setToken(null);
    }
  }, []);

  return { containerRef, token, error, reset, hasSiteKey: !!SITE_KEY };
}
