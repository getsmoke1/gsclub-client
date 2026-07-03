'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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

export default function AgeVerification() {
    // Start as verified=true so SSR/first-paint skips the modal (better LCP).
    // useEffect will set to false if localStorage says not verified.
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [showNotOldEnough, setShowNotOldEnough] = useState(false);

    useEffect(() => {
        const verified = safeLocalStorage('ageVerified') === 'true';
        if (!verified) {
            setIsVerified(false);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, []); // run once on mount only

    const handleConfirm = (confirmed: boolean) => {
        if (confirmed) {
            safeLocalStorageSet('ageVerified', 'true');
            setIsVerified(true);
            document.body.style.overflow = '';
        } else {
            setShowNotOldEnough(true);
        }
    };

    if (isVerified) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
            <div className="bg-white rounded-lg max-w-md w-full p-8 text-center flex flex-col justify-center items-center font-unbounded">
                <Image src="/images/logo.png" width={180} height={180} alt="GetSmoke" />
                <p className="my-4">Are you of legal smoking age?</p>
                <div className="flex flex-col gap-4 justify-center w-full">
                    <Button
                        onClick={() => handleConfirm(true)}
                        variant="primary"
                        className="w-full !bg-green-500 hover:!bg-green-600"
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
