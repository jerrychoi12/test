import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_SUMMARIES } from '../constants';

interface ProductsProps {
  onCategoryClick: (cat: string) => void;
}

export const Products = ({ onCategoryClick }: ProductsProps) => (
  <section id="products" className="py-32 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-24">
        <h2 className="text-3xl lg:text-5xl font-black text-charcoal tracking-tighter">OUR PRODUCT</h2>
        <div className="h-1.5 w-20 bg-crimson mx-auto mt-6 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-4 items-start">
        {CATEGORY_SUMMARIES.map((product, idx) => {
          const styleIdx = idx % 6;
          const heights = [
            "h-[200px] lg:h-[350px]", 
            "h-[200px] lg:h-[400px]", 
            "h-[200px] lg:h-[380px]", 
            "h-[200px] lg:h-[420px]",
            "h-[200px] lg:h-[360px]",
            "h-[200px] lg:h-[390px]"
          ];
          const offsets = ["lg:mt-0", "lg:mt-8", "lg:-mt-4", "lg:mt-12", "lg:mt-2", "lg:-mt-6"];
          
          return (
              <motion.div
                key={product.id}
                onClick={() => onCategoryClick(product.category)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: styleIdx * 0.05, ease: "easeOut" }}
                className={`relative group cursor-pointer overflow-hidden ${heights[styleIdx]} ${offsets[styleIdx]} shadow-xl transition-all duration-500 hover:z-10 hover:scale-[1.02] mb-4 lg:mb-0`}
              >
                <img 
                  src={product.img1} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-x-0 top-[45%] lg:top-[60%] flex flex-col p-6 lg:p-10 transform translate-y-2 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-[18px] font-black text-white mb-1.5 lg:mb-2 tracking-tight leading-none group-hover:text-white transition-colors">
                  {product.name}
                </h4>
                <p className="text-[11px] md:text-[12px] text-white/70 font-medium leading-tight">
                  {product.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
