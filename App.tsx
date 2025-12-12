import React, { useState } from 'react';
import { Header } from './components/Header';
import { IdeaInput } from './components/IdeaInput';
import { PromptOutput } from './components/PromptOutput';
import { ApiKeyManager } from './components/ApiKeyManager';
import { generateStaticPrompt } from './utils/localGenerator';
import { generateGeminiPrompt } from './services/geminiService';
import { GenerationMode } from './types';

export default function App() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userApiKey, setUserApiKey] = useState<string | null>(null);

  const handleGenerate = async (idea: string, mode: GenerationMode) => {
    setIsLoading(true);
    setGeneratedPrompt('');
    setError(null);

    try {
      let result = '';

      if (mode === GenerationMode.GEMINI) {
        // Attempt Gemini generation
        try {
           // Pass the userApiKey to the service. 
           // If userApiKey is null, the service will try process.env.API_KEY or throw an error.
           result = await generateGeminiPrompt(idea, userApiKey || undefined);
        } catch (err: any) {
           console.error("Gemini failed", err);
           throw new Error(`Gemini API 오류: ${err.message || '알 수 없는 오류'}. API Key를 확인하거나 정적 모드를 이용해보세요.`);
        }
      } else {
        // Static generation
        // Simulate a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 600));
        result = generateStaticPrompt(idea);
      }

      setGeneratedPrompt(result);
    } catch (err: any) {
      setError(err.message || "예기치 않은 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 sm:p-8 bg-[#0D1117]">
      <div className="w-full max-w-4xl">
        <Header />
        
        <main>
          <ApiKeyManager onApiKeyChange={setUserApiKey} />
          
          <IdeaInput 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
            hasApiKey={!!userApiKey || !!process.env.API_KEY} 
          />
          
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg mb-8 animate-fade-in text-center">
              ⚠️ {error}
            </div>
          )}

          {generatedPrompt && (
            <div className="animate-fade-in-up">
              <PromptOutput content={generatedPrompt} />
            </div>
          )}
        </main>

        <footer className="mt-20 text-center text-gray-600 text-sm pb-8">
          <p>Powered by React, Tailwind, and Gemini 2.5 Flash</p>
        </footer>
      </div>
    </div>
  );
}