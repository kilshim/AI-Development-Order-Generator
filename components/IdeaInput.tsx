import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { GenerationMode } from '../types';

interface IdeaInputProps {
  onGenerate: (idea: string, mode: GenerationMode) => void;
  isLoading: boolean;
  hasApiKey: boolean;
}

export const IdeaInput: React.FC<IdeaInputProps> = ({ onGenerate, isLoading, hasApiKey }) => {
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.GEMINI);

  // If no API key, default to Static mode, but allow user to try clicking Gemini to see error
  useEffect(() => {
    if (!hasApiKey && mode === GenerationMode.GEMINI) {
        // Optional: Auto-switch could be annoying, so we just show visual cues instead.
    }
  }, [hasApiKey, mode]);

  const handleSubmit = () => {
    if (idea.trim()) {
      onGenerate(idea, mode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit();
    }
  }

  return (
    <Card className="mb-8 animate-fade-in-up">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-3">
          <label htmlFor="ideaInput" className="text-[#CCFF00] font-bold text-lg flex items-center gap-2">
            ✨ 어떤 앱을 만들고 싶으신가요?
          </label>
          
          <div className="flex bg-[#0D1117] rounded-lg p-1 border border-[#30363d]">
             <button
              onClick={() => setMode(GenerationMode.STATIC)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${mode === GenerationMode.STATIC ? 'bg-[#21262D] text-[#00FFFF] font-bold' : 'text-gray-400 hover:text-white'}`}
             >
               ⚡ 빠른 생성 (정적)
             </button>
             <button
              onClick={() => setMode(GenerationMode.GEMINI)}
              className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${mode === GenerationMode.GEMINI ? 'bg-[#21262D] text-[#CCFF00] font-bold shadow-[0_0_5px_rgba(204,255,0,0.2)]' : 'text-gray-400 hover:text-white'}`}
             >
               <span>🧠 스마트 생성</span>
               {!hasApiKey && <span className="text-xs text-red-400 ml-1">(키 필요)</span>}
             </button>
          </div>
        </div>

        <textarea
          id="ideaInput"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 사이버펑크 테마의 실시간 주식 포트폴리오 트래커, AI 기반 투자 예측 기능 포함..."
          className="w-full min-h-[140px] p-4 bg-[#161B22] border border-[#30363d] rounded-lg text-[#E6EDF3] text-base focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] outline-none transition-all resize-y placeholder-gray-600 font-mono"
        />

        <div className="flex justify-end items-center gap-4">
          <span className="text-xs text-gray-500 mr-auto mt-2 hidden sm:block">팁: Cmd/Ctrl + Enter를 누르면 바로 생성됩니다</span>
          
          <Button 
            onClick={handleSubmit} 
            disabled={!idea.trim() || isLoading}
            className="min-w-[200px]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0D1117]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                생성 중...
              </>
            ) : (
              mode === GenerationMode.GEMINI ? '🚀 Gemini로 생성하기' : '⚡ 바로 생성하기'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};