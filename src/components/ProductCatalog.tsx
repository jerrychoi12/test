import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  onContactClick: () => void;
  selectedProductId: number | null;
  onProductOpen: (id: number) => void;
  onProductClose: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  expandedCategories: string[];
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProductCatalog = ({ 
  onContactClick, 
  selectedProductId, 
  onProductOpen, 
  onProductClose,
  selectedCategory,
  setSelectedCategory,
  expandedCategories,
  setExpandedCategories
}: ProductCatalogProps) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const toggleExpand = (cat: string) => {
    setExpandedCategories(prev => prev.includes(cat) ? [] : [cat]);
  };

  useEffect(() => {
    setActiveImage(null);
  }, [selectedProductId]);

  const categories = [
    { name: "방진/위생 의류", subs: ["방진복", "방진화", "쉴드맥스"] },
    { name: "보호 장갑", subs: ["니트릴/라텍스", "PVC 장갑", "내화학장갑", "PU장갑", "절단방지장갑"] },
    { name: "청결/위생 소모품", subs: ["무진마스크", "덴탈마스크", "자동덧신", "방진덧신"] },
    { name: "공정 소모품", subs: ["켐블록", "스티키매트", "DCR패드", "클린룸 와이퍼", "폴리에스터 와이퍼"] },
    { name: "전용 가구/설비", subs: ["클린룸 의자"] }
  ];

  const catalogProducts: Product[] = [
    { 
      id: 1, 
      name: "방진복 (원피스, 투피스)", 
      category: "방진/위생 의류", 
      description: "CLASS 1~1000용 고품질 방진복. 사이즈 및 로고 커스텀 가능.", 
      spec: "주문제작 사양", 
      packing: "-", 
      feature: "CLASS 1~1000용 고품질 방진복, 사이즈/로고 등 커스텀 가능", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://shop-phinf.pstatic.net/20210317_179/1615961305676kOXzw_JPEG/17097194382306483_1191552259.jpg",
      images: [
        "https://shop-phinf.pstatic.net/20210317_179/1615961305676kOXzw_JPEG/17097194382306483_1191552259.jpg",
        "https://loremflickr.com/600/600/cleanroom,suit,1",
        "https://loremflickr.com/600/600/cleanroom,suit,2",
        "https://loremflickr.com/600/600/cleanroom,suit,3",
        "https://loremflickr.com/600/600/cleanroom,suit,4"
      ]
    },
    { 
      id: 2, 
      name: "방진안전화 / 방진화", 
      category: "방진/위생 의류", 
      description: "KCS 인증 완료. 스틸토캡 적용 및 PVC 제전 소재 사용.", 
      spec: "255~310mm", 
      packing: "-", 
      feature: "KCS 인증완료, 스틸토캡 장착, PVC 제전 소재 사용", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://loremflickr.com/600/600/shoes,safety",
      images: [
        "https://loremflickr.com/600/600/shoes,safety",
        "https://loremflickr.com/600/600/shoes,safety,work",
        "https://loremflickr.com/600/600/shoes,esd",
        "https://loremflickr.com/600/600/shoes,industrial",
        "https://loremflickr.com/600/600/boots,cleanroom"
      ]
    },
    { 
      id: 3, 
      name: "방진덧신", 
      category: "청결/위생 소모품", 
      description: "표면저항 10E6~10E8. SK하이닉스 단독 공급 제품.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "표면저항 10E6~10E8, SK하이닉스 단독 공급 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://loremflickr.com/600/600/shoecover" 
    },
    { 
      id: 4, 
      name: "켐블록 (CHEMBLOCK)", 
      category: "공정 소모품", 
      description: "내화학 Class 6 인증. PE소재의 강력한 보호 성능.", 
      spec: "48mm x 50M", 
      packing: "10ROL / 1BOX", 
      feature: "내화학 Class 6, PE소재 사용, 강력 보호 성능", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://loremflickr.com/600/600/tape",
      images: [
        "https://loremflickr.com/600/600/tape",
        "https://loremflickr.com/600/600/industrial,tape",
        "https://loremflickr.com/600/600/chemical,protection",
        "https://loremflickr.com/600/600/safety,tape"
      ]
    },
    { 
      id: 5, 
      name: "쉴드맥스 (SHIELD MAX)", 
      category: "방진/위생 의류", 
      description: "KOSHA 인증 3형식(액체) 및 5,6형식(분진) 보호복.", 
      spec: "L, XL, 2XL", 
      packing: "-", 
      feature: "KOSHA 인증완료, 3형식(액체) 및 5,6형식(분진)", 
      manufacturer: "Hubei Xinxin", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/shield" 
    },
    { 
      id: 6, 
      name: "니트릴 / 라텍스 장갑", 
      category: "보호 장갑", 
      description: "CLASS 1000 대응. ESD 처리 및 세정 처리된 고품질 장갑.", 
      spec: "12인치", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "CLASS 1000, ESD 처리, 세정처리된 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "말레이시아", 
      image: "https://loremflickr.com/600/600/gloves",
      images: [
        "https://loremflickr.com/600/600/gloves",
        "https://loremflickr.com/600/600/nitrile,gloves",
        "https://loremflickr.com/600/600/latex,gloves",
        "https://loremflickr.com/600/600/cleanroom,gloves",
        "https://loremflickr.com/600/600/medical,gloves"
      ]
    },
    { 
      id: 7, 
      name: "PVC 장갑", 
      category: "보호 장갑", 
      description: "반도체 공정 단독 공급. 저이온 용출 처리.", 
      spec: "12인치", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "반도체 공정 단독 공급, 저이온 용출 처리", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대만", 
      image: "https://loremflickr.com/600/600/gloves,pvc" 
    },
    { 
      id: 8, 
      name: "G3 LDT 내화학장갑", 
      category: "보호 장갑", 
      description: "KOSHA 내화학 인증. 탁월한 유연성과 보호력.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "KOSHA 내화학 인증, 탁월 유연성 및 보호", 
      manufacturer: "유한킴벌리", 
      origin: "말레이시아", 
      image: "https://loremflickr.com/600/600/gloves,chemical" 
    },
    { 
      id: 10, 
      name: "스테인리스 절단방지장갑", 
      category: "보호 장갑", 
      description: "CUT LEVEL 5. 손등 보호 기능이 포함된 고강도 장갑.", 
      spec: "S, M, L", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "CUT LEVEL 5, 손등 보호, 고강도 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/gloves,steel" 
    },
    { 
      id: 11, 
      name: "무진마스크 (1단, 활성탄)", 
      category: "청결/위생 소모품", 
      description: "일체형 코지지대 적용. 김 서림 방지 및 뛰어난 밀착력.", 
      spec: "주문 사양", 
      packing: "10PCS/1PAC, 120PCS/1CTN", 
      feature: "일체형 코지지대, 김 서림 방지 및 밀착", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://loremflickr.com/600/600/mask,carbon" 
    },
    { 
      id: 12, 
      name: "일회용 덴탈형 마스크", 
      category: "청결/위생 소모품", 
      description: "3중 필터 구조. 가성비가 뛰어난 범용 마스크.", 
      spec: "180 x 90mm", 
      packing: "-", 
      feature: "3중 필터, 가성비 뛰어난 범용 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/mask,dental" 
    },
    { 
      id: 13, 
      name: "클린매트 (스티키매트)", 
      category: "공정 소모품", 
      description: "45마이크론 두께. 뛰어난 점착력으로 이물질 유입 차단.", 
      spec: "600 x 900mm", 
      packing: "30SHT/1PAC, 10PAC/1BOX", 
      feature: "45마이크론 두께, 점착력/이물질 차단 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "한국/중국", 
      image: "https://loremflickr.com/600/600/mat,cleanroom" 
    },
    { 
      id: 14, 
      name: "DCR패드", 
      category: "공정 소모품", 
      description: "CPE 타입의 점착 패드. 효과적인 이물질 제거.", 
      spec: "240 x 330mm", 
      packing: "-", 
      feature: "CPE 타입 점착패드 효과적 이물질 제거", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "한국/중국", 
      image: "https://loremflickr.com/600/600/pad,sticky" 
    },
    { 
      id: 15, 
      name: "클린룸 와이퍼", 
      category: "공정 소모품", 
      description: "CLASS 100 이상 대응. 흡수력과 내화학성이 뛰어난 와이퍼.", 
      spec: "9 x 9 inch", 
      packing: "100SHT/1PAC, 10PAC/1BOX", 
      feature: "CLASS 100 이상, 흡수/내화학/내구성", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/wiper,cleanroom" 
    },
    { 
      id: 16, 
      name: "폴리에스터 와이퍼", 
      category: "공정 소모품", 
      description: "폴리에스터 니트 원단 사용. 보풀 발생이 적고 세정력이 우수함.", 
      spec: "대: 300x375mm / 소: 150x187mm", 
      packing: "대: 50SHT/1PAC, 10PAC/1BOX / 소: 200SHT/1PAC, 10PAC/1BOX", 
      feature: "폴리에스터 니트원단", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/wiper,polyester" 
    },
    { 
      id: 17, 
      name: "클린룸 의자 (좌식)", 
      category: "전용 가구/설비", 
      description: "표면저항 10^7 미만. 인체공학적 설계의 제전 의자.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "표면저항 10^7 미만, 인체공학, 세정처리 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://loremflickr.com/600/600/chair,cleanroom",
      images: [
        "https://loremflickr.com/600/600/chair,cleanroom",
        "https://loremflickr.com/600/600/esd,chair",
        "https://loremflickr.com/600/600/cleanroom,furniture",
        "https://loremflickr.com/600/600/office,chair,pro"
      ]
    },
    { 
      id: 18, 
      name: "클린룸 의자 (입식형)", 
      category: "전용 가구/설비", 
      description: "정전기 보호 커버 적용. SK하이닉스 공급용 고사양 의자.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "정전기 보호커버 장착, SK하이닉스 공급 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/chair,industrial" 
    },
    { 
      id: 19, 
      name: "자동덧신 (일회용)", 
      category: "청결/위생 소모품", 
      description: "CPE 타입. 미끄럼 방지 기능이 포함된 자동 덧신.", 
      spec: "주문 사양", 
      packing: "110PCS/1PAC, 50PAC/1BOX", 
      feature: "CPE 타입, 미끄럼방지 기능 포함", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://loremflickr.com/600/600/shoecover,plastic" 
    }
  ];

  const filteredProducts = catalogProducts.filter(p => {
    if (p.category === selectedCategory) return true;
    if (selectedCategory === "방진복") return p.name.includes("방진복");
    if (selectedCategory === "방진화") return p.name.includes("방진화") || p.name.includes("안전화");
    if (selectedCategory === "방진덧신") return p.name.includes("덧신") && !p.name.includes("자동");
    if (selectedCategory === "켐블록") return p.name.includes("켐블록");
    if (selectedCategory === "쉴드맥스") return p.name.includes("쉴드맥스");
    if (selectedCategory === "니트릴/라텍스") return p.name.includes("니트릴") || p.name.includes("라텍스");
    if (selectedCategory === "PVC 장갑") return p.name.includes("PVC");
    if (selectedCategory === "내화학장갑") return p.name.includes("내화학");
    if (selectedCategory === "PU장갑") return p.name.includes("PU");
    if (selectedCategory === "절단방지장갑") return p.name.includes("절단방지");
    if (selectedCategory === "무진마스크") return p.name.includes("무진마스크");
    if (selectedCategory === "덴탈마스크") return p.name.includes("덴탈");
    if (selectedCategory === "스티키매트") return p.name.includes("스티키") || p.name.includes("클린매트");
    if (selectedCategory === "DCR패드") return p.name.includes("DCR");
    if (selectedCategory === "클린룸 와이퍼") return p.name.includes("클린룸 와이퍼");
    if (selectedCategory === "폴리에스터 와이퍼") return p.name.includes("폴리에스터");
    if (selectedCategory === "클린룸 의자") return p.name.includes("의자");
    if (selectedCategory === "자동덧신") return p.name.includes("자동덧신");
    return false;
  });

  const selectedProduct = catalogProducts.find(p => p.id === selectedProductId) || null;

  return (
    <div className={`pb-24 bg-white min-h-screen ${selectedProduct ? 'pt-16 lg:pt-32' : 'pt-24 lg:pt-32'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Sidebar */}
          <aside className={`w-full lg:w-[220px] shrink-0 ${selectedProduct ? 'hidden lg:block' : 'block'}`}>
            <div className="hidden lg:flex flex-col space-y-2">
              {categories.map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${selectedCategory === cat.name ? 'bg-crimson/5 text-crimson font-black' : 'hover:bg-white text-warmgray font-bold'}`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      if (cat.subs.length > 0) toggleExpand(cat.name);
                      if (selectedProduct) onProductClose();
                    }}
                  >
                    {cat.name}
                    {cat.subs.length > 0 && (
                      expandedCategories.includes(cat.name) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {cat.subs.length > 0 && expandedCategories.includes(cat.name) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 space-y-1 border-l-2 border-silver/30 pl-3"
                      >
                        {cat.subs.map((sub, j) => (
                          <div
                            key={j}
                            onClick={() => {
                              setSelectedCategory(sub);
                              if (selectedProduct) onProductClose();
                            }}
                            className={`py-1.5 text-xs cursor-pointer transition-colors ${selectedCategory === sub ? 'text-crimson font-black' : 'text-warmgray font-medium hover:text-crimson'}`}
                          >
                            • {sub}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden flex flex-col space-y-2 mb-4">
              <div className="grid grid-cols-3 gap-1.5">
                {categories.map((cat, i) => {
                  const isActive = selectedCategory === cat.name || cat.subs.includes(selectedCategory);
                  return (
                    <div 
                      key={i}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        if (cat.subs.length > 0) toggleExpand(cat.name);
                        if (selectedProduct) onProductClose();
                      }}
                      className={`flex flex-col items-center justify-center p-1 rounded-lg transition-all h-[30px] border text-center cursor-pointer ${isActive ? 'bg-crimson border-crimson text-white shadow-md' : 'bg-white border-silver/50 text-warmgray'}`}
                    >
                      <span className="text-[14px] font-black tracking-tighter leading-none">{cat.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {categories.map((cat) => (
                  expandedCategories.includes(cat.name) && cat.subs.length > 0 && (
                    <motion.div 
                      key={`mobile-subs-${cat.name}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white border border-silver/10 rounded-lg shadow-sm p-2 flex flex-wrap gap-1.5"
                    >
                      {cat.subs.map((sub, j) => (
                        <div
                          key={j}
                          onClick={() => {
                            setSelectedCategory(sub);
                            if (selectedProduct) onProductClose();
                          }}
                          className={`py-1 px-3 rounded-md text-[14px] transition-all border whitespace-nowrap cursor-pointer ${selectedCategory === sub ? 'bg-crimson border-crimson text-white font-black' : 'border-silver/20 text-warmgray font-bold'}`}
                        >
                          {sub}
                        </div>
                      ))}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="hidden lg:block mt-12 bg-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-navy/20">
              <h4 className="text-xl font-black mb-4 relative z-10 tracking-tight">대량 구매 문의</h4>
              <p className="text-sm text-white/80 mb-6 relative z-10 leading-relaxed font-medium">
                기업용 대량 구매 및 견적 상담이 필요하신가요? 전문가가 도와드립니다.
              </p>
              <button 
                onClick={onContactClick}
                className="w-full py-3 bg-white text-navy font-black rounded-xl text-sm hover:bg-white transition-all relative z-10 shadow-lg cursor-pointer"
              >
                견적 요청하기
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0">
            {selectedProduct ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <button 
                  onClick={onProductClose}
                  className="mt-[14px] mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
                  aria-label="목록으로 돌아가기"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                  <div className="space-y-4">
                    <div className="bg-white rounded-none overflow-hidden border border-silver/50 shadow-xl">
                      <img 
                        src={activeImage || selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full aspect-square object-cover transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 w-full">
                      {[...Array(5)].map((_, i) => {
                        const img = selectedProduct.images ? selectedProduct.images[i] : (i === 0 ? selectedProduct.image : null);
                        if (img) {
                          return (
                            <button
                              key={i}
                              onClick={() => setActiveImage(img)}
                              className={`relative aspect-square border-2 transition-all overflow-hidden ${
                                (activeImage || selectedProduct.image) === img 
                                  ? 'border-crimson shadow-md scale-95' 
                                  : 'border-silver/20 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img 
                                src={img} 
                                alt={`${selectedProduct.name} thumbnail ${i + 1}`} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </button>
                          );
                        }
                        return (
                          <div 
                            key={i}
                            className="aspect-square bg-white border-2 border-dashed border-silver/30 flex items-center justify-center opacity-40 selection:bg-transparent"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8 lg:space-y-12">
                    <div className="space-y-4 lg:space-y-6">
                      <h2 className="text-[28px] lg:text-[36px] font-black text-charcoal tracking-tighter leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-lg text-warmgray leading-relaxed font-medium opacity-90">
                        {selectedProduct.feature || selectedProduct.description}
                      </p>
                    </div>

                    <div className="bg-white border-y border-silver/20 py-2">
                      {[
                        { label: "상세규격", value: selectedProduct.spec },
                        { label: "포장단위", value: selectedProduct.packing },
                        { label: "제조사", value: selectedProduct.manufacturer },
                        { label: "원산지", value: selectedProduct.origin },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-4 border-b border-silver/10 last:border-0 hover:bg-white/30 transition-colors px-1">
                          <span className="text-base font-bold text-warmgray uppercase tracking-tight">{item.label}</span>
                          <span className="text-base text-charcoal">{item.value || '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="hidden lg:block mb-8">
                  <div className="flex items-center justify-between lg:justify-end text-[11px] font-black text-warmgray uppercase tracking-widest">
                    <span className="text-crimson font-black tracking-normal mr-auto lg:mr-0 lg:hidden text-[32px]">{selectedCategory}</span>
                    <span className="hidden lg:block mr-auto text-charcoal font-black tracking-normal normal-case text-[32px]">{selectedCategory}</span>
                    <span className="ml-4">총 {filteredProducts.length}개의 제품</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-10">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="group cursor-pointer w-full flex flex-row lg:flex-col gap-4 lg:gap-0 items-start"
                      onClick={() => onProductOpen(product.id)}
                    >
                      <div className="relative w-1/2 aspect-square lg:w-full bg-white rounded-none overflow-hidden lg:mb-5 border border-silver/50 group-hover:shadow-xl group-hover:border-silver transition-all duration-500 shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="w-1/2 md:w-full space-y-1.5 md:space-y-2 px-1 pt-1 md:pt-0 pl-4 md:pl-1">
                        <h4 className="text-sm md:text-base font-bold text-charcoal group-hover:text-crimson transition-colors tracking-tight line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-warmgray leading-relaxed font-medium opacity-90 line-clamp-2 md:line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-24 text-center">
                    <p className="text-warmgray">해당 카테고리에 등록된 제품이 없습니다.</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
