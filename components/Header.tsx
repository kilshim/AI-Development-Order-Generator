import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#00FFFF] mb-3 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] tracking-tight">
        🤖 AI 개발 주문서 생성기
      </h1>
      <p className="text-[#E6EDF3] text-lg opacity-80 max-w-2xl mx-auto">
        단순한 아이디어를 <span className="text-[#CCFF00] font-bold">전문가 수준의 개발 명세서(프롬프트)</span>로 변환하세요.
        AI 코딩 비서에게 바로 작업을 지시할 수 있습니다.
      </p>
    </header>
  );
};