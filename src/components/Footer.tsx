import React from 'react';

export const Footer = () => (
  <footer className="bg-white/50 backdrop-blur-sm py-10">
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-start gap-6">
      <div>
        <p className="text-sm text-charcoal">© 2026 에스제이코퍼레이션. All rights reserved.</p>
      </div>
      <div className="text-xs lg:text-sm text-warmgray space-y-1">
        <p>대표자: 이철수</p>
        <p>+82-031-548-4255 | sjcorp@sj-ct.co.kr</p>
        <p>경기도 수원시 장안구 송원로 59번길 53</p>
      </div>
    </div>
  </footer>
);
