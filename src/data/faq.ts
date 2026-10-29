// 자주 묻는 질문입니다. 답변이 확정되지 않은 항목은 [답변 입력]으로 두었습니다.
// 가격, 환불, 납기처럼 확정되지 않은 정책은 확정 답변으로 쓰지 않습니다.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: '어느 지역까지 촬영이 가능한가요?',
    answer: '[활동 지역 입력] 지역을 중심으로 촬영합니다. 그 밖의 지역은 이동 거리에 따라 출장비가 추가될 수 있으니 문의해 주세요.',
  },
  { question: '비행 승인은 누가 받나요?', answer: '[답변 입력]' },
  { question: '드론 없이 행사·공연만 촬영할 수도 있나요?', answer: '[답변 입력]' },
  { question: '결과물은 언제, 어떤 형식으로 받나요?', answer: '[답변 입력]' },
];
