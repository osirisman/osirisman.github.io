// 내부 링크 앞에 사이트 기본 경로(astro.config.mjs의 base)를 붙입니다.
// 예: base가 '/drone'일 때 url('/contact/') → '/drone/contact/'
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
