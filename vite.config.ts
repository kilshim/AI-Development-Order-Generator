import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리의 환경 변수를 로드합니다.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Vercel 환경 변수나 .env 파일의 변수를 process.env.API_KEY로 접근 가능하게 합니다.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
    },
  };
});