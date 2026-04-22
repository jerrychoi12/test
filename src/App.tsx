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
  const [selectedCategory, setSelectedCategory] = useState<string>("방진/위생 의류");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["방진/위생 의류"]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        if (event.state.view) setView(event.state.view);
        setSelectedProductId(event.state.productId || null);
      } else {
        setView('home');
        setSelectedProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'home', productId: null }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: View, category?: string) => {
    if (category) {
      setSelectedCategory(category);
      setExpandedCategories([category]);
    }
    
    if (view !== newView || category) {
      window.history.pushState({ view: newView, productId: null, category: category || selectedCategory }, '');
      setView(newView);
      setSelectedProductId(null);
    }
  };

  const handleProductOpen = (id: number) => {
    window.history.pushState({ view: 'catalog', productId: id }, '');
    setSelectedProductId(id);
  };

  const handleProductClose = () => {
    if (selectedProductId) {
      window.history.back();
    }
  };

  const handleContactClick = () => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    try {
      if (!selectedProductId) {
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.error("Scroll error:", e);
    }
  }, [view, selectedProductId]);

  return (
    <div className="font-sans selection:bg-crimson/20 selection:text-crimson min-h-screen bg-white">
      <Navbar 
        onLogoClick={() => navigateTo('home')} 
        currentView={view} 
      />
      <main>
        {view === 'admin' ? (
          <AdminPage onBack={() => navigateTo('home')} />
        ) : view === 'home' ? (
          <>
            <Hero onCatalogClick={() => navigateTo('catalog')} />
            <CompanySection 
              onPartnersClick={() => navigateTo('partners')} 
              onHistoryClick={() => navigateTo('history')}
            />
            <Products onCategoryClick={(cat) => navigateTo('catalog', cat)} />
            <Contact />
          </>
        ) : view === 'catalog' ? (
          <ProductCatalog 
            onContactClick={handleContactClick} 
            selectedProductId={selectedProductId}
            onProductOpen={handleProductOpen}
            onProductClose={handleProductClose}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
          />
        ) : view === 'history' ? (
          <HistorySection 
            onBack={() => navigateTo('home')} 
            onAdminClick={() => navigateTo('admin')}
          />
        ) : (
          <PartnersPage onContactClick={handleContactClick} onBack={() => navigateTo('home')} />
        )}
      </main>
      <Footer />
    </div>
  );
}
