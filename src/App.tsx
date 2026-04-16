import { useState, useEffect, MouseEvent, FormEvent } from 'react';
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
  spec?: string;
  packing?: string;
  feature?: string;
  manufacturer?: string;
  origin?: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "방진복 및 보호복",
    category: "방진복 및 보호복",
    description: "반도체와 제약 공정을 위한 고기능성 의류부터 국내 최초 6등급 인증을 받은 내화학 보호복까지 제안합니다.",
    image: "https://picsum.photos/seed/dark-tech/800/1000"
  },
  {
    id: 2,
    name: "방진화 및 안전화",
    category: "방진화 및 안전화",
    description: "정전기 제어 기술이 적용된 방진 신발과 작업자의 발을 보호하는 KCS 인증 안전화 라인업을 확인하세요.",
    image: "https://picsum.photos/seed/green-abstract/800/1000"
  },
  {
    id: 3,
    name: "장갑 및 마스크",
    category: "장갑 및 마스크",
    description: "정밀 공정용 니트릴 장갑과 호흡기를 보호하는 초정전 복합 필터 마스크 등 필수 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/industrial-orange/800/1000"
  },
  {
    id: 4,
    name: "클린룸 관리용품",
    category: "클린룸 관리용품",
    description: "티키 매트와 롤러, 산업용 와이퍼 등 작업 환경의 청정도를 유지하고 이물질 유입을 방지하는 관리 솔루션입니다.",
    image: "https://picsum.photos/seed/dark-material/800/1000"
  },
  {
    id: 5,
    name: "특수 테이프 및 부자재",
    category: "특수 테이프 및 부자재",
    description: "국내 최초 내화학 인증을 받은 켐블록 테이프와 공정 효율을 높이는 다양한 기능성 테이프 및 부자재를 공급합니다.",
    image: "https://picsum.photos/seed/adhesive-tech/800/1000"
  },
  {
    id: 6,
    name: "유한킴벌리 제품군",
    category: "유한킴벌리 대리점",
    description: "킴테크 와이퍼, 글러브 등 유한킴벌리 대리점으로서 고품질의 클린룸 및 산업용 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/hygiene-lab/800/1000"
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

const Navbar = ({ onLogoClick, currentView, onPartnersClick }: { onLogoClick: () => void, currentView: string, onPartnersClick: () => void }) => {
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
              <button onClick={onPartnersClick} className="hover:text-crimson transition-colors cursor-pointer">파트너</button>
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
              <button onClick={() => { onPartnersClick(); setIsOpen(false); }} className="block text-base font-medium text-charcoal">파트너</button>
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
      <img src="https://raw.githubusercontent.com/jerrychoi12/test/152581ea5b2582dae45fa01c334008c787fa3f77/images/main%20img.webp" alt="Semiconductor Production Process" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
        고객의 신뢰를 최우선으로 하는 <br /> B2B 유통 전문 파트너
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
          <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500" />
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
          <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500" />
        </motion.button>

        {/* Decorative connecting element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-15 pointer-events-none" />
      </div>
    </motion.div>
  </div>
);

const HistoryContent = () => {
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
    <div className="grid md:grid-cols-3 gap-6">
      {historyData.map((section, idx) => (
        <motion.div 
          key={idx} 
          variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-offwhite rounded-2xl p-8 border border-silver/50 hover:border-silver transition-all"
        >
          <div className="text-navy font-black text-base mb-2">{section.period}</div>
          <h4 className="font-bold text-lg text-charcoal mb-4 tracking-tight">{section.sub}</h4>
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
  );
};

const CompanySection = ({ onPartnersClick }: { onPartnersClick: () => void }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'history'>('about');

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'about' ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutContent 
                onHistoryClick={() => setActiveTab('history')} 
                onPartnersClick={onPartnersClick} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <button 
                onClick={() => setActiveTab('about')}
                className="mb-8 flex items-center gap-2 text-warmgray hover:text-crimson transition-all font-bold cursor-pointer group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                뒤로가기
              </button>
              <HistoryContent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Photo Cards */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { 
              title: "본사", 
              location: "경기도 수원시", 
              image: "https://picsum.photos/seed/office1/800/600",
              desc: "전략 기획 및 경영 지원의 핵심 거점"
            },
            { 
              title: "물류센터", 
              location: "경기도 화성시", 
              image: "https://picsum.photos/seed/warehouse/800/600",
              desc: "신속하고 정확한 배송을 위한 통합 물류 허브"
            },
            { 
              title: "청주 사무소", 
              location: "충청북도 청주시", 
              image: "https://picsum.photos/seed/office2/800/600",
              desc: "중부권 고객 대응 및 현장 밀착 지원"
            }
          ].map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-[20px] aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={loc.image} 
                alt={loc.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[9px] font-black text-crimson uppercase tracking-widest mb-1 block">{loc.location}</span>
                <h4 className="text-lg font-black text-white mb-1 tracking-tight">{loc.title}</h4>
                <p className="text-[11px] text-white/70 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {loc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = ({ onProductClick }: { onProductClick: () => void }) => (
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
        {PRODUCTS.map((product, idx) => {
          const styleIdx = idx % 4;
          const heights = [
            "h-[200px] md:h-[500px]", 
            "h-[200px] md:h-[550px]", 
            "h-[200px] md:h-[600px]", 
            "h-[200px] md:h-[520px]"
          ];
          const offsets = ["lg:mt-0", "lg:mt-12", "lg:-mt-8", "lg:mt-6"];
          
          let roundedClass = "";
          if (styleIdx === 0) roundedClass = "lg:rounded-tl-[100px]";
          if (styleIdx === 3) roundedClass = "lg:rounded-br-[100px]";
          
          return (
            <motion.div
              key={product.id}
              onClick={onProductClick}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: styleIdx * 0.1, ease: "easeOut" }}
              className={`relative group cursor-pointer overflow-hidden ${heights[styleIdx]} ${offsets[styleIdx]} ${roundedClass} shadow-2xl transition-all duration-500 hover:z-10 hover:scale-[1.02] mb-4 lg:mb-0`}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 tracking-tight leading-none">
                  {product.name.split(' ')[0]}
                </h4>
                <div className="h-1 w-12 bg-crimson mb-2 md:mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <div className="space-y-1 md:space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 hidden md:block">
                  <p className="text-white font-bold text-sm">{product.name}</p>
                  <p className="text-white/60 text-xs font-medium leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
                {/* Mobile only description indicator or small text if needed */}
                <p className="text-white/80 text-[10px] font-bold md:hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.name}
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
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter text-charcoal">지금 바로 전문가와 상담하세요</h3>
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

const ProductCatalog = ({ onContactClick }: { onContactClick: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체 제품");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    "전체 제품", 
    "1. Garment & Shoes", 
    "2. Chemical Tape", 
    "3. Chemical Cloth", 
    "4. Cleanroom Glove", 
    "5. Mask", 
    "6. Cleaner", 
    "7. Wiper", 
    "8. Chair", 
    "9. Shoe Cover"
  ];

  const catalogProducts: Product[] = [
    { 
      id: 1, 
      name: "방진복 (원피스, 투피스)", 
      category: "1. Garment & Shoes", 
      description: "CLASS 1~1000용 고품질 방진복. 사이즈 및 로고 커스텀 가능.", 
      spec: "주문제작 사양", 
      packing: "-", 
      feature: "CLASS 1~1000용 고품질 방진복, 사이즈/로고 등 커스텀 가능", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://shop-phinf.pstatic.net/20210317_179/1615961305676kOXzw_JPEG/17097194382306483_1191552259.jpg" 
    },
    { 
      id: 2, 
      name: "방진안전화 / 방진화", 
      category: "1. Garment & Shoes", 
      description: "KCS 인증 완료. 스틸토캡 적용 및 PVC 제전 소재 사용.", 
      spec: "255~310mm", 
      packing: "-", 
      feature: "KCS 인증완료, 스틸토캡 장착, PVC 제전 소재 사용", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://picsum.photos/seed/shoes1/600/600" 
    },
    { 
      id: 3, 
      name: "방진덧신", 
      category: "1. Garment & Shoes", 
      description: "표면저항 10E6~10E8. SK하이닉스 단독 공급 제품.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "표면저항 10E6~10E8, SK하이닉스 단독 공급 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://picsum.photos/seed/shoecover1/600/600" 
    },
    { 
      id: 4, 
      name: "켐블록 (CHEMBLOCK)", 
      category: "2. Chemical Tape", 
      description: "내화학 Class 6 인증. PE소재의 강력한 보호 성능.", 
      spec: "48mm x 50M", 
      packing: "10ROL / 1BOX", 
      feature: "내화학 Class 6, PE소재 사용, 강력 보호 성능", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://picsum.photos/seed/tape1/600/600" 
    },
    { 
      id: 5, 
      name: "쉴드맥스 (SHIELD MAX)", 
      category: "3. Chemical Cloth", 
      description: "KOSHA 인증 3형식(액체) 및 5,6형식(분진) 보호복.", 
      spec: "L, XL, 2XL", 
      packing: "-", 
      feature: "KOSHA 인증완료, 3형식(액체) 및 5,6형식(분진)", 
      manufacturer: "Hubei Xinxin", 
      origin: "중국", 
      image: "https://picsum.photos/seed/shield/600/600" 
    },
    { 
      id: 6, 
      name: "니트릴 / 라텍스 장갑", 
      category: "4. Cleanroom Glove", 
      description: "CLASS 1000 대응. ESD 처리 및 세정 처리된 고품질 장갑.", 
      spec: "12인치", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "CLASS 1000, ESD 처리, 세정처리된 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "말레이시아", 
      image: "https://picsum.photos/seed/glove1/600/600" 
    },
    { 
      id: 7, 
      name: "PVC 장갑", 
      category: "4. Cleanroom Glove", 
      description: "반도체 공정 단독 공급. 저이온 용출 처리.", 
      spec: "12인치", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "반도체 공정 단독 공급, 저이온 용출 처리", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대만", 
      image: "https://picsum.photos/seed/glove2/600/600" 
    },
    { 
      id: 8, 
      name: "G3 LDT 내화학장갑", 
      category: "4. Cleanroom Glove", 
      description: "KOSHA 내화학 인증. 탁월한 유연성과 보호력.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "KOSHA 내화학 인증, 탁월 유연성 및 보호", 
      manufacturer: "유한킴벌리", 
      origin: "말레이시아", 
      image: "https://picsum.photos/seed/glove3/600/600" 
    },
    { 
      id: 9, 
      name: "DMF FREE PU장갑", 
      category: "4. Cleanroom Glove", 
      description: "수성 DMF 미검출. 친환경적이고 안전한 작업 장갑.", 
      spec: "S, M, L", 
      packing: "10PR/1PAC, 50PAC/1BOX", 
      feature: "수성 DMF(117mg), 친환경적 안전한 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/glove4/600/600" 
    },
    { 
      id: 10, 
      name: "스테인리스 절단방지장갑", 
      category: "4. Cleanroom Glove", 
      description: "CUT LEVEL 5. 손등 보호 기능이 포함된 고강도 장갑.", 
      spec: "S, M, L", 
      packing: "50PR/1PAC, 10PAC/1BOX", 
      feature: "CUT LEVEL 5, 손등 보호, 고강도 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/glove5/600/600" 
    },
    { 
      id: 11, 
      name: "무진마스크 (1단, 활성탄)", 
      category: "5. Mask", 
      description: "일체형 코지지대 적용. 김 서림 방지 및 뛰어난 밀착력.", 
      spec: "주문 사양", 
      packing: "10PCS/1PAC, 120PCS/1CTN", 
      feature: "일체형 코지지대, 김 서림 방지 및 밀착", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://picsum.photos/seed/mask1/600/600" 
    },
    { 
      id: 12, 
      name: "일회용 덴탈형 마스크", 
      category: "5. Mask", 
      description: "3중 필터 구조. 가성비가 뛰어난 범용 마스크.", 
      spec: "180 x 90mm", 
      packing: "-", 
      feature: "3중 필터, 가성비 뛰어난 범용 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/mask2/600/600" 
    },
    { 
      id: 13, 
      name: "클린매트 (스티키매트)", 
      category: "6. Cleaner", 
      description: "45마이크론 두께. 뛰어난 점착력으로 이물질 유입 차단.", 
      spec: "600 x 900mm", 
      packing: "30SHT/1PAC, 10PAC/1BOX", 
      feature: "45마이크론 두께, 점착력/이물질 차단 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "한국/중국", 
      image: "https://picsum.photos/seed/mat1/600/600" 
    },
    { 
      id: 14, 
      name: "DCR패드", 
      category: "6. Cleaner", 
      description: "CPE 타입의 점착 패드. 효과적인 이물질 제거.", 
      spec: "240 x 330mm", 
      packing: "-", 
      feature: "CPE 타입 점착패드 효과적 이물질 제거", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "한국/중국", 
      image: "https://picsum.photos/seed/pad1/600/600" 
    },
    { 
      id: 15, 
      name: "클린룸 와이퍼", 
      category: "7. Wiper", 
      description: "CLASS 100 이상 대응. 흡수력과 내화학성이 뛰어난 와이퍼.", 
      spec: "9 x 9 inch", 
      packing: "100SHT/1PAC, 10PAC/1BOX", 
      feature: "CLASS 100 이상, 흡수/내화학/내구성", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/wiper1/600/600" 
    },
    { 
      id: 16, 
      name: "폴리에스터 와이퍼", 
      category: "7. Wiper", 
      description: "폴리에스터 니트 원단 사용. 보풀 발생이 적고 세정력이 우수함.", 
      spec: "대: 300x375mm / 소: 150x187mm", 
      packing: "대: 50SHT/1PAC, 10PAC/1BOX / 소: 200SHT/1PAC, 10PAC/1BOX", 
      feature: "폴리에스터 니트원단", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/wiper2/600/600" 
    },
    { 
      id: 17, 
      name: "클린룸 의자 (좌식)", 
      category: "8. Chair", 
      description: "표면저항 10^7 미만. 인체공학적 설계의 제전 의자.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "표면저항 10^7 미만, 인체공학, 세정처리 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "대한민국", 
      image: "https://picsum.photos/seed/chair1/600/600" 
    },
    { 
      id: 18, 
      name: "클린룸 의자 (입식형)", 
      category: "8. Chair", 
      description: "정전기 보호 커버 적용. SK하이닉스 공급용 고사양 의자.", 
      spec: "주문 사양", 
      packing: "-", 
      feature: "정전기 보호커버 장착, SK하이닉스 공급 제품", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/chair2/600/600" 
    },
    { 
      id: 19, 
      name: "자동덧신 (일회용)", 
      category: "9. Shoe Cover", 
      description: "CPE 타입. 미끄럼 방지 기능이 포함된 자동 덧신.", 
      spec: "주문 사양", 
      packing: "110PCS/1PAC, 50PAC/1BOX", 
      feature: "CPE 타입, 미끄럼방지 기능 포함", 
      manufacturer: "에스제이글로벌코퍼레이션", 
      origin: "중국", 
      image: "https://picsum.photos/seed/shoecover2/600/600" 
    }
  ];

  const filteredProducts = selectedCategory === "전체 제품" 
    ? catalogProducts 
    : catalogProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-[280px] shrink-0">
            <h4 className="text-[10px] font-black text-warmgray uppercase tracking-[0.2em] mb-6">카테고리</h4>
            <div className="flex flex-wrap lg:flex-col gap-3 md:gap-4 lg:space-y-4 mb-8 lg:mb-0">
              {categories.map((cat, i) => (
                <label 
                  key={i} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${selectedCategory === cat ? 'bg-crimson border-crimson shadow-lg shadow-crimson/20' : 'border-silver group-hover:border-crimson'}`}>
                    {selectedCategory === cat && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${selectedCategory === cat ? 'text-charcoal' : 'text-warmgray group-hover:text-crimson'}`}>{cat}</span>
                </label>
              ))}
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

          <main className="flex-1 w-full">
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-charcoal mb-4 tracking-tighter leading-tight lg:hidden">제품 카탈로그</h2>
              <div className="flex items-center justify-between lg:justify-end text-[10px] font-black text-warmgray uppercase tracking-widest">
                <span className="lg:hidden text-crimson">Catalog</span>
                <span>총 {filteredProducts.length}개의 제품</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer w-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-square bg-white rounded-3xl overflow-hidden mb-5 border border-silver/50 group-hover:shadow-xl group-hover:border-silver transition-all duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <h4 className="text-lg font-bold text-charcoal group-hover:text-crimson transition-colors tracking-tight">{product.name}</h4>
                    <p className="text-sm text-warmgray leading-relaxed font-medium opacity-90 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-warmgray">해당 카테고리에 등록된 제품이 없습니다.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-offwhite transition-colors cursor-pointer"
              >
                <X className="h-6 w-6 text-warmgray" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-offwhite border border-silver/50">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-black text-crimson uppercase tracking-widest">{selectedProduct.category}</span>
                    <h3 className="text-2xl font-black text-charcoal mt-1 tracking-tight">{selectedProduct.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-offwhite rounded-2xl space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-warmgray font-bold">상세규격</span>
                        <span className="text-charcoal font-bold">{selectedProduct.spec || '-'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-warmgray font-bold">포장단위</span>
                        <span className="text-charcoal font-bold">{selectedProduct.packing || '-'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-warmgray font-bold">제조사</span>
                        <span className="text-charcoal font-bold">{selectedProduct.manufacturer || '-'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-warmgray font-bold">원산지</span>
                        <span className="text-charcoal font-bold">{selectedProduct.origin || '-'}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-black text-charcoal mb-2">특이사항</h5>
                      <p className="text-sm text-warmgray leading-relaxed font-medium">
                        {selectedProduct.feature || selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      onContactClick();
                    }}
                    className="w-full py-4 bg-crimson text-white font-black rounded-xl hover:bg-deepred hover:shadow-xl hover:shadow-crimson/20 transition-all cursor-pointer"
                  >
                    제품 문의하기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PartnersPage = ({ onContactClick }: { onContactClick: () => void }) => {
  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-charcoal tracking-tighter mb-6">OUR PARTNERS</h2>
          <p className="text-lg text-warmgray max-w-2xl mx-auto font-medium">
            에스제이코퍼레이션은 국내외 유수의 기업들과 함께하며 최상의 솔루션을 제공하고 있습니다.
          </p>
          <div className="h-1.5 w-20 bg-crimson mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center mb-24">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="p-8 bg-offwhite rounded-3xl border border-silver/30 hover:shadow-xl hover:border-silver transition-all duration-300 w-full flex items-center justify-center aspect-video">
              <img 
                src="https://github.com/jerrychoi12/img/blob/main/logo%200411.webp?raw=true" 
                alt={`Partner ${i + 1}`} 
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
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
  const [view, setView] = useState<'home' | 'catalog' | 'partners'>('home');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: 'home' | 'catalog' | 'partners') => {
    if (view !== newView) {
      window.history.pushState({ view: newView }, '');
      setView(newView);
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
      window.scrollTo(0, 0);
    } catch (e) {
      console.error("Scroll error:", e);
    }
  }, [view]);

  return (
    <div className="font-sans selection:bg-crimson/20 selection:text-crimson min-h-screen bg-white">
      <Navbar 
        onLogoClick={() => navigateTo('home')} 
        currentView={view} 
        onPartnersClick={() => navigateTo('partners')}
      />
      <main>
        {view === 'home' ? (
          <>
            <Hero onCatalogClick={() => navigateTo('catalog')} />
            <CompanySection onPartnersClick={() => navigateTo('partners')} />
            <Products onProductClick={() => navigateTo('catalog')} />
            <Contact />
          </>
        ) : view === 'catalog' ? (
          <ProductCatalog onContactClick={handleContactClick} />
        ) : (
          <PartnersPage onContactClick={handleContactClick} />
        )}
      </main>
      <Footer />
    </div>
  );
}
