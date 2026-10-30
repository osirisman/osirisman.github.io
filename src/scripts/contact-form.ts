// 1:1 촬영 문의 폼의 입력 검사와 전송을 담당합니다.
// JavaScript가 꺼져 있으면 이 파일은 실행되지 않고, 폼은 Web3Forms로 기본 방식 제출됩니다.
// Web3Forms 문서: https://docs.web3forms.com (JSON 전송, access_key, botcheck, h-captcha-response)

const ENDPOINT = 'https://api.web3forms.com/submit';

// 입력 길이 제한입니다. HTML의 maxlength와 같은 값을 써서 두 곳이 어긋나지 않게 합니다.
const MAX = { name: 50, company: 100, location: 100, message: 2000, email: 254 };

const TYPE_VALUES = ['drone', 'building', 'corporate', 'tourism', 'event', 'other'];

// 입력 순서대로 검사합니다. 첫 번째 오류 칸으로 포커스를 옮깁니다.
const FIELD_ORDER = ['shoot_type', 'location', 'message', 'name', 'company', 'phone', 'email', 'privacy_consent'];

function setError(key: string, message: string) {
  const box = document.getElementById(`err-${key}`);
  if (box) {
    box.textContent = message;
    box.hidden = !message;
  }
  document.getElementById(`f-${key}`)?.setAttribute('aria-invalid', String(Boolean(message)));
}

function validate(form: HTMLFormElement): boolean {
  const val = (key: string) => {
    const el = form.elements.namedItem(key);
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ? el.value.trim() : '';
  };
  const errors: Record<string, string> = {};

  if (!form.querySelector('input[name=shoot_type]:checked')) {
    errors.shoot_type = '촬영 종류를 한 가지 이상 선택해 주세요.';
  }
  if (!val('location')) {
    errors.location = '촬영 장소를 입력해 주세요.';
  } else if (val('location').length > MAX.location) {
    errors.location = `촬영 장소는 ${MAX.location}자 이하로 입력해 주세요.`;
  }
  if (!val('message')) {
    errors.message = '문의 내용을 입력해 주세요.';
  } else if (val('message').length > MAX.message) {
    errors.message = `문의 내용은 ${MAX.message}자 이하로 입력해 주세요.`;
  }
  if (!val('name')) {
    errors.name = '이름을 입력해 주세요.';
  } else if (val('name').length > MAX.name) {
    errors.name = `이름은 ${MAX.name}자 이하로 입력해 주세요.`;
  }
  if (val('company').length > MAX.company) {
    errors.company = `회사·기관명은 ${MAX.company}자 이하로 입력해 주세요.`;
  }
  if (!/^01[016789]\d{7,8}$/.test(val('phone').replace(/\D/g, ''))) {
    errors.phone = '휴대폰 번호를 010-0000-0000 형식으로 입력해 주세요.';
  }
  const email = val('email');
  if (email && (email.length > MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = '이메일 주소를 확인해 주세요. 예: name@example.com';
  }
  if (!form.querySelector<HTMLInputElement>('#f-privacy_consent')?.checked) {
    errors.privacy_consent = '개인정보 수집·이용에 동의해 주셔야 접수할 수 있습니다.';
  }

  FIELD_ORDER.forEach((key) => setError(key, errors[key] ?? ''));

  const first = FIELD_ORDER.find((key) => errors[key]);
  if (first) {
    const target =
      first === 'shoot_type'
        ? form.querySelector<HTMLInputElement>('input[name=shoot_type]')
        : document.getElementById(`f-${first}`);
    target?.focus();
  }
  return !first;
}

function buildPayload(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const payload: Record<string, string> = {};
  fd.forEach((value, key) => {
    if (typeof value === 'string' && !['shoot_type', 'date', 'date_undecided'].includes(key)) {
      payload[key] = value.trim();
    }
  });

  const types = Array.from(form.querySelectorAll<HTMLInputElement>('input[name=shoot_type]:checked')).map(
    (input) => input.dataset.label ?? input.value,
  );
  const shootType = types.join(', ');
  const undecided = form.querySelector<HTMLInputElement>('input[name=date_undecided]')?.checked;

  payload.shoot_type = shootType;
  payload.shoot_date = undecided ? '미정' : String(fd.get('date') ?? '') || '(미입력)';
  payload.subject = `[촬영문의] ${shootType} / ${payload.name}`;
  payload.from_name = payload.name;
  if (payload.email) payload.replyto = payload.email;
  return payload;
}

function resetCaptcha() {
  const hcaptcha = (window as unknown as { hcaptcha?: { reset?: () => void } }).hcaptcha;
  hcaptcha?.reset?.();
}

async function send(form: HTMLFormElement, button: HTMLButtonElement) {
  const fail = document.getElementById('form-fail');
  const done = document.getElementById('form-done');
  if (fail) fail.hidden = true;

  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = '보내는 중…';

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(form)),
    });
    const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !json?.success) throw new Error(`전송 실패: ${res.status}`);

    form.hidden = true;
    if (done) {
      done.hidden = false;
      done.focus();
    }
  } catch (error) {
    console.error(error);
    if (fail) fail.hidden = false;
    // hCaptcha 인증은 한 번만 쓸 수 있으므로 다시 받아야 합니다.
    resetCaptcha();
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.textContent = '다시 보내기';
  }
}

// 촬영 종류를 하나만 선택된 상태로 맞춥니다. 홈 칩(data-type)이나 ?type= 값에 씁니다.
export function selectType(form: HTMLFormElement, type: string) {
  if (!TYPE_VALUES.includes(type)) return;
  form.querySelectorAll<HTMLInputElement>('input[name=shoot_type]').forEach((box) => {
    box.checked = box.value === type;
  });
}

const form = document.getElementById('contact-form');
if (form instanceof HTMLFormElement) {
  const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
  // 우리 쪽에서 오류 문구를 보여 주기 위해 브라우저의 기본 검사를 끕니다.
  form.noValidate = true;
  const type = new URLSearchParams(location.search).get('type');
  if (type) selectType(form, type);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate(form) || !button) return;
    void send(form, button);
  });
}
