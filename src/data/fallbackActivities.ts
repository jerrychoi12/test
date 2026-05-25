export interface ActivityPost {
  _id: string;
  title: string;
  period: string;
  excerpt: string;
  coverImage?: any;
  body?: any[];
  published: boolean;
  _createdAt: string;
}

export const fallbackActivities: ActivityPost[] = [
  {
    _id: "sanity-fallback-1",
    title: "에스제이코퍼레이션, 2026 글로벌 테크 엑스포 공식 참가",
    period: "2026-05-25",
    excerpt: "차세대 제전 솔루션 및 클린룸 토탈 기술을 전격 선보였습니다. 글로벌 스마트제조 기업들의 뜨거운 대화를 이끌어 냈습니다.",
    coverImage: null,
    body: [
      {
        _key: "b1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "c1",
            _type: "span",
            text: "에스제이코퍼레이션은 국내외 반도체 공급망에서 정전기 방지 제전 분야의 독보적 경쟁력을 바탕으로, 이번 글로벌 테크 엑스포에서 자체 제조 생산 라인업과 신규 자동화 청정실 부스 장비를 선보였습니다."
          }
        ]
      },
      {
        _key: "b2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "c2",
            _type: "span",
            text: "많은 글로벌 바이어 및 기술 엔지니어분들이 현장 부스를 방문해 심층 상담을 진행하였으며, 주요 반도체 클린룸 운용 장비의 고도화 성능에 높은 관심과 호평을 보냈습니다."
          }
        ]
      }
    ],
    published: true,
    _createdAt: "2026-05-25T11:00:00.000Z"
  },
  {
    _id: "sanity-fallback-2",
    title: "핵심 정전기 방지(ESD) 무진 장비 특허 신출원 완료",
    period: "2026-04-18",
    excerpt: "초정밀 ESD 보호를 위한 표면 분산 점착 원자재 기술 특허를 최종 신규 출원하였습니다.",
    coverImage: null,
    body: [
      {
        _key: "b3",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "c3",
            _type: "span",
            text: "당사 연구 개발부서는 정전기 소산 효율을 대폭 향상시킨 복합 고분자 신소재 배합 기술을 독자 개발하였으며, 이에 대한 원천 특허를 공식 출원 완료하였습니다. 본 제전 기술은 향후 극초미세 디바이스 무진 포장 용도 및 제전 점착 부자재의 설계 표준에 광범위하게 적용될 예정입니다."
          }
        ]
      }
    ],
    published: true,
    _createdAt: "2026-04-18T09:30:00.000Z"
  }
];
