import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      // Vercel'deki VITE_API_KEY değişkenini alıp kodun anlayacağı formata çevirir
      'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY),
    },
  };
});