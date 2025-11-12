import React from 'react';
import type { GeneratedImage } from '../types';
import { Loader } from './Loader';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isLoading: boolean;
  error: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error }) => {
  const getAspectRatioClass = (ratio: string | undefined) => {
    switch (ratio) {
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '4:3': return 'aspect-4/3';
      case '3:4': return 'aspect-3/4';
      case '1:1':
      default:
        return 'aspect-square';
    }
  };

  const handleDownload = () => {
    if (!image) return;

    // Sanitize prompt for filename
    const safeFilename = image.prompt
      .replace(/[^a-z0-9\s]/gi, '') // Remove special characters
      .trim()
      .split(/\s+/)
      .slice(0, 8)
      .join('_');

    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${safeFilename || 'generated_image'}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const aspectClass = getAspectRatioClass(image?.aspectRatio);

  return (
    <div className={`relative w-full ${aspectClass} bg-slate-800/50 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 ring-1 ring-slate-700/50`}>
      {isLoading && <Loader />}
      
      {error && !isLoading && (
        <div className="p-8 text-center text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 font-semibold">An Error Occurred</p>
          <p className="text-sm text-slate-400">{error}</p>
        </div>
      )}

      {!isLoading && !error && !image && (
         <div className="text-center text-slate-500 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-lg">Your generated image will appear here</p>
            <p className="text-sm text-slate-600">Enter a prompt and let the magic happen</p>
        </div>
      )}
      
      {image && !isLoading && (
        <>
            <img 
                src={image.url} 
                alt={image.prompt} 
                className="object-contain w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-sm text-slate-200 backdrop-blur-md">
                <p className="font-mono">{image.prompt}</p>
            </div>
            <button
              onClick={handleDownload}
              title="Download Image"
              aria-label="Download Image"
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800/60 text-slate-200 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a1 1 0 011 1v5.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 9.586V4a1 1 0 011-1z" />
                <path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
        </>
      )}
    </div>
  );
};