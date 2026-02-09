import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

// Cloudflare Turnstile Site Key - this is a public/publishable key
const TURNSTILE_SITE_KEY = '0x4AAAAAABfKBG6bLhSvmG3e';

export const TurnstileWidget = ({ onVerify, onError, onExpire }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isRenderedRef = useRef(false);
  const errorCountRef = useRef(0);

  const handleError = useCallback(() => {
    // Only fire the error callback once to prevent toast spam
    errorCountRef.current++;
    if (errorCountRef.current <= 1) {
      onError?.();
    }
  }, [onError]);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || isRenderedRef.current) return;
    if (!window.turnstile) return;

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onVerify,
        'error-callback': handleError,
        'expired-callback': onExpire,
        theme: 'dark',
        size: 'normal',
      });
      isRenderedRef.current = true;
    } catch (e) {
      // Silently fail - don't spam console
    }
  }, [onVerify, handleError, onExpire]);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="turnstile"]');
    
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    window.onTurnstileLoad = () => {
      renderWidget();
    };

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Widget may already be removed
        }
      }
      isRenderedRef.current = false;
      errorCountRef.current = 0;
    };
  }, [renderWidget]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center my-4"
    />
  );
};
