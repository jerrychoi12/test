import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface PartnersPageProps {
  onContactClick: () => void;
  onBack: () => void;
}

export const PartnersPage = ({ onContactClick, onBack }: PartnersPageProps) => {
  const logos = [
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo1.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo2.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo3.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo4.webp",
    "https://raw.githubusercontent.com/jerrychoi12/img/main/logo5.webp"
  ];

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-black text-charcoal tracking-tighter mb-6">OUR PARTNERS</h2>
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

        <div className="bg-navy rounded-[40px] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          <h3 className="text-3xl lg:text-4xl font-black mb-6 relative z-10 tracking-tight">새로운 파트너십을 기다립니다</h3>
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
