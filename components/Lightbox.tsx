import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';
import { Image } from '../types';

interface LightboxProps {
  images: Image[];
  selectedIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export const Lightbox = ({ images, selectedIndex, onClose, onChangeIndex }: LightboxProps) => {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onChangeIndex((selectedIndex - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') onChangeIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length, onClose, onChangeIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex, handleKeyDown]);

  if (selectedIndex === null) return null;

  const currentImage = images[selectedIndex];
  const isVideo = currentImage.mediaType === 'video';

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
      
      {/* Controls */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={32} />
      </button>

      <button 
        onClick={() => onChangeIndex((selectedIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block z-20"
      >
        <ChevronLeft size={40} />
      </button>

      <button 
        onClick={() => onChangeIndex((selectedIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors hidden md:block z-20"
      >
        <ChevronRight size={40} />
      </button>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-10">
        
        {isVideo ? (
           <video 
             src={currentImage.url} 
             controls 
             autoPlay 
             className="max-w-full max-h-[85vh] shadow-2xl rounded-sm"
           />
        ) : (
          <img 
            src={currentImage.url} 
            alt={currentImage.caption || "Full screen view"}
            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm select-none"
          />
        )}

        {/* Footer Info */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end px-6 max-w-6xl mx-auto w-full pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl pointer-events-auto">
             <p className="text-white font-medium">{selectedIndex + 1} / {images.length} {isVideo ? '(Video)' : ''}</p>
             {currentImage.caption && <p className="text-gray-300 text-sm mt-1">{currentImage.caption}</p>}
          </div>

          <div className="flex gap-3 pointer-events-auto">
            <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors" title="Download (Disabled in demo)">
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};