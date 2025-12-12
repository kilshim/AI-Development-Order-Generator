import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ApiKeyManagerProps {
  onApiKeyChange: (key: string | null) => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeyChange }) => {
  const [inputKey, setInputKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedKey) {
      setIsSaved(true);
      onApiKeyChange(savedKey);
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    if (!inputKey.trim()) return;
    localStorage.setItem('GEMINI_API_KEY', inputKey.trim());
    setIsSaved(true);
    onApiKeyChange(inputKey.trim());
    setInputKey('');
  };

  const handleDelete = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setIsSaved(false);
    onApiKeyChange(null);
    setInputKey('');
  };

  return (
    <Card className="mb-6 py-4 px-6 border-[#00FFFF] border-opacity-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#E6EDF3]">
          <span className="text-xl">🔑</span>
          <span className="font-bold">Gemini API Key 설정</span>
        </div>

        <div className="flex-1 w-full md:w-auto flex gap-2">
          {isSaved ? (
            <div className="flex items-center justify-between w-full bg-[#0D1117] border border-green-500/50 rounded-lg px-4 py-2 text-green-400">
              <span className="flex items-center gap-2 text-sm">
                ✅ API Key가 안전하게 저장되었습니다
              </span>
              <button 
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-400 text-sm underline transition-colors"
              >
                삭제
              </button>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Gemini API Key를 입력하세요 (AI Studio)"
                className="flex-1 bg-[#0D1117] border border-[#30363d] rounded-lg px-4 text-sm text-[#E6EDF3] focus:border-[#CCFF00] focus:outline-none"
              />
              <Button 
                onClick={handleSave} 
                disabled={!inputKey.trim()}
                variant="outline"
                className="py-2 px-4 text-sm whitespace-nowrap"
              >
                저장
              </Button>
            </div>
          )}
        </div>
        
        {!isSaved && (
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-[#00FFFF] underline whitespace-nowrap"
          >
            키 발급받기 ↗
          </a>
        )}
      </div>
    </Card>
  );
};