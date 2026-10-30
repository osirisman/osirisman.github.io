// 홈 화면 위에 뜨는 문의 창을 여닫습니다.
// data-contact-open이 붙은 링크를 누르면 페이지 이동 없이 창을 엽니다. 창이 없는 페이지에서는 링크가 그대로 /contact로 이동합니다.
import { selectType } from './contact-form';

const dialog = document.getElementById('contact-dialog');

if (dialog instanceof HTMLDialogElement) {
  const form = dialog.querySelector<HTMLFormElement>('#contact-form');
  const done = document.getElementById('form-done');
  let opener: HTMLElement | null = null;

  const open = (type?: string) => {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // 접수가 끝난 뒤 다시 열면 빈 폼으로 돌아갑니다.
    if (form && form.hidden) {
      form.hidden = false;
      form.reset();
      if (done) done.hidden = true;
    }
    if (form && type) selectType(form, type);
    dialog.showModal();
  };

  dialog.addEventListener('close', () => opener?.focus());
  dialog.querySelector('[data-contact-close]')?.addEventListener('click', () => dialog.close());
  // 바깥 배경(창 밖 영역)을 누르면 닫습니다.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const trigger = event.target.closest<HTMLElement>('[data-contact-open]');
    // 새 탭으로 열기(Ctrl·Cmd·Shift 클릭)는 링크 그대로 둡니다.
    if (!trigger || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    open(trigger.dataset.type);
  });
}
