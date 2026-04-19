import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  ShieldCheck, 
  Truck, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Search,
  ChevronLeft,
  Filter,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  spec?: string;
  packing?: string;
  feature?: string;
  manufacturer?: string;
  origin?: string;
}

// --- Data ---
const PRODUCTS = [
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

// --- Components ---

const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg 
    viewBox="0 0 585 214" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M109.104 103.543C195.375 144.762 292.017 106.895 292.017 106.895L355.782 161.714C355.782 161.714 145.427 251.808 3.89715 139.75C60.7929 120.797 64.2437 119.171 109.104 103.543Z" fill="#D3404B"/>
    <path d="M474.143 113.954C388.479 71.4881 291.298 107.949 291.298 107.949L228.334 52.2108C228.334 52.2108 439.974 -34.8215 579.864 79.2778C522.699 97.403 519.225 98.979 474.143 113.954Z" fill="black"/>
  </svg>
);

const Navbar = ({ onLogoClick, currentView }: { onLogoClick: () => void, currentView: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrolled(window.scrollY > 20);
      } catch (e) {
        console.error("Scroll handling error:", e);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent, targetId: string) => {
    try {
      if (currentView !== 'home') {
        onLogoClick();
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
            <Logo className="h-5 w-auto" />
            <span className={`text-xl md:text-2xl font-black tracking-tighter ${scrolled || currentView !== 'home' ? 'text-charcoal' : 'text-white'}`}>
              에스제이코퍼레이션
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className={`flex space-x-6 text-sm font-semibold ${scrolled || currentView !== 'home' ? 'text-warmgray' : 'text-white/90'} mr-8`}>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-crimson transition-colors cursor-pointer">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-crimson transition-colors cursor-pointer">주요품목</a>
            </div>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-navy text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-steelblue transition-all shadow-lg cursor-pointer">
              견적 문의
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 cursor-pointer ${scrolled || currentView !== 'home' ? 'text-charcoal' : 'text-white'}`}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-white border-t border-silver/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block text-base font-medium text-charcoal">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block text-base font-medium text-charcoal">주요품목</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="w-full bg-navy text-white block text-center py-3 rounded-lg font-bold">견적 문의하기</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onCatalogClick }: { onCatalogClick: () => void }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover"
      >
        <source src="https://raw.githubusercontent.com/jerrychoi12/img/main/Background.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-navy/30" />
    </div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-[65px] font-black text-white mb-6 tracking-tighter">
          청정 토탈 솔루션
          <span className="text-crimson block mt-[15px]">에스제이코퍼레이션</span>
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-10 max-w-2xl mx-auto opacity-90">
          직접 제조부터 실시간 긴급 대응까지, ESD 솔루션의 끊김 없는 파트너
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-crimson text-white font-bold text-lg hover:bg-deepred shadow-xl group transition-all cursor-pointer">
            빠른 견적 문의 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={onCatalogClick} className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-all cursor-pointer">
            제품 카탈로그
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const AboutContent = ({ onHistoryClick, onPartnersClick }: { onHistoryClick: () => void, onPartnersClick: () => void }) => (
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      className="space-y-6"
    >
      <motion.h3 
        variants={{ hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 tracking-tighter"
      >
        신뢰를 최우선으로 하는 <br /> B2B 유통 전문 파트너
      </motion.h3>
      <motion.p 
        variants={{ hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-lg text-warmgray mb-8 opacity-90 text-justify"
      >
        1990년 설립 이후, 삼성전자와 SK하이닉스 등 글로벌 기업들의 신뢰를 바탕으로 성장해 온 전문 기업입니다.
      </motion.p>
      <motion.div 
        variants={{ hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 mb-10"
      >
        {["ESD: 완벽한 정전기 제어 솔루션", "SAFETY: 작업자 보호구 개발", "CHEMICAL: 독보적인 내화학 기술력"].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-crimson" />
            <span className="text-charcoal font-medium">{item}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex justify-center items-center h-[400px]"
    >
      <div className="relative w-full max-w-[350px] aspect-square">
        {/* History Button Circle */}
        <motion.button
          whileHover={{ scale: 1.05, zIndex: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHistoryClick}
          className="absolute top-0 left-0 w-48 h-48 md:w-56 md:h-56 rounded-full bg-crimson text-white flex flex-col items-center justify-center shadow-2xl z-10 cursor-pointer group transition-all"
        >
          <span className="text-2xl md:text-3xl font-black mb-1">연혁</span>
          <span className="text-xs md:text-sm opacity-80 font-medium">HISTORY</span>
        </motion.button>

        {/* Partners Button Circle */}
        <motion.button
          whileHover={{ scale: 1.05, zIndex: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPartnersClick}
          className="absolute bottom-0 right-0 w-48 h-48 md:w-56 md:h-56 rounded-full bg-navy text-white flex flex-col items-center justify-center shadow-2xl z-20 cursor-pointer group transition-all"
        >
          <span className="text-2xl md:text-3xl font-black mb-1">파트너</span>
          <span className="text-xs md:text-sm opacity-80 font-medium">PARTNERS</span>
        </motion.button>

        {/* Decorative connecting element removed */}
      </div>
    </motion.div>
  </div>
);

const HistorySection = ({ onBack }: { onBack: () => void }) => {
  const historyData = [
    {
      period: "1990~ | 시장 진입 및 기반 구축",
      sub: "클린룸 용품 시장 본격 진출과\n생산 역량 확보",
      items: [
        { year: "1990", content: "본사 설립 및 운영 개시" },
        { year: "1995", content: "국내 주요 유아용 브랜드 전문 제품 공급" },
        { year: "2006", content: "클린룸 전용 방진복 및 와이퍼 자체 생산 체계 구축" },
        { year: "2011", content: "KCS 인증 클린룸 안전화 개발 완료" },
        { year: "2012", content: "국내 3대 대형 B2B 유통 플랫폼과 협력 관계 구축" },
      ]
    },
    {
      period: "2015~ | 핵심 파트너십 강화 및 산업 확대",
      sub: "글로벌 선도 기업과의 협력 및\n제품 표준화",
      items: [
        { year: "2015", content: "S그룹 반도체 제조사에 제전 슬리퍼 및 안전화 전량 공급" },
        { year: "2020", content: "S그룹 가전/디스플레이사에 표준 제전 장갑 채택" },
        { year: "2021", content: "S그룹 배터리 제조사에 공정용 제전 장갑 및 방진복 공급" },
        { year: "2022", content: "S그룹 반도체 생산 라인 전 사업장에 클린룸 전용 의자 공급" },
        { year: "2023", content: "H그룹 완성차 제조사에 친환경 PU 코팅 장갑 공급" },
        { year: "2024", content: "S그룹 정밀 부품 제조사 대상 내화학글러브 및 클린룸 소모품 공급 개시" },
      ]
    },
    {
      period: "2025~ | 토탈 솔루션 및\n                   고기능성 제품 혁신",
      sub: "통합 공급망 구축 및 자체 기술 기반의\n내화학용품 제품 개발",
      items: [
        { year: "2025~", content: "A 반도체 중견기업 대상 클린룸 소모품 턴키(Turn-key) 공급 계약 체결" },
        { year: "", content: "D 반도체 파운드리에 정밀 공정 라인용 특수 제전 패키징 공급" },
        { year: "", content: "K 정밀 화학 및 소재 전문 기업 대상 니트릴 글러브 공급 개시" },
        { year: "", content: "자체 기술 기반 내화학 테이프 (CHEMBLOCK) 브랜드 개발 및 런칭" },
        { year: "", content: "D사의 Flash Spun 기술을 활용한 고성능 내화학 보호복 라인업 자체 개발 중" },
      ]
    }
  ];
  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter mb-4 uppercase">OUR HISTORY</h2>
          <div className="h-1.5 w-20 bg-crimson mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {historyData.map((section, idx) => (
            <motion.div 
              key={idx} 
              variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-offwhite rounded-2xl p-8 border border-silver/50 hover:border-silver transition-all"
            >
              <div className="text-navy font-black text-base mb-2 whitespace-pre-wrap">{section.period}</div>
              <h4 className="font-bold text-lg text-charcoal mb-4 tracking-tight whitespace-pre-wrap">{section.sub}</h4>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm leading-relaxed">
                    <div className="w-14 shrink-0 text-navy font-bold">
                      {item.year ? (item.year.includes('~') ? item.year : `${item.year}.`) : ""}
                    </div>
                    <div className="text-warmgray flex-1 font-medium">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CompanySection = ({ onPartnersClick, onHistoryClick }: { onPartnersClick: () => void, onHistoryClick: () => void }) => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="order-2 md:order-1">
          <AboutContent 
            onHistoryClick={onHistoryClick} 
            onPartnersClick={onPartnersClick} 
          />
        </div>

        {/* Location Photo Cards */}
        <div className="order-1 md:order-2 mb-12 md:mb-0 md:mt-12 max-w-3xl mx-auto grid grid-cols-3 gap-3 md:gap-5 w-full">
          {[
            { 
              title: "본사", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/house.webp"
            },
            { 
              title: "물류센터", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/warehouse.webp"
            },
            { 
              title: "청주 사무소", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/cheongju.webp"
            }
          ].map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl md:rounded-[20px] aspect-[4/3] shadow-md hover:shadow-lg transition-all duration-500"
            >
              <img 
                src={loc.image} 
                alt={loc.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-3 md:p-5 w-full transform translate-y-1 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-xs md:text-lg font-black text-white tracking-tight">{loc.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = ({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) => (
  <section id="products" className="py-32 bg-white relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter">OUR PRODUCT</h2>
        <div className="h-1.5 w-20 bg-crimson mx-auto mt-6 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 items-start">
        {PRODUCTS.map((product, idx) => {
          const styleIdx = idx % 5;
          const heights = [
            "h-[200px] md:h-[380px]", 
            "h-[200px] md:h-[420px]", 
            "h-[200px] md:h-[460px]", 
            "h-[200px] md:h-[400px]",
            "h-[200px] md:h-[430px]"
          ];
          const offsets = ["lg:mt-0", "lg:mt-12", "lg:-mt-8", "lg:mt-6", "lg:-mt-4"];
          
          return (
              <motion.div
                key={product.id}
                onClick={() => onCategoryClick(product.category)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: styleIdx * 0.05, ease: "easeOut" }}
                className={`relative group cursor-pointer overflow-hidden ${heights[styleIdx]} ${offsets[styleIdx]} shadow-2xl transition-all duration-500 hover:z-10 hover:scale-[1.02] mb-4 lg:mb-0`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-x-0 top-[45%] md:top-[60%] flex flex-col p-6 md:p-10 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-[18px] font-black text-white mb-1.5 md:mb-2 tracking-tight leading-none group-hover:text-white transition-colors">
                  {product.name}
                </h4>
                <p className="text-[11px] md:text-[12px] text-white/70 font-medium leading-tight">
                  {product.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mgopjore", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white text-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter text-charcoal">지금 전문가와 상담하세요</h3>
          <div className="space-y-6">
            <div className="flex gap-4"><Phone className="text-crimson" /> <span className="font-medium text-warmgray">+82-031-548-4255</span></div>
            <div className="flex gap-4"><Mail className="text-crimson" /> <span className="font-medium text-warmgray">sjcorp@sj-ct.co.kr</span></div>
            <div className="flex gap-4"><MapPin className="text-crimson" /> <span className="font-medium text-warmgray">경기도 수원시 장안구 송원로 59번길 53</span></div>
          </div>
        </div>
        <div className="bg-crimson rounded-3xl p-8 text-white shadow-2xl min-h-[400px] flex flex-col justify-center">
          {status === "SUCCESS" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="h-16 w-16 text-white mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-2">문의가 접수되었습니다</h4>
              <p className="text-white/80">확인 후 빠른 시일 내에 연락드리겠습니다.</p>
              <button 
                onClick={() => setStatus(null)} 
                className="mt-6 text-white font-bold hover:underline"
              >
                다시 문의하기
              </button>
            </motion.div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input 
                name="company"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white outline-none transition-all placeholder:text-white/60 text-white" 
                placeholder="회사명" 
              />
              <input 
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white outline-none transition-all placeholder:text-white/60 text-white" 
                placeholder="담당자 성함" 
              />
              <input 
                name="phone"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white outline-none transition-all placeholder:text-white/60 text-white" 
                placeholder="연락처" 
              />
              <input 
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white outline-none transition-all placeholder:text-white/60 text-white" 
                placeholder="이메일 주소" 
              />
              <textarea 
                name="message"
                required
                rows={4} 
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-white outline-none transition-all resize-none placeholder:text-white/60 text-white" 
                placeholder="문의하실 내용을 상세히 적어주세요." 
              />
              <button 
                type="submit"
                disabled={status === "SENDING"}
                className="w-full py-4 rounded-lg bg-white text-crimson font-bold shadow-lg hover:bg-offwhite transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "SENDING" ? "전송 중..." : status === "ERROR" ? "다시 시도해주세요" : "문의 보내기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white/50 backdrop-blur-sm py-10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-6">
      <div>
        <p className="text-sm text-charcoal">© 2026 에스제이코퍼레이션. All rights reserved.</p>
      </div>
      <div className="text-xs md:text-sm text-warmgray space-y-1">
        <p>대표자: 이철수</p>
        <p>+82-031-548-4255 | sjcorp@sj-ct.co.kr</p>
        <p>경기도 수원시 장안구 송원로 59번길 53</p>
      </div>
    </div>
  </footer>
);

const ProductCatalog = ({ 
  onContactClick, 
  selectedProductId, 
  onProductOpen, 
  onProductClose,
  selectedCategory,
  setSelectedCategory,
  expandedCategories,
  setExpandedCategories
}: { 
  onContactClick: () => void,
  selectedProductId: number | null,
  onProductOpen: (id: number) => void,
  onProductClose: () => void,
  selectedCategory: string,
  setSelectedCategory: (cat: string) => void,
  expandedCategories: string[],
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
}) => {
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
    // Sub-category matching logic
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
    <div className={`pb-24 bg-white min-h-screen ${selectedProduct ? 'pt-16 lg:pt-32' : 'pt-24 md:pt-32'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Sidebar - Hidden on mobile when viewing a product */}
          <aside className={`w-full lg:w-[220px] shrink-0 ${selectedProduct ? 'hidden lg:block' : 'block'}`}>
            {/* Desktop View */}
            <div className="hidden lg:flex flex-col space-y-2">
              {categories.map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all text-sm ${selectedCategory === cat.name ? 'bg-crimson/5 text-crimson font-black' : 'hover:bg-offwhite text-warmgray font-bold'}`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      if (cat.subs.length > 0) toggleExpand(cat.name);
                      if (selectedProduct) onProductClose(); // Close detail when picking a new category
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

            {/* Mobile View - Grid for Main Categories, Horizontal for Subcategories */}
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
                className="w-full py-3 bg-white text-navy font-black rounded-xl text-sm hover:bg-offwhite transition-all relative z-10 shadow-lg cursor-pointer"
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
                    <div className="bg-offwhite rounded-none overflow-hidden border border-silver/50 shadow-xl">
                      <img 
                        src={activeImage || selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full aspect-square object-cover transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    {/* Thumbnail Gallery */}
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
                            className="aspect-square bg-offwhite border-2 border-dashed border-silver/30 flex items-center justify-center opacity-40 selection:bg-transparent"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8 lg:space-y-12">
                    <div className="space-y-4 lg:space-y-6">
                      <h2 className="text-[28px] md:text-[36px] font-black text-charcoal tracking-tighter leading-tight">
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
                        <div key={idx} className="flex justify-between items-center py-4 border-b border-silver/10 last:border-0 hover:bg-offwhite/30 transition-colors px-1">
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
                  <h2 className="text-3xl md:text-5xl font-black text-charcoal mb-4 tracking-tighter leading-tight lg:hidden">제품 카탈로그</h2>
                  <div className="flex items-center justify-between lg:justify-end text-[11px] font-black text-warmgray uppercase tracking-widest">
                    <span className="text-crimson font-black tracking-normal mr-auto lg:mr-0 lg:hidden text-[32px]">{selectedCategory}</span>
                    <span className="hidden lg:block mr-auto text-charcoal font-black tracking-normal normal-case text-[32px]">{selectedCategory}</span>
                    <span className="ml-4">총 {filteredProducts.length}개의 제품</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-10">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="group cursor-pointer w-full flex flex-row md:flex-col gap-4 md:gap-0 items-start"
                      onClick={() => onProductOpen(product.id)}
                    >
                      <div className="relative w-1/2 aspect-square md:w-full bg-white rounded-none overflow-hidden md:mb-5 border border-silver/50 group-hover:shadow-xl group-hover:border-silver transition-all duration-500 shrink-0">
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

const PartnersPage = ({ onContactClick, onBack }: { onContactClick: () => void, onBack: () => void }) => {
  const logos = [
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo1.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo2.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo3.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo4.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo5.webp"
  ];

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter mb-6">OUR PARTNERS</h2>
          <p className="text-lg text-warmgray max-w-2xl mx-auto font-medium">
            에스제이코퍼레이션은 국내외 유수의 기업들과 함께하며 최상의 솔루션을 제공하고 있습니다.
          </p>
          <div className="h-1.5 w-20 bg-crimson mx-auto mt-8 rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-8 mb-32 px-4">
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt={`Partner ${i + 1}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: 0.05, 
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
              className="max-w-full h-auto transition-all duration-500 cursor-pointer hover:scale-[1.03]"
            />
          ))}
        </div>

        <div className="bg-navy rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-6 relative z-10 tracking-tight">새로운 파트너십을 기다립니다</h3>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto relative z-10 font-medium">
            에스제이코퍼레이션의 청정 토탈 솔루션과 함께 성장할 비즈니스 파트너를 모십니다.
          </p>
          <button 
            onClick={onContactClick}
            className="px-12 py-5 bg-crimson text-white font-black rounded-2xl text-lg hover:bg-deepred transition-all relative z-10 shadow-xl hover:shadow-crimson/20 cursor-pointer"
          >
            파트너십 문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'catalog' | 'partners' | 'history'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("방진/위생 의류");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["방진/위생 의류"]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        if (event.state.view) setView(event.state.view);
        setSelectedProductId(event.state.productId || null);
      } else {
        setView('home');
        setSelectedProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'home', productId: null }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: 'home' | 'catalog' | 'partners' | 'history', category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setExpandedCategories([category]);
    }
    
    if (view !== newView || category) {
      window.history.pushState({ view: newView, productId: null, category: category || selectedCategory }, '');
      setView(newView);
      setSelectedProductId(null);
    }
  };

  const handleProductOpen = (id: number) => {
    window.history.pushState({ view: 'catalog', productId: id }, '');
    setSelectedProductId(id);
  };

  const handleProductClose = () => {
    if (selectedProductId) {
      window.history.back();
    }
  };

  const handleContactClick = () => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    try {
      if (!selectedProductId) {
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.error("Scroll error:", e);
    }
  }, [view, selectedProductId]);

  return (
    <div className="font-sans selection:bg-crimson/20 selection:text-crimson min-h-screen bg-white">
      <Navbar 
        onLogoClick={() => navigateTo('home')} 
        currentView={view} 
      />
      <main>
        {view === 'home' ? (
          <>
            <Hero onCatalogClick={() => navigateTo('catalog')} />
            <CompanySection 
              onPartnersClick={() => navigateTo('partners')} 
              onHistoryClick={() => navigateTo('history')}
            />
            <Products onCategoryClick={(cat) => navigateTo('catalog', cat)} />
            <Contact />
          </>
        ) : view === 'catalog' ? (
          <ProductCatalog 
            onContactClick={handleContactClick} 
            selectedProductId={selectedProductId}
            onProductOpen={handleProductOpen}
            onProductClose={handleProductClose}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
          />
        ) : view === 'history' ? (
          <HistorySection onBack={() => navigateTo('home')} />
        ) : (
          <PartnersPage onContactClick={handleContactClick} onBack={() => navigateTo('home')} />
        )}
      </main>
      <Footer />
    </div>
  );
}
