// 서비스 6개의 정보입니다. 목록 순서가 메인 페이지의 순서가 됩니다.
// 디자인에 내용이 있는 "행사·공연 영상"만 실제 문구를 넣었고, 나머지는 [대괄호] 자리표시자입니다.

export interface Service {
  title: string;
  description: string;
  deliverable: string;
  usage: string;
  point: string;
}

const placeholder = {
  description: '[설명 입력]',
  deliverable: '[결과물 입력]',
  usage: '[용도 입력]',
  point: '[포인트 입력]',
};

export const services: Service[] = [
  { title: '드론 항공 영상', ...placeholder },
  { title: '항공 사진', ...placeholder },
  { title: '건축물·부동산', ...placeholder },
  { title: '기업·산업시설', ...placeholder },
  {
    title: '행사·공연 영상',
    description: '지상 카메라로 무대와 현장을 기록하고, 필요하면 드론으로 행사장 전경을 더합니다.',
    deliverable: '하이라이트, 전체 기록 영상',
    usage: '공연 기록, 행사 스케치',
    point: '지상 + 항공 함께 촬영',
  },
  { title: '편집·후반 작업', ...placeholder },
];
