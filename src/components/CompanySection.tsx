import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, MapPin, ShieldCheck, Handshake, Newspaper, ArrowRight, Check } from 'lucide-react';

interface CompanySectionProps {
  onPartnersClick: () => void;
  onHistoryClick: () => void;
  onActivitiesClick: () => void;
}

export const CompanySection = ({ onPartnersClick, onHistoryClick, onActivitiesClick }: CompanySectionProps) => {
  return (
    <section id="about" className="py-24 bg-[#F6F7F8] overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Split left text & right custom South Korea Branch Maps Widget */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Company introduction and values */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] md:text-xs font-black tracking-wider text-crimson uppercase block">
                ABOUT SJ CORPORATION
              </span>
              <h2 className="text-3xl md:text-[38px] leading-[1.2] font-extrabold text-[#111] tracking-tight whitespace-pre-line">
                신뢰를 최우선으로 하는 {"\n"}B2B 유통 전문 파트너
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed tracking-tight whitespace-pre-line pt-2">
                1990년 설립 이후, 삼성전자와 SK하이닉스 등 {"\n"}글로벌 기업들의 신뢰를 바탕으로 성장해 온 전문 기업입니다.
              </p>
            </div>

            {/* Premium bullet list with custom solid crimson checkmarks */}
            <div className="space-y-3.5">
              {[
                "ESD: 완벽한 정전기 제어 솔루션",
                "SAFETY: 작업자 보호구 개발",
                "CHEMICAL: 독보적인 내화학 기술력"
              ].map((value, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-crimson flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </div>
                  <span className="text-sm font-bold text-[#222] tracking-tight">{value}</span>
                </div>
              ))}
            </div>

            {/* Infographic horizontal stats strip */}
            <div className="bg-white border border-[#EBEAE5] rounded-[24px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.03)] p-4 md:p-5 grid grid-cols-4 gap-2 divide-x divide-gray-100">
              {[
                { 
                  icon: <Calendar className="w-4.5 h-4.5 text-navy/70" />, 
                  primary: "1990", 
                  secondary: "설립" 
                },
                { 
                  icon: <Globe className="w-4.5 h-4.5 text-navy/70" />, 
                  primary: "글로벌", 
                  secondary: "기업 신뢰" 
                },
                { 
                  icon: <MapPin className="w-4.5 h-4.5 text-navy/70" />, 
                  primary: "3개", 
                  secondary: "거점 운영" 
                },
                { 
                  icon: <ShieldCheck className="w-4.5 h-4.5 text-navy/70" />, 
                  primary: "전문", 
                  secondary: "솔루션 제공" 
                }
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? "pl-2" : ""}`}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 mb-1.5">
                    {item.icon}
                  </div>
                  <span className="text-[12px] md:text-sm font-black text-charcoal tracking-tight leading-tight">
                    {item.primary}
                  </span>
                  <span className="text-[10px] text-warmgray tracking-tight mt-0.5 font-medium">
                    {item.secondary}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Map Image Section aligning with the left content */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[300px] md:h-[460px] overflow-hidden flex items-center justify-center"
            >
              <img
                src="https://raw.githubusercontent.com/jerrychoi12/img/main/map.png.png"
                alt="SJ Corporation Map"
                className="max-w-full max-h-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

        </div>

        {/* Bottom Section: Three custom visual summary layout cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          {/* Card 1: HISTORY (Crimson Theme) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={onHistoryClick}
            className="group relative bg-white border border-[#F0EFEA] rounded-[24px] p-7 md:p-8 flex justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-[0_12px_45px_rgba(216,58,69,0.12)] hover:bg-crimson hover:border-crimson overflow-hidden"
          >
            <div className="flex-1 space-y-3.5 z-10">
              <span className="text-[10px] md:text-xs font-bold text-crimson group-hover:text-white/80 uppercase tracking-widest block transition-colors duration-300">
                HISTORY
              </span>
              <h3 className="text-xl md:text-2xl font-black text-charcoal group-hover:text-white tracking-tight transition-colors duration-300">연혁</h3>
              <p className="text-warmgray group-hover:text-white/90 text-xs md:text-sm font-medium leading-relaxed max-w-[180px] transition-colors duration-300">
                1990년부터 이어온 성장과 성과
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#1A3557] group-hover:text-white font-extrabold text-xs tracking-tight transition-all duration-300 group-hover:gap-2 pt-2">
                <span>자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
            </div>
            
            {/* Visual Graphic: Mini clock and winding timeline line SVG */}
            <div className="z-0 absolute right-4 bottom-4 md:right-6 md:bottom-6 text-[#9E2530]/10 opacity-30 group-hover:opacity-100 group-hover:text-white/15 transition-all duration-300 scale-100 group-hover:scale-110">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Clock */}
                <circle cx="64" cy="38" r="15" />
                <polyline points="64,28 64,38 72,38" />
                {/* Winding line with dots */}
                <path d="M16,74 C34,74 38,58 54,58 C68,58 74,48 74,38" strokeDasharray="3 3" />
                <path d="M16,74 C34,74 38,58 54,58 C68,58 74,48 74,38" />
                <circle cx="16" cy="74" r="3" fill="currentColor" />
                <circle cx="35" cy="66" r="3" fill="currentColor" />
                <circle cx="54" cy="58" r="3" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* Card 2: PARTNERS (Navy Theme) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={onPartnersClick}
            className="group relative bg-white border border-[#F0EFEA] rounded-[24px] p-7 md:p-8 flex justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-[0_12px_45px_rgba(216,58,69,0.12)] hover:bg-crimson hover:border-crimson overflow-hidden"
          >
            <div className="flex-1 space-y-3.5 z-10">
              <span className="text-[10px] md:text-xs font-bold text-crimson group-hover:text-white/80 uppercase tracking-widest block transition-colors duration-300">
                PARTNERS
              </span>
              <h3 className="text-xl md:text-2xl font-black text-charcoal group-hover:text-white tracking-tight transition-colors duration-300">파트너</h3>
              <p className="text-warmgray group-hover:text-white/90 text-xs md:text-sm font-medium leading-relaxed max-w-[180px] transition-colors duration-300">
                국내외 주요 파트너 기업과의<br />견고한 네트워크
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#1A3557] group-hover:text-white font-extrabold text-xs tracking-tight transition-all duration-300 group-hover:gap-2 pt-2">
                <span>자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
            </div>
            
            {/* Visual Graphic: Delicate linear handshake backdrop */}
            <div className="z-0 absolute right-4 bottom-4 md:right-6 md:bottom-6 text-neutral-100 opacity-20 group-hover:opacity-100 group-hover:text-white/15 transition-all duration-300 scale-100 group-hover:scale-110">
              <Handshake className="w-24 h-24 stroke-[1]" />
            </div>
          </motion.div>

          {/* Card 3: NEWS ROOM (Emerald Theme) */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={onActivitiesClick}
            className="group relative bg-white border border-[#F0EFEA] rounded-[24px] p-7 md:p-8 flex justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-[0_12px_45px_rgba(216,58,69,0.12)] hover:bg-crimson hover:border-crimson overflow-hidden"
          >
            <div className="flex-1 space-y-3.5 z-10">
              <span className="text-[10px] md:text-xs font-bold text-crimson group-hover:text-white/80 uppercase tracking-widest block transition-colors duration-300">
                NEWS ROOM
              </span>
              <h3 className="text-xl md:text-2xl font-black text-charcoal group-hover:text-white tracking-tight transition-colors duration-300">뉴스룸</h3>
              <p className="text-warmgray group-hover:text-white/90 text-xs md:text-sm font-medium leading-relaxed max-w-[180px] transition-colors duration-300">
                전시회, 언론, 기술 개발 소식
              </p>
              <div className="inline-flex items-center gap-1.5 text-[#1A3557] group-hover:text-white font-extrabold text-xs tracking-tight transition-all duration-300 group-hover:gap-2 pt-2">
                <span>자세히 보기</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
            </div>
            
            {/* Visual Graphic: Delicate linear newspaper backdrop */}
            <div className="z-0 absolute right-4 bottom-4 md:right-6 md:bottom-6 text-neutral-100 opacity-20 group-hover:opacity-100 group-hover:text-white/15 transition-all duration-300 scale-100 group-hover:scale-110">
              <Newspaper className="w-24 h-24 stroke-[1]" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
