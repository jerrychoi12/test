import { useState, useEffect, MouseEvent } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Settings, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
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
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "방진복 및 보호복",
    category: "방진복 및 보호복",
    description: "반도체와 제약 공정을 위한 고기능성 의류부터 국내 최초 6등급 인증을 받은 내화학 보호복까지 제안합니다.",
    image: "https://picsum.photos/seed/protective/600/400"
  },
  {
    id: 2,
    name: "방진화 및 안전화",
    category: "방진화 및 안전화",
    description: "정전기 제어 기술이 적용된 방진 신발과 작업자의 발을 보호하는 KCS 인증 안전화 라인업을 확인하세요.",
    image: "https://picsum.photos/seed/shoes/600/400"
  },
  {
    id: 3,
    name: "장갑 및 마스크",
    category: "장갑 및 마스크",
    description: "정밀 공정용 니트릴 장갑과 호흡기를 보호하는 초정전 복합 필터 마스크 등 필수 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/gloves/600/400"
  },
  {
    id: 4,
    name: "클린룸 관리용품",
    category: "클린룸 관리용품",
    description: "티키 매트와 롤러, 산업용 와이퍼 등 작업 환경의 청정도를 유지하고 이물질 유입을 방지하는 관리 솔루션입니다.",
    image: "https://picsum.photos/seed/cleanroom/600/400"
  },
  {
    id: 5,
    name: "특수 테이프 및 부자재",
    category: "특수 테이프 및 부자재",
    description: "국내 최초 내화학 인증을 받은 켐블록 테이프와 공정 효율을 높이는 다양한 기능성 테이프 및 부자재를 공급합니다.",
    image: "https://picsum.photos/seed/tape/600/400"
  },
  {
    id: 6,
    name: "유한킴벌리 제품군",
    category: "유한킴벌리 대리점",
    description: "킴테크 와이퍼, 글러브 등 유한킴벌리 대리점으로서 고품질의 클린룸 및 산업용 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/kimberly/600/400"
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
    <path d="M474.143 113.954C388.479 71.4881 291.298 107.949 291.298 107.949L228.334 52.2108C228.334 52.2108 439.974 -34.8215 579.864 79.2778C522.699 97.403 519.225 98.979 474.143 113.954Z" fill="#D3404B"/>
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
      if (currentView === 'catalog') {
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView === 'catalog' ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
            <Logo className="h-5 w-auto" />
            <span className={`text-xl md:text-2xl font-black tracking-tighter ${scrolled || currentView === 'catalog' ? 'text-slate-900' : 'text-white'}`}>
              SJ CORPORATION
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className={`flex space-x-6 text-sm font-semibold ${scrolled || currentView === 'catalog' ? 'text-slate-600' : 'text-white/90'} mr-8`}>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-primary transition-colors">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-primary transition-colors">주요품목</a>
            </div>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-all shadow-lg">
              견적 문의
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${scrolled || currentView === 'catalog' ? 'text-slate-700' : 'text-white'}`}>
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
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block text-base font-medium text-slate-700">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block text-base font-medium text-slate-700">주요품목</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="w-full bg-primary text-white block text-center py-3 rounded-lg font-bold">견적 문의하기</a>
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
      <img src="https://i.ibb.co/5W8T9x6q/1.jpg" alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]" />
    </div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
          청정 토탈 솔루션
          <span className="text-primary block">에스제이코퍼레이션</span>
        </h1>
        <p className="text-base md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto opacity-90">
          유한킴벌리 공식 대리점으로서 클린룸 소모품의 표준을 제시합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-hover shadow-xl group">
            빠른 견적 문의 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={onCatalogClick} className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-all">
            제품 카탈로그
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-4">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tighter">고객의 신뢰를 최우선으로 하는 B2B 유통 전문 파트너</h3>
          <p className="text-lg text-slate-600 mb-8 opacity-80">1990년 설립 이후, 삼성전자와 SK하이닉스 등 글로벌 기업들의 신뢰를 바탕으로 성장해 온 전문 기업입니다.</p>
          <div className="space-y-4 mb-10">
            {["ESD: 완벽한 정전기 제어 솔루션", "SAFETY: 작업자 보호구 개발", "CHEMICAL: 독보적인 내화학 기술력", "YUHAN-KIMBERLY: 공식 대리점"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://picsum.photos/seed/office/400/500" alt="Office" className="rounded-3xl shadow-lg mt-8" referrerPolicy="no-referrer" />
          <img src="https://picsum.photos/seed/warehouse/400/500" alt="Warehouse" className="rounded-3xl shadow-lg" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </section>
);

const History = () => {
  const historyData = [
    {
      period: "1990~",
      sub: "클린룸 용품 시장 본격 진출",
      items: [
        { year: "1990", content: "수원 본사 설립" },
        { year: "1995", content: "해피랜드, 뉴발란스, 아가방에 유아용 신발 공급" },
        { year: "2006", content: "클린룸 방진복과 와이퍼 생산" },
        { year: "2011", content: "KCS 클린룸 안전화 개발" },
        { year: "2012", content: "아이마켓코리아 거래 시작" },
      ]
    },
    {
      period: "2015~",
      sub: "핵심 고객사 파트너십 강화",
      items: [
        { year: "2015", content: "SK하이닉스에 제전슬리퍼, 안전화 공급" },
        { year: "2016", content: "서브원 거래 시작" },
        { year: "2020", content: "삼성전자 VD 해외 사업장에 표준화 제전장갑을 공급" },
        { year: "2021", content: "삼성SDI에 제전장갑 및 방진복 공급" },
        { year: "2022", content: "삼성전자 기흥, 화성, 평택 공장에 클린룸의자 공급" },
        { year: "2023", content: "에이치그린파워, 르노코리아 자동차에 친환경 PU코글러브 공급" },
        { year: "2024", content: "삼성전기에 내화학글러브 및 클린룸 소모품 공급, MMPI 거래 시작" },
      ]
    },
    {
      period: "2025~",
      sub: "토탈 솔루션 제공 및 내화학제품 개발",
      items: [
        { year: "2025~", content: "에이텍솔루션에 클린룸 소모품 턴키 공급 계약 체결" },
        { year: "", content: "DB 하이텍에 제전실딩백 공급" },
        { year: "", content: "코미코, 미코에 니트릴글러브 공급" },
        { year: "", content: "내화학테이프 켐블록 자체 개발" },
        { year: "", content: "내화학보호복 쉴드맥스 자체 개발" },
      ]
    }
  ];
  return (
    <section id="history" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {historyData.map((section, idx) => (
          <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="text-primary font-black text-2xl mb-2">{section.period}</div>
            <h4 className="font-bold mb-4">{section.sub}</h4>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm leading-relaxed">
                  <div className="w-14 shrink-0 text-primary font-bold">
                    {item.year ? (item.year.includes('~') ? item.year : `${item.year}.`) : ""}
                  </div>
                  <div className="text-slate-600 flex-1">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Products = ({ onProductClick }: { onProductClick: () => void }) => (
  <section id="products" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tighter">주요 취급 품목</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} onClick={onProductClick} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <div className="h-64 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="p-8 text-left">
              <h4 className="text-xl font-bold mb-3 group-hover:text-primary">{product.name}</h4>
              <p className="text-slate-500 text-sm line-clamp-2">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onProductClick} className="mt-16 px-10 py-4 rounded-lg bg-slate-900 text-white font-bold shadow-xl">
        전체 제품 카탈로그 보기
      </button>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-slate-900 text-white relative">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-primary font-bold text-sm mb-4">Contact Us</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter">지금 바로 전문가와 상담하세요</h3>
        <div className="space-y-6">
          <div className="flex gap-4"><Phone className="text-primary" /> <span>+82-031-548-4255</span></div>
          <div className="flex gap-4"><Mail className="text-primary" /> <span>sjcorp@sj-ct.co.kr</span></div>
          <div className="flex gap-4"><MapPin className="text-primary" /> <span>경기도 수원시 장안구 송원로 59번길 53</span></div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-8 text-slate-900">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input className="w-full px-4 py-3 rounded-xl bg-slate-50" placeholder="회사명" />
          <input className="w-full px-4 py-3 rounded-xl bg-slate-50" placeholder="담당자 성함" />
          <input className="w-full px-4 py-3 rounded-xl bg-slate-50" placeholder="연락처" />
          <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 resize-none" placeholder="문의하실 내용을 상세히 적어주세요." />
          <button className="w-full py-3 rounded-lg bg-primary text-white font-bold shadow-lg">문의 보내기</button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white py-10 border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Logo className="h-5 w-auto" />
          <span className="text-lg font-bold tracking-tighter text-slate-900">SJ CORPORATION</span>
        </div>
        <p className="text-sm text-slate-500">© 2026 SJ CORPORATION. All rights reserved.</p>
      </div>
      <div className="text-xs md:text-sm text-slate-500 space-y-1">
        <p>대표자: 피준희</p>
        <p>+82-031-548-4255 | sjcorp@sj-ct.co.kr</p>
        <p>경기도 수원시 장안구 송원로 59번길 53</p>
      </div>
    </div>
  </footer>
);

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체 제품");

  const categories = [
    "전체 제품", "방진복 및 보호복", "방진화 및 안전화", "장갑 및 마스크",
    "클린룸 관리용품", "특수 테이프 및 부자재", "유한킴벌리 대리점"
  ];

  const catalogProducts = [
    { id: 109, name: "킴테크 프리미엄 와이퍼", category: "유한킴벌리 대리점", description: "유한킴벌리의 독자적인 기술력으로 제작된 고성능 와이퍼입니다.", image: "https://picsum.photos/seed/wiper/600/600" },
    { id: 110, name: "킴테크 니트릴 글러브", category: "유한킴벌리 대리점", description: "탁월한 내화학성과 착용감을 제공하는 유한킴벌리 정품 니트릴 장갑입니다.", image: "https://picsum.photos/seed/glove/600/600" },
    { id: 103, name: "카본 파이버 제전 가운", category: "방진복 및 보호복", description: "도전성 카본 그리드 원단을 사용하여 클래스 100 환경에 적합하도록 설계되었습니다.", image: "https://picsum.photos/seed/coat/600/600" },
    { id: 105, name: "도전성 안전화", category: "방진화 및 안전화", description: "인체공학적 설계와 우수한 정전기 분산 성능을 갖춘 산업용 안전화입니다.", image: "https://picsum.photos/seed/shoes/600/600" },
    { id: 107, name: "클린룸 전용 바인더", category: "클린룸 관리용품", description: "발진을 최소화한 특수 재질의 클린룸 전용 문서 바인더입니다.", image: "https://picsum.photos/seed/binder/600/600" },
    { id: 108, name: "클린룸 무진 종이 (A4)", category: "클린룸 관리용품", description: "미세 먼지 발생이 없는 특수 코팅 처리된 클린룸 전용 용지입니다.", image: "https://picsum.photos/seed/paper/600/600" }
  ];

  const filteredProducts = selectedCategory === "전체 제품" 
    ? catalogProducts 
    : catalogProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-[280px] shrink-0">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">카테고리</h4>
            <div className="flex flex-wrap lg:flex-col gap-3 md:gap-4 lg:space-y-4 mb-8 lg:mb-0">
              {categories.map((cat, i) => (
                <label 
                  key={i} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${selectedCategory === cat ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'border-slate-200 group-hover:border-primary'}`}>
                    {selectedCategory === cat && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${selectedCategory === cat ? 'text-slate-900' : 'text-slate-500 group-hover:text-primary'}`}>{cat}</span>
                </label>
              ))}
            </div>
            
            <div className="hidden lg:block mt-12 bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <h4 className="text-xl font-black mb-4 relative z-10 tracking-tight">대량 구매 문의</h4>
              <p className="text-sm text-white/80 mb-6 relative z-10 leading-relaxed font-medium">
                기업용 대량 구매 및 견적 상담이 필요하신가요? 전문가가 도와드립니다.
              </p>
              <button className="w-full py-3 bg-white text-primary font-black rounded-xl text-sm hover:bg-slate-50 transition-all relative z-10 shadow-lg">
                견적 요청하기
              </button>
            </div>
          </aside>

          <main className="flex-1 w-full">
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight lg:hidden">제품 카탈로그</h2>
              <div className="flex items-center justify-between lg:justify-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="lg:hidden text-primary">Catalog</span>
                <span>총 {filteredProducts.length}개의 제품</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer w-full">
                  <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden mb-5 border border-slate-100 group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">{product.name}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium opacity-90 line-clamp-2 md:line-clamp-3">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-slate-400">해당 카테고리에 등록된 제품이 없습니다.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'catalog'>('home');

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.error("Scroll error:", e);
    }
  }, [view]);

  return (
    <div className="font-sans selection:bg-primary/20 selection:text-primary min-h-screen bg-white">
      <Navbar onLogoClick={() => setView('home')} currentView={view} />
      <main>
        {view === 'home' ? (
          <>
            <Hero onCatalogClick={() => setView('catalog')} />
            <About />
            <History />
            <Products onProductClick={() => setView('catalog')} />
            <Contact />
          </>
        ) : (
          <ProductCatalog />
        )}
      </main>
      <Footer />
    </div>
  );
}
