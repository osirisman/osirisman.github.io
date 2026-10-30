// 서비스 목록 전환과 모바일 메뉴만 담당합니다.
// JavaScript가 꺼져 있으면 서비스 내용이 모두 세로로 보이므로 내용은 그대로 읽을 수 있습니다.

const serviceSection = document.querySelector<HTMLElement>('[data-svc-section]');

if (serviceSection) {
  const tabs = serviceSection.querySelectorAll<HTMLButtonElement>('[data-svc-tab]');
  const panels = serviceSection.querySelectorAll<HTMLElement>('[data-svc-panel]');

  const select = (index: number) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-pressed', String(on));
      tab.parentElement?.classList.toggle('on', on);
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
  });

  select(Number(serviceSection.dataset.default ?? 0));
}

const menuButton = document.querySelector<HTMLButtonElement>('.menu-btn');
const mobileNav = document.getElementById('m-nav');

menuButton?.addEventListener('click', () => {
  const open = !mobileNav?.classList.contains('open');
  mobileNav?.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
