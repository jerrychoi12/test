import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanySection } from './components/CompanySection';
import { Products } from './components/Products';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductCatalog } from './components/ProductCatalog';
import { HistorySection } from './components/HistorySection';
import { PartnersPage } from './components/PartnersPage';
import { AdminPage } from './components/admin';
import { View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  
  // [중요] SQL 데이터와 정확히 일치하는 카테고리 명칭 (공백 유지)
  const [selectedCategory, setSelectedCategory] = useState<string>("방진 / 위생의류");
  const [selectedSub, setSelectedSub] = useState<string>("전체");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["방진 / 위생의류"]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        if (event.state.view) setView(event.state.view);
        setSelectedProductId(event.state.productId || null);
        if (event.state.category) {
          setSelectedCategory(event.state.category);
          setExpandedCategories([event.state.category]);
        }
        if (event.state.subCategory) {
          setSelectedSub(event.state.subCategory);
        } else {
          setSelectedSub("전체");
        }
      } else {
        setView('home');
        setSelectedProductId(null);
        setSelectedSub("전체");
      }
    };
    window.addEventListener('popstate', handlePopState);
    if (!window.history.state) {
      window.history.replaceState({ view: 'home', productId: null, category: selectedCategory, subCategory: selectedSub }, '');
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCategory, selectedSub]);

  const navigateTo = (newView: View, category?: string, subCategory: string = "전체") => {
    // 카테고리 매칭 로직 보정 (공백/슬래시 무시 비교)
    let targetCategory = category || selectedCategory;
    const normalize = (str: string) => (str || "").replace(/[\s\/]/g, '').toLowerCase();
    
    const catalogList = [
      "방진 / 위생의류", 
      "켐블록(CHEMBLOCK) 시리즈", 
      "글러브", 
      "와이퍼류", 
      "클린룸 소모품", 
      "클린룸 가구"
    ];

    if (category) {
      const matched = catalogList.find(c => normalize(c) === normalize(category));
      if (matched) targetCategory = matched;
    }

    if (category || newView === 'catalog') {
      setSelectedCategory(targetCategory);
      setSelectedSub(subCategory);
      setExpandedCategories([targetCategory]);
    }
    
    window.history.pushState({ 
      view: newView, 
      productId: null, 
      category: targetCategory,
      subCategory: subCategory
    }, '');
    setView(newView);
    setSelectedProductId(null);
  };

  const handleProductOpen = (id: number, category?: string, subCategory?: string) => {
    // 제품을 열 때 현재 카테고리 상태를 히스토리에 포함하여 저장
    window.history.pushState({ 
      view: 'catalog', 
      productId: id, 
      category: category || selectedCategory,
      subCategory: subCategory || selectedSub
    }, '');
    setSelectedProductId(id);
    if (category) setSelectedCategory(category);
    if (subCategory) setSelectedSub(subCategory);
  };

  const handleProductClose = () => {
    if (selectedProductId) window.history.back();
  };

  const handleContactClick = () => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProductId]);

  return (
    <div className="font-sans selection:bg-crimson/20 selection:text-crimson min-h-screen bg-white">
      <Navbar onLogoClick={() => navigateTo('home')} currentView={view} />
      <main>
        {view === 'admin' ? (
          <AdminPage onBack={() => navigateTo('home')} />
        ) : view === 'home' ? (
          <>
            <Hero onCatalogClick={() => navigateTo('catalog')} />
            <CompanySection onPartnersClick={() => navigateTo('partners')} onHistoryClick={() => navigateTo('history')} />
            <Products onCategoryClick={(cat) => navigateTo('catalog', cat)} />
            <Contact />
          </>
        ) : view === 'catalog' ? (
          <ProductCatalog 
            onContactClick={handleContactClick} 
            selectedProductId={selectedProductId}
            onProductOpen={(id) => {
              // 제품 리스트에서 제품을 찾아서 해당 제품의 카테고리 정보를 전달
              handleProductOpen(id);
            }}
            onProductClose={handleProductClose}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSub={selectedSub}
            setSelectedSub={setSelectedSub}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
          />
        ) : view === 'history' ? (
          <HistorySection onBack={() => navigateTo('home')} onAdminClick={() => navigateTo('admin')} />
        ) : (
          <PartnersPage onContactClick={handleContactClick} onBack={() => navigateTo('home')} />
        )}
      </main>
      <Footer />
    </div>
  );
}