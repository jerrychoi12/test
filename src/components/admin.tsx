import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Save, Lock, Plus, Trash2, Search, X, Edit2 } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

interface ProductItem {
  id?: number;
  category: string;
  category2: string;
  name: string;
  features: string;
  model: string;
  color_size: string;
  package: string;
  manufacturer: string;
  origin: string;
  spec: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
  item_code: string;
}

const emptyProduct: ProductItem = {
  category: '방진 / 위생의류',
  category2: '',
  name: '',
  features: '',
  model: '',
  color_size: '',
  package: '',
  manufacturer: '',
  origin: '',
  spec: '',
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  img5: '',
  item_code: ''
};

export const AdminPage = ({ onBack }: AdminPageProps) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit/Add modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vlwnsgml') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct({ ...emptyProduct });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateFormField = (field: keyof ProductItem, value: string) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const handleSaveCurrent = () => {
    if (!editingProduct) return;
    
    // In this specific requirement, we want to save everything in batch, 
    // but the user might want a "Save" in the modal that updates the local list first, 
    // then they hit "Save All" on the main dashboard.
    // Or we just update the local state.
    
    const updatedProducts = [...products];
    if (editingProduct.id || (editingProduct.item_code && products.some(p => p.item_code === editingProduct.item_code))) {
      // Find and update
      const index = products.findIndex(p => 
        (editingProduct.id && p.id === editingProduct.id) || 
        (editingProduct.item_code && p.item_code === editingProduct.item_code)
      );
      if (index !== -1) {
        updatedProducts[index] = editingProduct;
      } else {
        updatedProducts.push(editingProduct);
      }
    } else {
      // Add new
      updatedProducts.unshift(editingProduct);
    }
    setProducts(updatedProducts);
    handleCloseModal();
  };

  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/save-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
      });
      if (response.ok) {
        alert('모든 변경사항이 저장되었습니다 (Upsert)');
        fetchProducts();
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    } catch (err) {
      alert('서버 연결 오류');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id?: number, item_code?: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    if (!id && item_code) {
      // If it hasn't been saved yet (no DB ID)
      setProducts(products.filter(p => p.item_code !== item_code));
      return;
    }

    if (!id) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('삭제 중 오류 발생');
    }
  };

  const categories = ["전체", "방진 / 위생의류", "켐블록(CHEMBLOCK) 시리즈", "글러브", "와이퍼류", "클린룸 소모품", "클린룸 가구"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      (p.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
      (p.item_code?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (p.model?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 font-sans text-sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-silver/30">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-crimson/10 rounded-full"><Lock className="text-crimson w-8 h-8" /></div>
          </div>
          <h2 className="text-2xl font-black text-center mb-8 text-charcoal tracking-tight">관리자 로그인</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-warmgray mb-2 uppercase tracking-wider">Passphrase</label>
              <input 
                type="password" 
                name="admin-security-key"
                autoComplete="current-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-silver/50 focus:border-crimson outline-none transition-all placeholder:text-silver/60"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {error && <p className="text-crimson text-xs font-medium bg-crimson/5 p-2 rounded-lg text-center">{error}</p>}
            <button type="submit" className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-navy/90 transition-all shadow-lg active:scale-[0.98]">들어가기</button>
            <button type="button" onClick={onBack} className="w-full py-2 text-warmgray hover:text-charcoal transition-all text-xs font-medium">홈으로 돌아가기</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-24 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <button onClick={onBack} className="flex items-center text-warmgray hover:text-crimson transition-all font-bold mb-2 text-xs uppercase tracking-widest">
              <ChevronLeft className="mr-1 h-4 w-4" /> Go Back
            </button>
            <h2 className="text-4xl font-black text-charcoal tracking-tighter leading-none">DATABASE MANAGEMENT</h2>
            <p className="text-warmgray mt-2 text-sm">제품 데이터를 통합 관리하고 일괄 저장할 수 있습니다.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver" />
              <input 
                type="text" placeholder="품명, 코드, 모델명 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-silver/40 rounded-xl outline-none focus:border-crimson w-72 text-sm shadow-sm"
                autoComplete="off"
              />
            </div>
            <select 
              value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-silver/40 rounded-xl px-4 py-2.5 outline-none focus:border-crimson text-sm font-bold shadow-sm cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button 
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-navy text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-navy/90 transition-all shadow-md active:scale-95"
            >
              <Plus className="h-4 w-4" /> 신규 품목 추가
            </button>
            <button 
              onClick={handleSaveAll}
              disabled={isLoading}
              className="px-6 py-2.5 bg-crimson text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-deepred transition-all shadow-md disabled:opacity-50 active:scale-95"
            >
              <Save className="h-4 w-4" /> DB 일괄 저장 (Upsert)
            </button>
          </div>
        </div>

        {/* List Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-silver/20 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse text-sm text-left">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 w-16 text-center">ID</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 w-24 text-center">이미지</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 min-w-[140px]">분류</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 min-w-[140px]">모델명</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 min-w-[250px]">제품명</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs border-r border-white/5 min-w-[250px]">Spec / 규격</th>
                  <th className="px-6 py-5 font-bold uppercase tracking-wider text-xs sticky right-0 bg-neutral-900 z-10 text-center w-32">동작</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver/20">
                {isLoading && products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-silver/30 border-t-crimson rounded-full animate-spin" />
                        <p className="text-warmgray font-medium">데이터를 불러오는 중입니다...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? filteredProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors group">
                    <td className="px-6 py-4 border-r border-silver/15 text-silver font-mono text-xs text-center">{product.id || 'NEW'}</td>
                    <td className="px-4 py-3 border-r border-silver/15 text-center">
                      <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden border border-silver/20 mx-auto">
                        <img 
                          src={product.img1 || "https://via.placeholder.com/100x100?text=No+Img"} 
                          alt="" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-silver/15">
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-0.5 bg-navy/5 text-navy text-[10px] font-bold rounded-md w-fit uppercase">{product.category}</span>
                        {product.category2 && <span className="px-2 py-0.5 bg-silver/10 text-warmgray text-[10px] font-medium rounded-md w-fit">{product.category2}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r border-silver/15 font-bold text-charcoal">{product.model || '-'}</td>
                    <td className="px-6 py-4 border-r border-silver/15 font-bold text-crimson">{product.name}</td>
                    <td className="px-6 py-4 border-r border-silver/15 text-warmgray leading-relaxed max-w-xs">{product.spec}</td>
                    <td className="px-6 py-4 sticky right-0 bg-white group-hover:bg-neutral-50 transition-colors z-10 flex gap-2 justify-center">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="p-2 text-navy hover:bg-navy/10 rounded-lg transition-colors"
                        title="편집"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.item_code)}
                        className="p-2 text-warmgray hover:text-crimson hover:bg-crimson/10 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="py-32 text-center text-warmgray font-medium bg-neutral-50/30">
                      검색 조건에 맞는 공정 소모품 데이터가 존재하지 않습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-silver/20 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy/10 rounded-xl text-navy">
                    {editingProduct.id ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-charcoal tracking-tight">
                      {editingProduct.id ? `제품 편집 (ID: ${editingProduct.id})` : '신규 제품 등록'}
                    </h3>
                    <p className="text-xs text-warmgray font-medium">관리자 전용 데이터 입력 폼</p>
                  </div>
                </div>
                <button onClick={handleCloseModal} className="p-2 hover:bg-silver/20 rounded-full transition-colors">
                  <X className="h-6 w-6 text-warmgray" />
                </button>
              </div>

              {/* Modal Body - Scrollable Form Grid */}
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar scroll-smooth">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Basic Info Section */}
                  <div className="md:col-span-2 flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-silver/20" />
                    <span className="text-[10px] font-black text-silver uppercase tracking-widest">Basic Information</span>
                    <div className="h-px flex-1 bg-silver/20" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">품목 코드 (Unique ID)</label>
                    <input 
                      type="text" 
                      autoComplete="one-time-code"
                      value={editingProduct.item_code}
                      onChange={(e) => handleUpdateFormField('item_code', e.target.value)}
                      placeholder="제품 고유 식별 코드 입력"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">대분류 (Category 1)</label>
                    <select 
                      value={editingProduct.category}
                      onChange={(e) => handleUpdateFormField('category', e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm font-bold"
                    >
                      {categories.filter(c => c !== '전체').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">소분류 (Category 2)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.category2}
                      onChange={(e) => handleUpdateFormField('category2', e.target.value)}
                      placeholder="상세 분류 입력"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">모델명 (Model Name)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.model}
                      onChange={(e) => handleUpdateFormField('model', e.target.value)}
                      placeholder="모델명 또는 품번 입력"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm font-bold"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-charcoal">제품명 (Product Name / Title)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.name}
                      onChange={(e) => handleUpdateFormField('name', e.target.value)}
                      placeholder="카탈로그에 노출될 전체 제품명"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm font-bold text-crimson"
                    />
                  </div>

                  {/* Detail Info Section */}
                  <div className="md:col-span-2 flex items-center gap-2 mt-4 mb-2">
                    <div className="h-px flex-1 bg-silver/20" />
                    <span className="text-[10px] font-black text-silver uppercase tracking-widest">Detail Specification</span>
                    <div className="h-px flex-1 bg-silver/20" />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-charcoal">특장점 (Key Features)</label>
                    <textarea 
                      autoComplete="off" value={editingProduct.features}
                      onChange={(e) => handleUpdateFormField('features', e.target.value)}
                      rows={2}
                      placeholder="핵심 소구점 및 장점 기술"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">색상/사이즈 (Color & Size)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.color_size}
                      onChange={(e) => handleUpdateFormField('color_size', e.target.value)}
                      placeholder="예: Blue, White / XL, XXL"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">포장 규격 (Package)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.package}
                      onChange={(e) => handleUpdateFormField('package', e.target.value)}
                      placeholder="예: 50ea/Box, 1Roll"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">제조사 (Manufacturer)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.manufacturer}
                      onChange={(e) => handleUpdateFormField('manufacturer', e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-charcoal">원산지 (Origin)</label>
                    <input 
                      type="text" autoComplete="off" value={editingProduct.origin}
                      onChange={(e) => handleUpdateFormField('origin', e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-charcoal">상세 스펙 (Spec / Note)</label>
                    <textarea 
                      autoComplete="off" value={editingProduct.spec}
                      onChange={(e) => handleUpdateFormField('spec', e.target.value)}
                      rows={3}
                      placeholder="기타 상세 제품 사양 정보"
                      className="w-full px-4 py-3 bg-neutral-50 border border-silver/30 rounded-xl outline-none focus:border-crimson focus:bg-white transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Images Section */}
                  <div className="md:col-span-2 flex items-center gap-2 mt-4 mb-2">
                    <div className="h-px flex-1 bg-silver/20" />
                    <span className="text-[10px] font-black text-silver uppercase tracking-widest">Visual Assets (Links)</span>
                    <div className="h-px flex-1 bg-silver/20" />
                  </div>

                  {[1, 2, 3, 4, 5].map(num => (
                    <div key={num} className="space-y-2">
                      <label className="text-[10px] font-bold text-warmgray uppercase tracking-tighter">Image {num} URL</label>
                      <input 
                        type="text" autoComplete="off"
                        value={(editingProduct as any)[`img${num}`]}
                        onChange={(e) => handleUpdateFormField(`img${num}` as keyof ProductItem, e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-silver/30 rounded-lg outline-none focus:border-navy focus:bg-white transition-all text-[11px] font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 border-t border-silver/20 bg-neutral-50 flex items-center justify-end gap-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-warmgray font-bold text-sm hover:text-charcoal transition-all"
                >
                  취소
                </button>
                <button 
                  onClick={handleSaveCurrent}
                  className="px-10 py-3 bg-navy text-white rounded-xl font-bold text-sm shadow-lg hover:bg-navy/90 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" /> 리스트에 반영
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
