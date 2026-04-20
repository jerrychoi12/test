import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
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
          <h3 className="text-3xl lg:text-4xl font-extrabold mb-8 tracking-tighter text-charcoal">지금 전문가와 상담하세요</h3>
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
                className="w-full py-4 rounded-lg bg-white text-crimson font-bold shadow-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
