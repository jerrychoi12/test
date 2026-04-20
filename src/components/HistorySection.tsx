import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

interface HistorySectionProps {
  onBack: () => void;
}

export const HistorySection = ({ onBack }: HistorySectionProps) => {
  const historyData = [
    {
      period: "1990~ | 시장 진입 및 기반 구축",
      sub: "클린룸 용품 시장 본격 진출과\n생산 역량 확보",
      items: [
        { year: "1990", content: "본사 설립 및 운영 개시" },
        { year: "1995", content: "국내 주요 유아용 브랜드 전문 제품 공급" },
        { year: "2006", content: "클린룸 전용 방진복 및 와이퍼 자체 생산 체계 구축" },
        { year: "2011", content: "KCS 인증 클린룸 안전화 개발 완료" },
        { year: "2012", content: "3대 대형 B2B 유통 플랫폼과 협력 관계 구축" },
      ]
    },
    {
      period: "2015~ | 핵심 파트너십 강화 및 산업 확대",
      sub: "글로벌 선도 기업과의 협력 및\n제품 표준화",
      items: [
        { year: "2015", content: "S그룹 반도체 제조사 제전 슬리퍼 및 안전화 전량 공급" },
        { year: "2020", content: "S그룹 가전/디스플레이사 표준 제전 장갑 채택" },
        { year: "2021", content: "S그룹 배터리 제조사에 공정용 제전 장갑 및 방진복 공급" },
        { year: "2022", content: "S그룹 반도체 생산 라인 전 사업장에 클린룸 전용 의자 공급" },
        { year: "2023", content: "H그룹 완성차 제조사에 친환경 PU코팅장갑 공급" },
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
    <div className="pt-24 lg:pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-charcoal tracking-tighter mb-4 uppercase">OUR HISTORY</h2>
          <div className="h-1.5 w-20 bg-crimson mx-auto rounded-full" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {historyData.map((section, idx) => (
            <motion.div 
              key={idx} 
              variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl p-8 border border-silver/50 hover:border-silver transition-all"
            >
              <div className="text-navy font-black text-base mb-2 whitespace-pre-wrap break-keep">{section.period}</div>
              <h4 className="font-bold text-lg text-charcoal mb-4 tracking-tight whitespace-pre-wrap break-keep">{section.sub}</h4>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm leading-relaxed">
                    <div className="w-14 shrink-0 text-navy font-bold">
                      {item.year ? (item.year.includes('~') ? item.year : `${item.year}.`) : ""}
                    </div>
                    <div className="text-warmgray flex-1 font-medium break-keep">
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
