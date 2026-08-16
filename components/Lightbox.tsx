import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Lock } from 'lucide-react';
import { Image } from '../types';

interface LightboxProps {
  images: Image[];
  selectedIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
  unlockedIds: Set<string>; // New prop to track unlocked images
}

export const Lightbox = ({ images, selectedIndex, onClose, onChangeIndex, unlockedIds }: LightboxProps) => {

  // Helper function to find next unlocked image
  const findNextUnlockedIndex = (currentIndex: number, direction: 'next' | 'prev'): number | null => {
    const total = images.length;
    let steps = 0;
    let index = currentIndex;

    while (steps < total) {
      if (direction === 'next') {
        index = (index + 1) % total;
      } else {
        index = (index - 1 + total) % total;
      }

      if (unlockedIds.has(images[index].id)) {
        return index;
      }

      steps++;
    }

    return null; // No unlocked image found
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;

    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'ArrowLeft') {
      const prevIndex = findNextUnlockedIndex(selectedIndex, 'prev');
      if (prevIndex !== null) {
        onChangeIndex(prevIndex);
      }
    }

    if (e.key === 'ArrowRight') {
      const nextIndex = findNextUnlockedIndex(selectedIndex, 'next');
      if (nextIndex !== null) {
        onChangeIndex(nextIndex);
      }
    }
  }, [selectedIndex, images, unlockedIds, onClose, onChangeIndex]);

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

  // Check if navigation is possible
  const nextUnlockedIndex = findNextUnlockedIndex(selectedIndex, 'next');
  const prevUnlockedIndex = findNextUnlockedIndex(selectedIndex, 'prev');
  const hasNextUnlocked = nextUnlockedIndex !== null && nextUnlockedIndex !== selectedIndex;
  const hasPrevUnlocked = prevUnlockedIndex !== null && prevUnlockedIndex !== selectedIndex;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">

      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={32} />
      </button>

      {/* Previous Button - Only enabled if previous unlocked image exists */}
      <button
        onClick={() => {
          if (hasPrevUnlocked && prevUnlockedIndex !== null) {
            onChangeIndex(prevUnlockedIndex);
          }
        }}
        disabled={!hasPrevUnlocked}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors hidden md:block z-20 ${hasPrevUnlocked
          ? 'text-white/50 hover:text-white hover:bg-white/10 cursor-pointer'
          : 'text-white/20 cursor-not-allowed opacity-50'
          }`}
        title={hasPrevUnlocked ? 'Previous unlocked image' : 'No previous unlocked image'}
      >
        <ChevronLeft size={40} />
      </button>

      {/* Next Button - Only enabled if next unlocked image exists */}
      <button
        onClick={() => {
          if (hasNextUnlocked && nextUnlockedIndex !== null) {
            onChangeIndex(nextUnlockedIndex);
          }
        }}
        disabled={!hasNextUnlocked}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors hidden md:block z-20 ${hasNextUnlocked
          ? 'text-white/50 hover:text-white hover:bg-white/10 cursor-pointer'
          : 'text-white/20 cursor-not-allowed opacity-50'
          }`}
        title={hasNextUnlocked ? 'Next unlocked image' : 'No next unlocked image'}
      >
        <ChevronRight size={40} />
      </button>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-10">

        {isVideo ? (
          <video
            src={
              currentImage.url.includes('video.twimg.com')
                ? `/api/video-proxy?url=${encodeURIComponent(currentImage.url)}`
                : currentImage.url
            }
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            draggable={false}
            preload="none"
            playsInline
            loop
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            className="protected-media max-w-full max-h-[85vh] shadow-2xl rounded-sm"
          />
        ) : (
          <img
            src={currentImage.url}
            alt={currentImage.caption || "Full screen view"}
            referrerPolicy="no-referrer"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            className="protected-media max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm select-none"
          />
        )}

        {/* Footer Info */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end px-6 max-w-6xl mx-auto w-full pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl pointer-events-auto">
            <p className="text-white font-medium">
              {selectedIndex + 1} / {images.length} {isVideo ? '(Video)' : ''}
              {!hasNextUnlocked && !hasPrevUnlocked && (
                <span className="text-green-400 ml-2 text-sm">(Only unlocked)</span>
              )}
            </p>
            {currentImage.caption && <p className="text-gray-300 text-sm mt-1">{currentImage.caption}</p>}
          </div>

          <div className="flex gap-3 pointer-events-auto">
          </div>
        </div>
      </div>
    </div>
  );
};