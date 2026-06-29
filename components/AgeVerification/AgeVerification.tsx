'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

// Safe localStorage wrapper for Safari Private Mode compatibility
function safeLocalStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function safeLocalStorageSet(key: string, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch {
        // ignore
    }
}

declare global {
    interface Window {
        turnstile?: {
            render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
        onTurnstileLoad?: () => void;
    }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function AgeVerification() {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [showNotOldEnough, setShowNotOldEnough] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [turnstileError, setTurnstileError] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    useEffect(() => {
        const verified = safeLocalStorage('ageVerified') === 'true';
        setIsVerified(verified);

        if (!verified) {
            document.body.style.overflow = 'hidden';
            loadTurnstile();
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function loadTurnstile() {
        if (!SITE_KEY) return;

        // If script already loaded, render immediately
        if (window.turnstile) {
            renderWidget();
            return;
        }

        window.onTurnstileLoad = renderWidget;

        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    function renderWidget() {
        if (!widgetRef.current || !window.turnstile || !SITE_KEY) return;
        if (widgetIdRef.current) return; // already rendered

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
            sitekey: SITE_KEY,
            theme: 'light',
            callback: (token: string) => {
                setTurnstileToken(token);
                setTurnstileError(false);
            },
            'error-callback': () => {
                setTurnstileError(true);
                setTurnstileToken(null);
            },
            'expired-callback': () => {
                setTurnstileToken(null);
            },
        });
    }

    const handleConfirm = (confirmed: boolean) => {
        if (confirmed) {
            // Require Turnstile if site key is configured
            if (SITE_KEY && !turnstileToken) return;
            safeLocalStorageSet('ageVerified', 'true');
            setIsVerified(true);
            document.body.style.overflow = '';
        } else {
            setShowNotOldEnough(true);
        }
    };

    if (isVerified === null || isVerified) {
        return null;
    }

    const yesDisabled = !!SITE_KEY && !turnstileToken;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
            <div className="bg-white rounded-lg max-w-md w-full p-8 text-center flex flex-col justify-center items-center font-unbounded">
                <Image src="/images/logo.png" width={180} height={180} alt="GetSmoke" />
                <p className="my-4">Are you of legal smoking age?</p>

                {/* Turnstile widget */}
                {SITE_KEY && (
                    <div className="mb-4 flex justify-center">
                        <div ref={widgetRef} />
                        {turnstileError && (
                            <p className="text-red-500 text-sm mt-2">Verification failed. Please refresh and try again.</p>
                        )}
                    </div>
                )}

                <div className="flex flex-col gap-4 justify-center w-full">
                    <Button
                        onClick={() => handleConfirm(true)}
                        variant="primary"
                        disabled={yesDisabled}
                        className={`w-full !bg-green-500 hover:!bg-green-600 transition-opacity ${yesDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Yes, I&apos;m 21 years +
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => handleConfirm(false)}
                        className="w-full !bg-red-600 hover:!bg-red-700 !text-white"
                    >
                        No, I&apos;m under 21 years age
                    </Button>
                </div>
                {showNotOldEnough && (
                    <p className="text-red-600 mt-4">
                        You are not old enough to view this content.
                    </p>
                )}
            </div>
        </div>
    );
}
