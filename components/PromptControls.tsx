import React, { useState } from 'react';

interface PromptControlsProps {
  onGenerate: (prompt: string, aspectRatio: string) => void;
  isLoading: boolean;
  promptHistory: string[];
}

const aspectRatios = [
    { value: "1:1", icon: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="5" y="5" width="14" height="14" rx="2" /></svg> },
    { value: "16:9", icon: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="2" y="7" width="20" height="10" rx="2" /></svg> },
    { value: "9:16", icon: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="7" y="2" width="10" height="20" rx="2" /></svg> },
    { value: "4:3", icon: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="3" y="6" width="18" height="12" rx="2" /></svg> },
    { value: "3:4", icon: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="6" y="3" width="12" height="18" rx="2" /></svg> },
];

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const PromptControls: React.FC<PromptControlsProps> = ({ onGenerate, isLoading, promptHistory }) => {
  const [prompt, setPrompt] = useState<string>('A photorealistic image of a majestic lion in the savanna at sunset, with a warm orange glow.');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, aspectRatio);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-5 shadow-2xl ring-1 ring-slate-700/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic cityscape at night..."
            className="w-full h-32 p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none text-slate-200 placeholder-slate-400"
            disabled={isLoading}
          />
        </div>

        <div>
           <label htmlFor="aspect-ratio" className="block text-sm font-medium text-slate-300 mb-2">
            Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-2">
              {aspectRatios.map(({ value, icon }) => (
                  <button
                      key={value}
                      type="button"
                      title={value}
                      onClick={() => setAspectRatio(value)}
                      className={`flex items-center justify-center p-2 rounded-md transition-colors duration-200 fill-current ${
                          aspectRatio === value
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      }`}
                      disabled={isLoading}
                  >
                      {icon}
                  </button>
              ))}
          </div>
        </div>

        {promptHistory.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Prompt History
            </label>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-2">
              {promptHistory.map((histPrompt, index) => (
                <button
                  key={`${index}-${histPrompt.slice(0, 10)}`}
                  type="button"
                  onClick={() => setPrompt(histPrompt)}
                  className="w-full flex items-center gap-2 text-left p-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm text-slate-300 truncate transition-colors duration-200 disabled:opacity-50"
                  title={histPrompt}
                  disabled={isLoading}
                >
                  <HistoryIcon />
                  <span className="truncate">{histPrompt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-bold rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </button>
      </form>
    </div>
  );
};