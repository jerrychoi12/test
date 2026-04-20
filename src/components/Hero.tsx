import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCatalogClick: () => void;
}

export const Hero = ({ onCatalogClick }: HeroProps) => (
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
        <h1 className="text-4xl lg:text-[65px] font-black text-white mb-6 tracking-tighter">
          청정 토탈 솔루션
          <span className="text-crimson block mt-[15px]">에스제이코퍼레이션</span>
        </h1>
        <p className="text-base lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto opacity-90">
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
