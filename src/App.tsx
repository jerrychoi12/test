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
    image: "https://picsum.photos/seed/protective/400/400"
  },
  {
    id: 2,
    name: "방진화 및 안전화",
    category: "방진화 및 안전화",
    description: "정전기 제어 기술이 적용된 방진 신발과 작업자의 발을 보호하는 KCS 인증 안전화 라인업을 확인하세요.",
    image: "https://picsum.photos/seed/shoes/400/400"
  },
  {
    id: 3,
    name: "장갑 및 마스크",
    category: "장갑 및 마스크",
    description: "정밀 공정용 니트릴 장갑과 호흡기를 보호하는 초정전 복합 필터 마스크 등 필수 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/gloves/400/400"
  },
  {
    id: 4,
    name: "클린룸 관리용품",
    category: "클린룸 관리용품",
    description: "티키 매트와 롤러, 산업용 와이퍼 등 작업 환경의 청정도를 유지하고 이물질 유입을 방지하는 관리 솔루션입니다.",
    image: "https://picsum.photos/seed/cleanroom/400/400"
  },
  {
    id: 5,
    name: "특수 테이프 및 부자재",
    category: "특수 테이프 및 부자재",
    description: "국내 최초 내화학 인증을 받은 켐블록 테이프와 공정 효율을 높이는 다양한 기능성 테이프 및 부자재를 공급합니다.",
    image: "https://picsum.photos/seed/tape/400/400"
  },
  {
    id: 6,
    name: "유한킴벌리 제품군",
    category: "유한킴벌리 대리점",
    description: "킴테크 와이퍼, 글러브 등 유한킴벌리 대리점으로서 고품질의 클린룸 및 산업용 소모품을 공급합니다.",
    image: "https://picsum.photos/seed/kimberly/400/400"
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
            <span className={`text-xl md:text-2xl font-black tracking-tighter ${scrolled || currentView === 'catalog' ? 'text-charcoal' : 'text-white'}`}>
              SJ 코퍼레이션
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className={`flex space-x-6 text-sm font-semibold ${scrolled || currentView === 'catalog' ? 'text-warmgray' : 'text-white/90'} mr-8`}>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-accent transition-colors">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-accent transition-colors">주요품목</a>
            </div>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-all shadow-lg">
              견적 문의
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${scrolled || currentView === 'catalog' ? 'text-charcoal' : 'text-white'}`}>
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
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block text-base font-medium text-charcoal">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block text-base font-medium text-charcoal">주요품목</a>
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
      <img src="https://raw.githubusercontent.com/jerrychoi12/test/152581ea5b2582dae45fa01c334008c787fa3f77/images/main%20img.webp" alt="Semiconductor Production Process" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-primary/20" />
    </div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
          청정 토탈 솔루션
          <span className="text-accent block mt-[15px]">SJ 코퍼레이션</span>
        </h1>
        <p className="text-base md:text-xl text-white/80 mb-10 max-w-2xl mx-auto opacity-90">
          유한킴벌리 공식 대리점으로서 클린룸 소모품의 표준을 제시합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-accent text-white font-bold text-lg hover:bg-accent-hover shadow-xl group">
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
          <h2 className="text-accent font-bold tracking-wider uppercase text-sm mb-4">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 tracking-tighter">고객의 신뢰를 최우선으로 하는 B2B 유통 전문 파트너</h3>
          <p className="text-lg text-warmgray mb-8 opacity-80">1990년 설립 이후, 삼성전자와 SK하이닉스 등 글로벌 기업들의 신뢰를 바탕으로 성장해 온 전문 기업입니다.</p>
          <div className="space-y-4 mb-10">
            {["ESD: 완벽한 정전기 제어 솔루션", "SAFETY: 작업자 보호구 개발", "CHEMICAL: 독보적인 내화학 기술력", "YUHAN-KIMBERLY: 공식 대리점"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-charcoal font-medium">{item}</span>
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
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 mb-16">
        {historyData.map((section, idx) => (
          <div key={idx} className="bg-offwhite rounded-2xl p-6 border border-silver">
            <div className="text-primary font-black text-base mb-2">{section.period}</div>
            <h4 className="font-bold text-base mb-4">{section.sub}</h4>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex gap-2 text-base leading-relaxed">
                  <div className="w-14 shrink-0 text-primary font-bold">
                    {item.year ? (item.year.includes('~') ? item.year : `${item.year}.`) : ""}
                  </div>
                  <div className="text-warmgray flex-1">
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Logos Marquee */}
      <div className="relative overflow-hidden py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h4 className="text-[16px] font-black text-warmgray uppercase tracking-[0.2em] text-center">Our Partners</h4>
        </div>
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap items-center"
            animate={{ x: [0, -2000] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <img 
              src="https://raw.githubusercontent.com/jerrychoi12/img/refs/heads/main/logo%20width%20100.webp" 
              alt="Partner Logos" 
              className="h-10 md:h-12 w-auto max-w-none px-6"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://raw.githubusercontent.com/jerrychoi12/img/refs/heads/main/logo%20width%20100.webp" 
              alt="Partner Logos" 
              className="h-10 md:h-12 w-auto max-w-none px-6"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://raw.githubusercontent.com/jerrychoi12/img/refs/heads/main/logo%20width%20100.webp" 
              alt="Partner Logos" 
              className="h-10 md:h-12 w-auto max-w-none px-6"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Products = ({ onProductClick }: { onProductClick: () => void }) => (
  <section id="products" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 tracking-tighter">주요 취급 품목</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} onClick={onProductClick} className="group bg-white rounded-2xl overflow-hidden border border-silver shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 text-left">
              <h4 className="text-lg font-bold mb-2 group-hover:text-accent line-clamp-1">{product.name}</h4>
              <p className="text-warmgray text-xs line-clamp-2 leading-relaxed">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onProductClick} className="mt-16 px-10 py-4 rounded-lg bg-primary text-white font-bold shadow-xl hover:bg-primary-hover transition-colors">
        전체 제품 카탈로그 보기
      </button>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-primary text-white relative">
    <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-primary font-bold text-sm mb-4">Contact Us</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter">지금 바로 전문가와 상담하세요</h3>
        <div className="space-y-6">
          <div className="flex gap-4"><Phone className="text-accent" /> <span>+82-031-548-4255</span></div>
          <div className="flex gap-4"><Mail className="text-accent" /> <span>sjcorp@sj-ct.co.kr</span></div>
          <div className="flex gap-4"><MapPin className="text-accent" /> <span>경기도 수원시 장안구 송원로 59번길 53</span></div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-8 text-charcoal">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input className="w-full px-4 py-3 rounded-xl bg-offwhite" placeholder="회사명" />
          <input className="w-full px-4 py-3 rounded-xl bg-offwhite" placeholder="담당자 성함" />
          <input className="w-full px-4 py-3 rounded-xl bg-offwhite" placeholder="연락처" />
          <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-offwhite resize-none" placeholder="문의하실 내용을 상세히 적어주세요." />
          <button className="w-full py-3 rounded-lg bg-accent text-white font-bold shadow-lg hover:bg-accent-hover transition-colors">문의 보내기</button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-primary py-10 border-t border-silver/10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-6">
      <div>
        <p className="text-sm text-white/60">© 2026 SJ 코퍼레이션. All rights reserved.</p>
      </div>
      <div className="text-xs md:text-sm text-white/60 space-y-1">
        <p>대표자: 피준희</p>
        <p>+82-031-548-4255 | sjcorp@sj-ct.co.kr</p>
        <p>경기도 수원시 장안구 송원로 59번길 53</p>
      </div>
    </div>
  </footer>
);

const ProductCatalog = () => {
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
                  <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${selectedCategory === cat ? 'bg-accent border-accent shadow-lg shadow-accent/20' : 'border-silver group-hover:border-accent'}`}>
                    {selectedCategory === cat && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${selectedCategory === cat ? 'text-charcoal' : 'text-warmgray group-hover:text-accent'}`}>{cat}</span>
                </label>
              ))}
            </div>
            
            <div className="hidden lg:block mt-12 bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <h4 className="text-xl font-black mb-4 relative z-10 tracking-tight">대량 구매 문의</h4>
              <p className="text-sm text-white/80 mb-6 relative z-10 leading-relaxed font-medium">
                기업용 대량 구매 및 견적 상담이 필요하신가요? 전문가가 도와드립니다.
              </p>
              <button className="w-full py-3 bg-white text-primary font-black rounded-xl text-sm hover:bg-offwhite transition-all relative z-10 shadow-lg">
                견적 요청하기
              </button>
            </div>
          </aside>

          <main className="flex-1 w-full">
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-charcoal mb-4 tracking-tighter leading-tight lg:hidden">제품 카탈로그</h2>
              <div className="flex items-center justify-between lg:justify-end text-[10px] font-black text-warmgray uppercase tracking-widest">
                <span className="lg:hidden text-accent">Catalog</span>
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
                  <div className="relative aspect-square bg-offwhite rounded-3xl overflow-hidden mb-5 border border-silver group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <h4 className="text-lg font-bold text-charcoal group-hover:text-accent transition-colors tracking-tight">{product.name}</h4>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm"
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
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-offwhite transition-colors"
              >
                <X className="h-6 w-6 text-warmgray" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square rounded-2xl overflow-hidden bg-offwhite border border-silver">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-black text-accent uppercase tracking-widest">{selectedProduct.category}</span>
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

                  <button className="w-full py-4 bg-accent text-white font-black rounded-xl hover:shadow-xl hover:shadow-accent/20 transition-all">
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
    <div className="font-sans selection:bg-accent/20 selection:text-accent min-h-screen bg-white">
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
