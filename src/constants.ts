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
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%EB%B0%A9%EC%A7%84%EC%9D%98%EB%A5%98%20(2).webp"
  },
  {
    id: 2,
    name: "켐블록(CHEMBLOCK) 시리즈",
    category: "켐블록(CHEMBLOCK) 시리즈",
    description: "내화학 보호복 시리즈",
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%EC%BC%90%EB%B8%94%EB%A1%9D%EC%8B%9C%EB%A6%AC%EC%A6%88.webp"
  },
  {
    id: 3,
    name: "글러브",
    category: "글러브",
    description: "니트릴/라텍스, 클린룸 글러브, 내화학 글러브",
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%EA%B8%80%EB%9F%AC%EB%B8%8C%EB%A5%98.webp"
  },
  {
    id: 4,
    name: "와이퍼류",
    category: "와이퍼류",
    description: "클린룸와이퍼, 산업용와이퍼",
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%EC%99%80%EC%9D%B4%ED%8D%BC%EB%A5%98.webp"
  },
  {
    id: 5,
    name: "클린룸 소모품",
    category: "클린룸 소모품",
    description: "무진마스크, 청소용품, 클린페이퍼",
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%ED%81%B4%EB%A6%B0%EB%A3%B8%EC%86%8C%EB%AA%A8%ED%92%88.webp"
  },
  {
    id: 6,
    name: "클린룸 가구",
    category: "클린룸 가구",
    description: "클린룸의자, SUS제작 가구류",
    img1: "https://raw.githubusercontent.com/pheejunhee86-lgtm/SJ-CORPORATION/refs/heads/main/%ED%81%B4%EB%A6%B0%EB%A3%B8%EA%B0%80%EA%B5%AC.webp"
  }
];
