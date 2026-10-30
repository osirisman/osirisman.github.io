# CLAUDE.md: 드론·행사 촬영 회사 홈페이지

이 파일은 VS Code의 Claude Code가 이 프로젝트에서 작업할 때 지키는 규칙입니다.
원래 요구사항은 `docs/컨텍스트.txt`에 있습니다. 그 문서의 "8. 최초 지시(코드 작성 금지)"는 이미 끝난 단계입니다. 기획과 디자인은 2026-10-26에 승인되었고, 지금은 **코딩 단계**입니다.

## 사용자

- HTML은 잘 알지만 그 밖의 웹 개발(Node.js, Git, 빌드 도구)은 처음입니다.
- 작업은 작은 단계로 나누고, 단계마다 무엇을 바꿨는지(파일 이름과 이유)를 쉬운 한국어로 알려 주세요.
- 실행 방법은 터미널에 입력할 명령을 그대로 적어 주세요.
- 사용자의 제안이라도 문제가 있으면 이유와 대안을 함께 말해 주세요.

## 확정된 결정

| 항목 | 결정 |
|---|---|
| 디자인 | `design/메인페이지-최종안.html` (데스크톱·모바일 반응형, 기준 폭 768px) |
| 디자인 가이드 | `design/디자인-가이드.png` |
| 메뉴 | 회사소개 · 서비스 · 포트폴리오 · 문의 + "촬영 문의하기" 버튼, 하단에 개인정보처리방침 |
| 콘텐츠 비중 | 드론 항공 촬영 약 70%, 행사·공연 영상촬영(지상 카메라, 필요하면 드론 병행) 약 30% |
| 기술 | Astro (정적 사이트 출력), 일반 CSS. Tailwind, React 같은 추가 프레임워크는 쓰지 않습니다. |
| 공개 | 도메인 구매 전까지 GitHub Pages. GitHub Actions의 Astro 공식 배포 방식을 사용합니다. |
| 문의 | 전화(`tel:`)와 이메일(`mailto:`) 연결. 문의 폼(`/contact`)은 지금 단계에서 Web3Forms로 붙입니다(접근 키는 `src/data/site.ts`). |

## 디자인 규칙 (사용자가 바꾸라고 하기 전에는 바꾸지 않습니다)

- `design/메인페이지-최종안.html`과 **똑같이** 보이게 구현합니다. 색, 글꼴, 크기, 여백, 모서리를 임의로 바꾸지 않습니다.
- 색과 글꼴은 그 파일 맨 위 `:root`의 CSS 변수를 `src/styles/tokens.css`로 옮겨 그대로 씁니다.
- 섹션 경계는 직선입니다. 둥근 섹션 모서리나 겹침을 넣지 않습니다.
- 노란색(#EBCD62)은 행동 버튼과 작은 강조에만 씁니다.
- 글꼴: 제목 Noto Serif KR, 본문 Noto Sans KR (Google Fonts).

## 콘텐츠 규칙

- 실적 숫자, 자격·인증, 고객사 로고, 후기, 장비 목록을 만들어 넣지 않습니다.
- 모르는 정보는 `[대괄호]` 또는 "(가칭)"으로 남기고, **`src/data/site.ts` 한 파일**에서만 관리합니다. 회사명, 대표자, 사업자등록번호, 주소, 전화, 이메일, 활동 지역이 여기에 들어갑니다.
- 계약 전 단계에서 현장 방문을 약속하는 표현(예: "현장 확인")을 쓰지 않습니다. 진행 2단계는 "상담·촬영 조건 검토"이고, 사전 답사는 "계약 후 별도 협의"입니다.
- 비행 승인 관련 문구는 "드론 촬영이 있는 경우"로 한정합니다.
- 확인되지 않은 정책(가격, 환불, 납기)은 확정 답변으로 쓰지 않습니다.
- 다른 사람의 사진이나 영상을 실제 포트폴리오처럼 보이게 쓰지 않습니다.

## 폴더 구조 (목표)

```
src/
  data/site.ts         회사 정보와 연락처 (임시값)
  data/services.ts     서비스 6개: 제목, 설명, 결과물, 용도, 포인트
  data/portfolio.ts    YouTube 영상 목록 (URL, 제목, 분류)
  data/faq.ts          자주 묻는 질문
  styles/tokens.css    색·글꼴 변수
  styles/global.css    공통 스타일
  components/          Header, Footer, SectionHead, Pill 등 반복 요소
  layouts/Base.astro   공통 틀 (head, 메타 정보, Header, Footer)
  pages/               index, about, services, portfolio, contact, privacy
public/                파비콘, 이미지
.github/workflows/deploy.yml   GitHub Pages 자동 배포
```

## 기능 규칙

- 포트폴리오 영상이 3개 미만이면 메뉴와 메인 포트폴리오 섹션을 숨깁니다(`portfolio.ts`의 개수로 자동 판단).
- YouTube는 썸네일을 먼저 보여 주고, 클릭하면 `youtube-nocookie.com` iframe을 불러옵니다(첫 화면 속도 보호).
- 서비스 목록 전환과 모바일 메뉴는 작은 일반 JavaScript로 만들고, JavaScript가 꺼져도 내용은 읽히게 합니다.
- FAQ는 `<details>`를 씁니다.
- 접근성: 키보드 포커스 표시, 이미지 대체 텍스트, `prefers-reduced-motion` 존중, 충분한 색 대비.
- 페이지마다 `<title>`과 메타 설명을 넣고, 사이트맵과 robots.txt를 만듭니다.

## GitHub Pages 배포

- 저장소 이름이 `아이디.github.io`이면 `astro.config.mjs`에 `site: 'https://아이디.github.io'`만 설정합니다.
- 저장소 이름이 다르면 `base: '/저장소이름'`도 설정하고, 내부 링크와 이미지 경로가 base를 따르도록 합니다.
- 배포는 `.github/workflows/deploy.yml`(Astro 공식 `withastro/action`)로 하고, 저장소 Settings → Pages → Source는 "GitHub Actions"입니다.
- 비밀키, 비밀번호, API 토큰은 절대 저장소에 넣지 않습니다(공개 저장소).

## 저장소 분리 규칙

- 각 사이트는 독립 저장소입니다. 드론 사이트는 `drone` 저장소이고, `osirisman.github.io`는 목록 페이지(`index.html`)만 둡니다.
- 사이트끼리 파일을 공유하지 않습니다. 다른 사이트의 CSS, JS, 이미지, 폰트를 가져다 쓰지 않습니다.
- 내부 링크는 `src/utils/url.ts`의 `url()` 함수로 감싸서 base(`/drone`)를 붙입니다. 하위 페이지에서 경로가 틀어지는 상대경로(`../`)는 쓰지 않습니다.
- 외부 자원은 허용된 곳(Google Fonts, Web3Forms, YouTube)만 씁니다.
- 새 내부 링크를 추가할 때는 `href="/..."`를 직접 쓰지 말고 `url('/...')`로 씁니다.

## 작업 방식

1. 한 번에 한 페이지(또는 한 기능)만 작업합니다.
2. 작업 후 `npm run dev`로 미리보기를 띄우고, 확인할 주소(http://localhost:4321)와 확인할 부분을 알려 줍니다.
3. 사용자가 확인하면 그때 커밋합니다. 커밋 메시지는 한국어로 무엇을 했는지 짧게 씁니다.
4. GitHub에 올리기(push)는 사용자가 원할 때만 합니다.
