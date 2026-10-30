// 포트폴리오 YouTube 영상 목록입니다.
// 영상이 MIN_PORTFOLIO_COUNT개(3개) 미만이면 메뉴와 메인 포트폴리오 섹션이 자동으로 숨겨집니다.
// 실제 촬영 영상만 넣어 주세요. 다른 사람의 영상을 실제 실적처럼 넣으면 안 됩니다.

export interface PortfolioVideo {
  youtubeId: string;
  title: string;
  category: '건축·부동산' | '기업·산업시설' | '행사·공연';
}

export const MIN_PORTFOLIO_COUNT = 3;

// 디자인 확인용 자리표시자 카드를 보여 줄지 정합니다. 실제 영상이 생기면 false로 바꿉니다.
export const SHOW_PORTFOLIO_PLACEHOLDER = true;

export const portfolio: PortfolioVideo[] = [];
