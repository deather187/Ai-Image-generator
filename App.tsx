import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { ThumbnailGallery } from './components/ThumbnailGallery';
import { generateImage } from './services/geminiService';
import type { GeneratedImage } from './types';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  const handleGenerateImage = useCallback(async (prompt: string, aspectRatio: string) => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setCurrentImage(null);

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        url: imageUrl,
        aspectRatio,
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setCurrentImage(newImage);

      // Add to prompt history if it's a new prompt
      setPromptHistory(prev => {
        const trimmedPrompt = prompt.trim();
        if (!prev.find(p => p.trim().toLowerCase() === trimmedPrompt.toLowerCase())) {
          return [trimmedPrompt, ...prev];
        }
        return prev;
      });

    } catch (err) {
      console.error(err);
      setError('Failed to generate image. The model may have refused the prompt. Please try again with a different prompt.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleThumbnailClick = useCallback((image: GeneratedImage) => {
    setCurrentImage(image);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[380px] lg:flex-shrink-0 flex flex-col gap-8">
          <PromptControls
            onGenerate={handleGenerateImage}
            isLoading={isLoading}
            promptHistory={promptHistory}
          />
          <ThumbnailGallery
            images={generatedImages}
            onThumbnailClick={handleThumbnailClick}
            currentImageId={currentImage?.id || null}
          />
        </div>
        <div className="w-full lg:flex-1">
          <ImageDisplay
            image={currentImage}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;