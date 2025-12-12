import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = () => `
당신은 엘리트 소프트웨어 아키텍트이자 테크니컬 리드입니다. 당신의 임무는 사용자의 웹 애플리케이션 아이디어를 해석하고, 사용자가 다른 AI(Gemini, ChatGPT, Claude 등)에게 실제 애플리케이션 구축을 지시할 수 있는 매우 상세하고 전문적인 '개발 프롬프트(주문서)'를 생성하는 것입니다.

출력은 반드시 **한국어**로 작성되어야 하며, **마크다운(Markdown)** 형식을 따라야 합니다.
AI 개발자가 명확하게 이해할 수 있도록 엄격한 구조를 따라야 합니다.

출력 구조:
1.  **프로젝트명**: 프로젝트 오더: [앱 이름]
2.  **AI 페르소나 설정**: AI의 역할 정의 (예: 시니어 React 엔지니어).
3.  **프로젝트 개요**: PRD 요약.
4.  **기술 스택**: 최신 모던 스택 추천 (특별한 요구사항이 없다면 React/Tailwind/TypeScript 기본 추천).
5.  **핵심 기능**: 5-7가지의 구체적이고 구현 가능한 기능 목록.
6.  **UI/UX 가이드**: 컬러 팔레트(구체적인 Hex 코드 제안), 타이포그래피, 레이아웃 전략.
7.  **구현 단계**: 단계별 가이드 (아키텍처 -> MVP -> 고도화).
8.  **제약 사항 및 규칙**: 코드 품질, 반응형, 클린 코드 등에 대한 규칙.

톤앤매너: 권위 있고, 기술적이며, 정확하게.
`;

export const generateGeminiPrompt = async (idea: string, userApiKey?: string): Promise<string> => {
  try {
    // Priority: User provided key -> Environment variable
    const apiKey = userApiKey || process.env.API_KEY;
    
    if (!apiKey) {
      throw new Error("API Key가 없습니다. 상단의 설정 메뉴에서 API Key를 입력하거나 환경 변수를 확인해주세요.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // We use a model capable of good reasoning to structure the technical prompt
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `사용자 아이디어: "${idea}"\n\n이 아이디어를 바탕으로 전문가용 개발 주문서를 생성해주세요.`,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7, // Balance between creativity and structure
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini로부터 응답을 받지 못했습니다.");
    }

    return text;

  } catch (error) {
    console.error("Gemini 생성 오류:", error);
    throw error;
  }
};