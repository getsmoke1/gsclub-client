'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const shouldShow = scrollTop > windowHeight / 2;
            const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
            const isNearFooter = distanceFromBottom < 150;
            setIsVisible(shouldShow && !isNearFooter);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 p-3 bg-[#fe3500] text-white rounded-xl shadow-lg z-50 flex items-center justify-center hover:shadow-xl hover:cursor-pointer transition-all duration-300"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
                pointerEvents: isVisible ? 'auto' : 'none',
            }}
        >
            <ChevronUp size={24} />
        </button>
    );
};

export default ScrollToTopButton;
