export interface ProductSummary {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

export const PRODUCTS: ProductSummary[] = [
  {
    id: 1,
    name: "방진/위생 의류",
    category: "방진/위생 의류",
    description: "방진복, 방진화, 쉴드맥스",
    image: "https://shop-phinf.pstatic.net/20210317_179/1615961305676kOXzw_JPEG/17097194382306483_1191552259.jpg"
  },
  {
    id: 2,
    name: "보호 장갑",
    category: "보호 장갑",
    description: "니트릴/라텍스, PVC 장갑, 내화학장갑, PU장갑, 절단방지장갑",
    image: "https://loremflickr.com/800/1000/gloves,safety"
  },
  {
    id: 3,
    name: "청결/위생 소모품",
    category: "청결/위생 소모품",
    description: "무진마스크, 덴탈마스크, 자동덧신, 방진덧신",
    image: "https://loremflickr.com/800/1000/mask,hygiene"
  },
  {
    id: 4,
    name: "공정 소모품",
    category: "공정 소모품",
    description: "켐블록, 스티키매트, DCR패드, 클린룸 와이퍼, 폴리에스터 와이퍼",
    image: "https://loremflickr.com/800/1000/cleanroom,tools"
  },
  {
    id: 5,
    name: "전용 가구/설비",
    category: "전용 가구/설비",
    description: "클린룸 의자",
    image: "https://loremflickr.com/800/1000/chair,industrial"
  }
];
