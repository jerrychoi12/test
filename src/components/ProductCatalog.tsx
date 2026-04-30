import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Product } from '../types';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProductCatalogProps {
  onContactClick: () => void;
  selectedProductId: number | null;
  onProductOpen: (id: number) => void;
  onProductClose: (id?: number) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSub: string;
  setSelectedSub: (sub: string) => void;
  expandedCategories: string[];
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

// 제광님의 SQL 데이터와 100% 매칭되는 기본 카테고리 구성
const DEFAULT_CATEGORIES = [
  {
    id: '방진 / 위생의류',
    subcategories: ['방진복 / 방진모', '방진안전화', '방진화', '제전슬리퍼', '타포린 덧신', '의료/제약회사 가운']
  },
  {
    id: '켐블록(CHEMBLOCK) 시리즈',
    subcategories: ['내화학테이프', '내화학보호복', '내화학덧신', '클린룸 글러브']
  },
  {
    id: '글러브',
    subcategories: ['클린룸 글러브', '멸균 글러브', '내화학 글러브', '폴리에스테르장갑', '제전장갑', '골무']
  },
  {
    id: '와이퍼류',
    subcategories: ['클린룸와이퍼', '산업용와이퍼']
  },
  {
    id: '클린룸 소모품',
    subcategories: ['부직포 소모품', '클린룸 청소용품', '클린페이퍼 & 노트']
  },
  {
    id: '클린룸 가구',
    subcategories: ['클린룸의자', 'SUS제작 가구류']
  }
];

export const ProductCatalog = ({ 
  onContactClick,
  selectedProductId,
  onProductOpen,
  onProductClose,
  selectedCategory, 
  setSelectedCategory,
  selectedSub,
  setSelectedSub,
  expandedCategories,
  setExpandedCategories
}: ProductCatalogProps) => {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        console.log("DB에서 가져온 전체 데이터:", data.products); // 상세 로그 추가
        if (data.success) {
          console.log("가져온 제품 총 개수:", data.products?.length);
          setCatalogProducts(data.products || []);
        }
      } catch (err) {
        console.error("Fetch products failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const normalize = (str: string) => (str || "").replace(/\s/g, '').toLowerCase();

  // 1. 현재 데이터기반으로 카테고리 리스트 동적 생성
  const dynamicCategories = React.useMemo(() => {
    const result: { id: string, subcategories: string[] }[] = [];
    
    // DEFAULT_CATEGORIES 순서를 유지하면서 실제 데이터가 있는 것만 필터링
    DEFAULT_CATEGORIES.forEach(defaultCat => {
      const productsInMain = catalogProducts.filter(p => normalize(p.category) === normalize(defaultCat.id));
      
      if (productsInMain.length > 0) {
        // 실제 데이터에 있는 서브카테고리만 추출
        const subsInData = Array.from(new Set(productsInMain.map(p => p.category2).filter(Boolean))) as string[];
        
        // DEFAULT에 정의된 순서를 따르되 실제 존재하는 것만 포함
        const orderedSubs = defaultCat.subcategories.filter(s => 
          subsInData.some(sid => normalize(sid) === normalize(s))
        );
        
        // DEFAULT에 없지만 데이터엔 있는 서브카테고리 추가
        const extraSubs = subsInData.filter(s => 
          !defaultCat.subcategories.some(ds => normalize(ds) === normalize(s))
        );
        
        result.push({
          id: defaultCat.id,
          subcategories: [...orderedSubs, ...extraSubs]
        });
      }
    });

    // DEFAULT_CATEGORIES에 없는 새로운 대분류 추가
    catalogProducts.forEach(p => {
      if (!p.category) return;
      const alreadyAdded = result.some(r => normalize(r.id) === normalize(p.category));
      if (!alreadyAdded) {
        const subs = Array.from(new Set(
          catalogProducts
            .filter(item => normalize(item.category) === normalize(p.category))
            .map(item => item.category2)
            .filter(Boolean)
        )) as string[];
        
        result.push({
          id: p.category,
          subcategories: subs
        });
      }
    });

    return result;
  }, [catalogProducts]);

  const currentCat = dynamicCategories.find(c => normalize(c.id) === normalize(selectedCategory));
  const subOrder = currentCat ? currentCat.subcategories : [];

  const filteredProducts = catalogProducts
    .filter(p => {
      const dbMain = normalize(p.category);
      const uiMain = normalize(selectedCategory);
      
      // 메인 카테고리 매칭 (공백 완전 무시)
      const isMainMatch = dbMain === uiMain;
      
      // 서브 카테고리 매칭 (선택된 서브가 '전체'가 아니면 category2와 비교)
      const dbSub = normalize(p.category2 || "");
      const uiSub = normalize(selectedSub);
      const isSubMatch = selectedSub === '전체' || dbSub.includes(uiSub);
      
      return isMainMatch && isSubMatch;
    })
    .sort((a, b) => {
      // 1. 서브카테고리 순서대로 정렬 (CATEGORIES 배열의 인덱스 기준)
      const indexA = subOrder.findIndex(s => normalize(s) === normalize(a.category2 || ""));
      const indexB = subOrder.findIndex(s => normalize(s) === normalize(b.category2 || ""));
      
      if (indexA !== indexB) {
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      }
      
      // 2. 같은 서브카테고리 내에서는 ID 오름차순 (먼저 등록된 순)
      return (a.id || 0) - (b.id || 0);
    });

  const selectedProduct = catalogProducts.find(p => p.id === selectedProductId) || null;
  const noImage = "https://via.placeholder.com/600x600?text=%EC%9D%B4%EB%AF%B8%EC%A7%80+%EC%A4%80%EB%B9%84+%EC%A4%91";

  return (
    <div className={`pb-24 bg-white min-h-screen ${selectedProduct ? 'pt-16 lg:pt-32' : 'pt-24 lg:pt-32'}`}>
      <div className={`max-w-7xl mx-auto ${selectedProduct ? 'px-0 lg:px-8' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Sidebar */}
          <aside className={`w-full lg:w-[220px] shrink-0 ${selectedProduct ? 'hidden lg:block' : 'block'}`}>
            <div className="hidden lg:flex flex-col space-y-2">
              {dynamicCategories.map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${normalize(selectedCategory) === normalize(cat.id) ? 'bg-crimson/5 text-crimson font-black' : 'hover:bg-white text-warmgray font-bold'}`}
                    onClick={() => {
                      // 카테고리 클릭 시 히스토리 상태를 업데이트하여 뒤로가기 시 복구되도록 함
                      window.history.replaceState({ ...window.history.state, category: cat.id, subCategory: '전체' }, '');
                      setSelectedCategory(cat.id);
                      setSelectedSub('전체');
                      if (selectedProduct) onProductClose();
                    }}
                  >
                    {cat.id}
                  </div>
                  
                  <AnimatePresence>
                    {normalize(selectedCategory) === normalize(cat.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 space-y-1 border-l-2 border-silver/30 pl-3"
                      >
                        <div
                          onClick={() => {
                            window.history.replaceState({ ...window.history.state, subCategory: '전체' }, '');
                            setSelectedSub('전체');
                            if (selectedProduct) onProductClose();
                          }}
                          className={`py-1.5 text-xs cursor-pointer transition-colors ${selectedSub === '전체' ? 'text-crimson font-black' : 'text-warmgray font-medium hover:text-crimson'}`}
                        >
                          • 전체보기
                        </div>
                        {cat.subcategories.map((sub, j) => (
                          <div
                            key={j}
                            onClick={() => {
                              window.history.replaceState({ ...window.history.state, subCategory: sub }, '');
                              setSelectedSub(sub);
                              if (selectedProduct) onProductClose();
                            }}
                            className={`py-1.5 text-xs cursor-pointer transition-colors ${selectedSub === sub ? 'text-crimson font-black' : 'text-warmgray font-medium hover:text-crimson'}`}
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
              <div className="grid grid-cols-2 gap-1.5">
                {dynamicCategories.map((cat, i) => {
                  const isActive = normalize(selectedCategory) === normalize(cat.id);
                  return (
                    <div 
                      key={i}
                      onClick={() => {
                        window.history.replaceState({ ...window.history.state, category: cat.id, subCategory: '전체' }, '');
                        setSelectedCategory(cat.id);
                        setSelectedSub('전체');
                        if (selectedProduct) onProductClose();
                      }}
                      className={`flex flex-col items-center justify-center p-1 rounded-lg transition-all h-[36px] border text-center cursor-pointer ${isActive ? 'bg-crimson border-crimson text-white shadow-md' : 'bg-white border-silver/50 text-warmgray'}`}
                    >
                      <span className="text-[12px] font-black tracking-tighter leading-none">{cat.id}</span>
                    </div>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {dynamicCategories.map((cat) => (
                  normalize(selectedCategory) === normalize(cat.id) && (
                    <motion.div 
                      key={`mobile-subs-${cat.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white border border-silver/10 rounded-lg shadow-sm p-2 flex flex-wrap gap-1.5"
                    >
                      <div
                        onClick={() => {
                          window.history.replaceState({ ...window.history.state, subCategory: '전체' }, '');
                          setSelectedSub('전체');
                          if (selectedProduct) onProductClose();
                        }}
                        className={`py-1 px-3 rounded-md text-[13px] transition-all border whitespace-nowrap cursor-pointer ${selectedSub === '전체' ? 'bg-crimson border-crimson text-white font-black' : 'border-silver/20 text-warmgray font-bold'}`}
                      >
                        전체보기
                      </div>
                      {cat.subcategories.map((sub, j) => (
                        <div
                          key={j}
                          onClick={() => {
                            window.history.replaceState({ ...window.history.state, subCategory: sub }, '');
                            setSelectedSub(sub);
                            if (selectedProduct) onProductClose();
                          }}
                          className={`py-1 px-3 rounded-md text-[13px] transition-all border whitespace-nowrap cursor-pointer ${selectedSub === sub ? 'bg-crimson border-crimson text-white font-black' : 'border-silver/20 text-warmgray font-bold'}`}
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
            {loading ? (
              <div className="py-32 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-silver/20 border-t-crimson rounded-full animate-spin" />
                <p className="text-warmgray font-black">제품을 불러오는 중...</p>
              </div>
            ) : selectedProduct ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full px-4 lg:px-0"
              >
                <button 
                  onClick={() => onProductClose()}
                  className="mt-[10px] mb-6 flex items-center justify-center w-9 h-9 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
                  aria-label="목록으로 돌아가기"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                  <div className="space-y-4 lg:sticky lg:top-32 -mx-4 lg:mx-0">
                    <div className="bg-white rounded-none overflow-hidden border-y lg:border border-silver/50 shadow-xl w-full max-w-[350px] lg:max-w-[500px] aspect-square mx-auto lg:mx-0">
                      <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        className="h-full w-full product-swiper"
                      >
                        {[selectedProduct.img1, selectedProduct.img2, selectedProduct.img3, selectedProduct.img4, selectedProduct.img5].map((img, idx) => img || (idx === 0 ? noImage : null)).filter(Boolean).map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <img 
                              src={img || ""} 
                              alt={`${selectedProduct.name} ${idx + 1}`} 
                              className="w-full h-full object-cover transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>

                  <div className="space-y-5 lg:space-y-12">
                    <div className="space-y-2 lg:space-y-6">
                      <h2 className="text-[22px] lg:text-[36px] font-black text-charcoal tracking-tighter leading-tight">
                        {selectedProduct.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <button 
                          onClick={() => {
                            setSelectedCategory(selectedProduct.category);
                            setSelectedSub('전체');
                            onProductClose();
                          }}
                          className="px-3 py-1 bg-navy/5 text-navy text-[11px] font-black rounded-lg hover:bg-navy/10 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {selectedProduct.category}
                        </button>
                        {selectedProduct.category2 && (
                          <>
                            <ChevronRight className="h-3 w-3 text-silver" />
                            <button 
                              onClick={() => {
                                setSelectedCategory(selectedProduct.category);
                                setSelectedSub(selectedProduct.category2);
                                onProductClose();
                              }}
                              className="px-3 py-1 bg-crimson/5 text-crimson text-[11px] font-black rounded-lg hover:bg-crimson/10 transition-colors cursor-pointer"
                            >
                              {selectedProduct.category2}
                            </button>
                          </>
                        )}
                      </div>
                      <p className="text-base lg:text-lg text-warmgray leading-relaxed font-medium opacity-90">
                        {selectedProduct.features}
                      </p>
                    </div>

                    <div className="bg-white border-y border-silver/20 py-1 lg:py-2">
                      {[
                        { label: "모델/품번", value: selectedProduct.model },
                        { label: "상세규격", value: selectedProduct.spec },
                        { label: "색상/사이즈", value: selectedProduct.color_size },
                        { label: "포장단위", value: selectedProduct.package },
                        { label: "제조사", value: selectedProduct.manufacturer },
                        { label: "원산지", value: selectedProduct.origin },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2.5 lg:py-4 border-b border-silver/10 last:border-0 hover:bg-white/30 transition-colors px-1">
                          <span className="text-[13px] lg:text-base font-bold text-warmgray uppercase tracking-tight">{item.label}</span>
                          <span className="text-[13px] lg:text-base text-charcoal font-medium">{item.value || '-'}</span>
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
                    <span className="mr-auto text-charcoal font-black tracking-normal normal-case text-[28px] lg:text-[32px]">{selectedCategory} {selectedSub !== '전체' && `> ${selectedSub}`}</span>
                    <span className="ml-4">총 {filteredProducts.length}개의 제품</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-6 lg:gap-y-10">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="group cursor-pointer w-full flex flex-row lg:flex-col gap-4 lg:gap-0 items-start"
                      onClick={() => onProductOpen(product.id)}
                    >
                      <div className="relative w-1/3 aspect-square lg:w-full bg-white rounded-none overflow-hidden lg:mb-5 border border-silver/50 group-hover:shadow-xl group-hover:border-silver transition-all duration-500 shrink-0">
                        <img 
                          src={product.img1 || noImage} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5 md:space-y-2 px-1 pt-1 md:pt-0 pl-4 md:pl-1">
                        <div className="text-[10px] text-warmgray font-black uppercase tracking-tighter">{product.category2 || product.category}</div>
                        <h4 className="text-sm md:text-base font-black text-charcoal group-hover:text-crimson transition-colors tracking-tight line-clamp-1">{product.name}</h4>
                        <p className="text-xs text-warmgray leading-relaxed font-medium opacity-90 line-clamp-2">{product.features}</p>
                        {product.model && <div className="text-[10px] font-black text-crimson uppercase">Model: {product.model}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-24 text-center">
                    <p className="text-warmgray font-medium">해당 카테고리에 등록된 제품이 없습니다.</p>
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
