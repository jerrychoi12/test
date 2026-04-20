import React from 'react';
import { motion } from 'framer-motion';
import { AboutContent } from './AboutContent';

interface CompanySectionProps {
  onPartnersClick: () => void;
  onHistoryClick: () => void;
}

export const CompanySection = ({ onPartnersClick, onHistoryClick }: CompanySectionProps) => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="order-2 lg:order-1">
          <AboutContent 
            onHistoryClick={onHistoryClick} 
            onPartnersClick={onPartnersClick} 
          />
        </div>

        {/* Location Photo Cards */}
        <div className="order-1 lg:order-2 mb-12 lg:mb-0 lg:mt-12 max-w-3xl mx-auto grid grid-cols-3 gap-3 lg:gap-5 w-full">
          {[
            { 
              title: "본사", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/house.webp"
            },
            { 
              title: "물류센터", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/warehouse.webp"
            },
            { 
              title: "청주 사무소", 
              image: "https://raw.githubusercontent.com/jerrychoi12/img/main/cheongju.webp"
            }
          ].map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl lg:rounded-[20px] aspect-[4/3] shadow-md hover:shadow-lg transition-all duration-500"
            >
              <img 
                src={loc.image} 
                alt={loc.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-3 lg:p-5 w-full transform translate-y-1 lg:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-xs lg:text-lg font-black text-white tracking-tight">{loc.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
