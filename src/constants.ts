export interface ProductSummary {
  id: number;
  name: string;
  category: string;
  description: string;
  img1: string;
}

export const CATEGORY_SUMMARIES: ProductSummary[] = [
  {
    id: 1,
    name: "방진 / 위생의류",
    category: "방진 / 위생의류",
    description: "방진복, 방진화, 제전슬리퍼",
    img1: "https://shop-phinf.pstatic.net/20210317_179/1615961305676kOXzw_JPEG/17097194382306483_1191552259.jpg"
  },
  {
    id: 2,
    name: "켐블록(CHEMBLOCK) 시리즈",
    category: "켐블록(CHEMBLOCK) 시리즈",
    description: "내화학 보호복 시리즈",
    img1: "https://loremflickr.com/800/1000/protection,suit"
  },
  {
    id: 3,
    name: "글러브",
    category: "글러브",
    description: "니트릴/라텍스, 클린룸 글러브, 내화학 글러브",
    img1: "https://loremflickr.com/800/1000/gloves,safety"
  },
  {
    id: 4,
    name: "와이퍼류",
    category: "와이퍼류",
    description: "클린룸와이퍼, 산업용와이퍼",
    img1: "https://loremflickr.com/800/1000/cleanroom,tools"
  },
  {
    id: 5,
    name: "클린룸 소모품",
    category: "클린룸 소모품",
    description: "무진마스크, 청소용품, 클린페이퍼",
    img1: "https://loremflickr.com/800/1000/mask,hygiene"
  },
  {
    id: 6,
    name: "클린룸 가구",
    category: "클린룸 가구",
    description: "클린룸의자, SUS제작 가구류",
    img1: "https://loremflickr.com/800/1000/chair,industrial"
  }
];
