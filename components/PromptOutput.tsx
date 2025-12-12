import React, { useState } from 'react';
import { Card } from './ui/Card';

interface PromptOutputProps {
  content: string;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="animate-fade-in border-[#CCFF00] border-opacity-30">
      <div className="flex justify-between items-center mb-4 border-b border-[#00FFFF] border-opacity-20 pb-4">
        <h2 className="text-xl font-bold text-[#CCFF00] flex items-center gap-2">
          📜 생성된 개발자 주문서
        </h2>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-[#00FFFF] text-[#0D1117] hover:bg-[#66FFFF]'
          }`}
        >
          {copied ? '✅ 복사 완료!' : '마크다운 복사'}
        </button>
      </div>
      
      <div className="relative">
        <pre className="w-full bg-[#0D1117] border border-[#30363d] rounded-lg p-6 overflow-x-auto text-sm leading-relaxed text-[#E6EDF3] font-mono whitespace-pre-wrap max-h-[600px] overflow-y-auto selection:bg-[#00FFFF] selection:text-[#0D1117]">
          {content}
        </pre>
      </div>
    </Card>
  );
};