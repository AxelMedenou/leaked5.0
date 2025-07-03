import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm"></div>
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-black text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/60 transition-colors text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}