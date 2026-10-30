// Astro 설정 파일입니다.
// GitHub Pages 주소입니다. 이 사이트는 osirisman.github.io/drone/ 에서 열리므로 base를 설정합니다.
// 내부 링크는 src/utils/url.ts의 url() 함수로 감싸서 base를 붙입니다.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://osirisman.github.io',
  base: '/drone',
});
