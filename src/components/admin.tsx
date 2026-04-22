import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Lock, Plus, Trash2, Search, Edit3 } from 'lucide-react';

interface AdminPageProps {
  onBack: () => void;
}

interface ProductItem {
  id?: number;
  category: string;
  item_code: string;
  name: string;
  features: string;
  size: string;
  package_size: string;
  manufacturer: string;
  origin: string;
  note: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

export const AdminPage = ({ onBack }: AdminPageProps) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
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

  const handleAddRow = () => {
    const newProduct: ProductItem = {
      category: '방진/위생 의류',
      item_code: '',
      name: '새 품목',
      features: '',
      size: '',
      package_size: '',
      manufacturer: '',
      origin: '',
      note: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: ''
    };
    setProducts([newProduct, ...products]);
  };

  const handleUpdateField = (index: number, field: keyof ProductItem, value: string) => {
    const updatedProducts = [...products];
    (updatedProducts[index] as any)[field] = value;
    setProducts(updatedProducts);
  };

  const handleSave = async (product: ProductItem) => {
    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        alert('저장되었습니다.');
        fetchProducts();
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    } catch (err) {
      alert('서버 연결 오류');
    }
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
        alert('모든 변경사항이 저장되었습니다.');
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

  const handleDelete = async (id?: number) => {
    if (!id) {
      setProducts(products.filter(p => p.id));
      return;
    }
    
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('삭제 중 오류 발생');
    }
  };

  const categories = ["전체", "방진/위생 의류", "보호 장갑", "청결/위생 소모품", "공정 소모품", "전용 가구/설비"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.item_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-silver/30">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-crimson/10 rounded-full"><Lock className="text-crimson w-8 h-8" /></div>
          </div>
          <h2 className="text-2xl font-black text-center mb-8 text-charcoal tracking-tight">관리자 로그인</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-warmgray mb-2">비밀번호</label>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-silver/50 focus:border-crimson outline-none transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            {error && <p className="text-crimson text-sm font-medium">{error}</p>}
            <button type="submit" className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-steelblue transition-all shadow-lg">들어가기</button>
            <button type="button" onClick={onBack} className="w-full py-2 text-warmgray hover:text-charcoal transition-all text-sm font-medium">홈으로 돌아가기</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite pt-24 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <button onClick={onBack} className="flex items-center text-warmgray hover:text-crimson transition-all font-bold mb-2">
              <ChevronLeft className="mr-1 h-5 w-5" /> 메인으로
            </button>
            <h2 className="text-3xl font-black text-charcoal tracking-tighter">품목 관리 대시보드 (스프레드시트)</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-warmgray" />
              <input 
                type="text" placeholder="품명 또는 코드 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-silver/50 rounded-xl outline-none focus:border-crimson w-64 text-sm"
              />
            </div>
            <select 
              value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-silver/50 rounded-xl px-4 py-2 outline-none focus:border-crimson text-sm font-bold"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button 
              onClick={handleAddRow}
              className="px-4 py-2 bg-navy text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-steelblue transition-all shadow-md"
            >
              <Plus className="h-4 w-4" /> 품목 추가
            </button>
            <button 
              onClick={handleSaveAll}
              disabled={isLoading}
              className="px-6 py-2 bg-crimson text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-deepred transition-all shadow-md disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> 전체 저장하기
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-silver/20 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse text-sm text-left">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">카테고리</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[120px]">품목코드</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[200px]">품명</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[300px]">특장점</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[120px]">사이즈</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[120px]">포장규격</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">제조원</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[120px]">원산지</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">비고</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">이미지1</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">이미지2</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">이미지3</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">이미지4</th>
                  <th className="px-4 py-4 font-bold border-r border-white/10 min-w-[150px]">이미지5</th>
                  <th className="px-4 py-4 font-bold sticky right-0 bg-navy z-10 text-center min-w-[120px]">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver/20">
                {filteredProducts.length > 0 ? filteredProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-offwhite/50 transition-colors group">
                    <td className="p-2 border-r border-silver/20">
                      <select 
                        value={product.category} onChange={(e) => handleUpdateField(idx, 'category', e.target.value)}
                        className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg font-bold text-crimson"
                      >
                        {categories.filter(c => c !== '전체').map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.item_code} onChange={(e) => handleUpdateField(idx, 'item_code', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.name} onChange={(e) => handleUpdateField(idx, 'name', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg font-bold" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <textarea value={product.features} onChange={(e) => handleUpdateField(idx, 'features', e.target.value)} rows={1} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg resize-y min-h-[40px]" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.size} onChange={(e) => handleUpdateField(idx, 'size', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.package_size} onChange={(e) => handleUpdateField(idx, 'package_size', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.manufacturer} onChange={(e) => handleUpdateField(idx, 'manufacturer', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.origin} onChange={(e) => handleUpdateField(idx, 'origin', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.note} onChange={(e) => handleUpdateField(idx, 'note', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.image1} onChange={(e) => handleUpdateField(idx, 'image1', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.image2} onChange={(e) => handleUpdateField(idx, 'image2', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.image3} onChange={(e) => handleUpdateField(idx, 'image3', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.image4} onChange={(e) => handleUpdateField(idx, 'image4', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-2 border-r border-silver/20">
                      <input type="text" value={product.image5} onChange={(e) => handleUpdateField(idx, 'image5', e.target.value)} className="w-full bg-transparent p-2 outline-none focus:bg-white rounded-lg text-xs" />
                    </td>
                    <td className="p-2 sticky right-0 bg-white group-hover:bg-offwhite transition-colors z-10 flex gap-2 justify-center py-4">
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-warmgray hover:text-crimson bg-silver/10 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={15} className="py-20 text-center text-warmgray font-medium">데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
