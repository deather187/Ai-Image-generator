import React from 'react';

const IconSparkles = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" />
        <path d="M4.5 4.5L6 6" />
        <path d="M18 6l1.5-1.5" />
        <path d="M6 18l-1.5 1.5" />
        <path d="M20.5 19.5L18 18" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-10 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <IconSparkles />
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          AI Image Studio
        </h1>
      </div>
    </header>
  );
};