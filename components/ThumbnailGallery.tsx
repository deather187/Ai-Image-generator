import React from 'react';
import type { GeneratedImage } from '../types';

interface ThumbnailGalleryProps {
  images: GeneratedImage[];
  onThumbnailClick: (image: GeneratedImage) => void;
  currentImageId: string | null;
}

export const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images, onThumbnailClick, currentImageId }) => {
  if (images.length === 0) {
    return (
        <div className="bg-slate-800/50 rounded-lg p-4 shadow-2xl flex-grow ring-1 ring-slate-700/50">
            <h3 className="text-lg font-semibold mb-4 text-slate-300">History</h3>
            <div className="flex items-center justify-center h-full text-slate-500">
                <p className="text-sm">Your generated images will appear here.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 shadow-2xl flex-grow ring-1 ring-slate-700/50">
      <h3 className="text-lg font-semibold mb-4 text-slate-300">History</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[28rem] overflow-y-auto pr-2">
        {images.map(image => (
          <button
            key={image.id}
            onClick={() => onThumbnailClick(image)}
            className={`relative aspect-square rounded-md overflow-hidden transition-all duration-200 focus:outline-none ring-offset-2 ring-offset-slate-800 group ${
              currentImageId === image.id ? 'ring-2 ring-cyan-400' : 'hover:opacity-80'
            }`}
          >
            <img src={image.url} alt={image.prompt} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            {currentImageId === image.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};