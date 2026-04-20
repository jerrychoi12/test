import React, { useState, useEffect, MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface NavbarProps {
  onLogoClick: () => void;
  currentView: string;
}

export const Navbar = ({ onLogoClick, currentView }: NavbarProps) => {
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
            <span className={`text-xl lg:text-2xl font-black tracking-tighter ${scrolled || currentView !== 'home' ? 'text-charcoal' : 'text-white'}`}>
              에스제이코퍼레이션
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <div className={`flex space-x-6 text-sm font-semibold ${scrolled || currentView !== 'home' ? 'text-warmgray' : 'text-white/90'} mr-8`}>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-crimson transition-colors cursor-pointer">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-crimson transition-colors cursor-pointer">주요품목</a>
            </div>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-navy text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-steelblue transition-all shadow-lg cursor-pointer">
              견적 문의
            </a>
          </div>

          <div className="lg:hidden">
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
            className="lg:hidden bg-white border-t border-silver/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="block text-base font-medium text-charcoal">회사소개</a>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block text-base font-medium text-charcoal">주요품목</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="w-full bg-navy text-white block text-center py-3 rounded-lg font-bold">견적 문의하기</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
