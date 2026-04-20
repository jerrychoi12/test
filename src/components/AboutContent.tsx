import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface AboutContentProps {
  onHistoryClick: () => void;
  onPartnersClick: () => void;
}

export const AboutContent = ({ onHistoryClick, onPartnersClick }: AboutContentProps) => (
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
        className="text-3xl lg:text-4xl font-extrabold text-charcoal mb-6 tracking-tighter"
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
          className="absolute top-0 left-0 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-crimson text-white flex flex-col items-center justify-center shadow-2xl z-10 cursor-pointer group transition-all"
        >
          <span className="text-2xl lg:text-3xl font-black mb-1">연혁</span>
          <span className="text-xs lg:text-sm opacity-80 font-medium">HISTORY</span>
        </motion.button>

        {/* Partners Button Circle */}
        <motion.button
          whileHover={{ scale: 1.05, zIndex: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPartnersClick}
          className="absolute bottom-0 right-0 w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-navy text-white flex flex-col items-center justify-center shadow-2xl z-20 cursor-pointer group transition-all"
        >
          <span className="text-2xl lg:text-3xl font-black mb-1">파트너</span>
          <span className="text-xs lg:text-sm opacity-80 font-medium">PARTNERS</span>
        </motion.button>
      </div>
    </motion.div>
  </div>
);
