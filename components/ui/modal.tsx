import React, { ReactNode, MouseEvent, useEffect } from 'react';
import { X } from 'lucide-react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    overlayClassName?: string;
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    size?: ModalSize;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className = '',
    overlayClassName = '',
    closeOnOverlayClick = true,
    showCloseButton = true,
    size = 'md'
}) => {
    const sizeClasses: Record<ModalSize, string> = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[90vw]'
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handleOverlayClick}
        >
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-auto ${className}`}
                style={{
                    animation: 'modalIn 0.2s ease-out',
                }}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                        aria-label="Close modal"
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                )}
                {children}
            </div>
            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Modal;
