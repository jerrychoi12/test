import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Calendar, User, ExternalLink, Loader2, Sparkles, BookOpen, AlertCircle, PlusCircle } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { fallbackActivities, ActivityPost } from '../data/fallbackActivities';

interface ActivitiesPageProps {
  onBack: () => void;
}

export const ActivitiesPage = ({ onBack }: ActivitiesPageProps) => {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ActivityPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Query published activity posts directly from Sanity CDN in the browser
      const query = `*[_type == "activity" && published == true] | order(_createdAt desc)`;
      const data = await client.fetch(query);
      
      if (Array.isArray(data) && data.length > 0) {
        setPosts(data);
        setIsFallback(false);
      } else {
        console.warn('Sanity set is empty, utilizing preloaded high-fidelity fallback activities.');
        setPosts(fallbackActivities);
        setIsFallback(true);
      }
    } catch (err: any) {
      console.warn('Sanity direct CDN fetch blocked or dataset CORS missing; falling back to offline activities gracefully.', err);
      // Fallback gracefully without throwing alert screens to avoid poor UX
      setPosts(fallbackActivities);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } catch {
      return dateStr;
    }
  };

  // Custom PortableText components to style Sanity's block content gracefully with Tailwind
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="text-zinc-600 font-medium leading-relaxed mb-4 text-justify">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-black text-charcoal tracking-tight mt-8 mb-4">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-black text-charcoal tracking-tight mt-6 mb-3 border-b pb-2 border-neutral-100">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold text-charcoal tracking-tight mt-4 mb-2">{children}</h3>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-crimson bg-neutral-50 pl-4 py-2 my-4 rounded-r-lg italic text-zinc-600 font-medium">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-zinc-600 font-medium">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-zinc-600 font-medium">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-extrabold text-charcoal">{children}</strong>,
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} target="_blank" className="text-crimson hover:text-deepred underline font-semibold decoration-crimson/20 decoration-2 transition-colors">
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-neutral-50 min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-crimson/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Detail View */}
        {selectedPost ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back to List Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="mb-8 flex items-center justify-center gap-2 bg-white/80 hover:bg-[#FAF9F5] border border-silver/30 px-4 py-2 rounded-full text-warmgray hover:text-crimson hover:border-crimson/50 shadow-sm transition-all cursor-pointer group font-semibold text-sm"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>목록으로 돌아가기</span>
            </button>

            {/* Detail Layout */}
            <article className="bg-white rounded-3xl overflow-hidden border border-silver/30 shadow-2xl">
              {/* Cover Image */}
              {selectedPost.coverImage ? (
                <div className="aspect-[21/9] w-full relative overflow-hidden bg-neutral-100 max-h-[420px]">
                  <img 
                    src={urlFor(selectedPost.coverImage)?.width(1200).height(514).fit('crop').auto('format').url() || ''} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="aspect-[21/9] w-full bg-gradient-to-br from-crimson/80 via-navy/90 to-neutral-900 flex flex-col items-center justify-center p-8 text-center max-h-[300px]">
                  <Sparkles className="h-12 w-12 text-crimson/40 mb-3 animate-pulse" />
                  <span className="text-white/70 font-bold tracking-widest text-xs uppercase">SJ CORPORATION NEWS ROOM</span>
                </div>
              )}

              {/* Header Box */}
              <div className="px-6 py-8 sm:px-10 sm:py-12 border-b border-neutral-100">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-warmgray font-semibold mb-4 bg-neutral-50 py-2 px-4 rounded-full w-max">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-crimson" />
                    <span>작성일:</span>
                    <span className="text-charcoal font-bold">{selectedPost.period}</span>
                  </span>
                  <span className="h-1 w-1 bg-neutral-300 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-crimson" />
                    <span>작성자:</span>
                    <span className="text-charcoal font-bold">에스제이코퍼레이션</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-charcoal leading-tight tracking-tighter uppercase whitespace-normal break-keep">
                  {selectedPost.title}
                </h1>
              </div>

              {/* Body Content */}
              <div className="px-6 py-10 sm:px-12 sm:py-14 prose prose-emerald max-w-none">
                {selectedPost.body && selectedPost.body.length > 0 ? (
                  <PortableText value={selectedPost.body} components={portableTextComponents} />
                ) : (
                  <p className="text-zinc-500 italic text-center py-8">등록된 상세 본문 텍스트가 없습니다.</p>
                )}
              </div>
            </article>
          </motion.div>
        ) : (
          /* List View */
          <div>
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="mb-8 flex items-center justify-center w-10 h-10 rounded-full border border-silver/30 bg-white/50 backdrop-blur-sm text-warmgray hover:text-crimson hover:border-crimson transition-all cursor-pointer group"
              aria-label="뒤로 가기"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Page Header (Perfectly identical wrapper styled format to OUR HISTORY and OUR PARTNERS!) */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-black text-charcoal tracking-tighter mb-4 uppercase">NEWS ROOM</h2>
              <p className="text-lg text-warmgray max-w-2xl mx-auto font-medium break-keep">
                에스제이코퍼레이션의 특허 및 기술 인증, 주요 소식들을 알려드립니다.
              </p>
              <div className="h-1.5 w-20 bg-crimson mx-auto mt-8 rounded-full" />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-crimson animate-spin mb-4" />
                <p className="text-warmgray text-sm font-semibold">소식들을 불러오는 중입니다...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16 bg-white rounded-2xl border border-red-100 p-8 shadow-sm max-w-xl mx-auto">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 font-extrabold mb-3 text-lg">데이터 연결 중 오류가 발생했습니다.</p>
                <p className="text-warmgray text-sm mb-6 leading-relaxed bg-neutral-50 p-3 rounded-lg border">{error}</p>
                <button 
                  onClick={fetchPosts}
                  className="bg-crimson hover:bg-deepred text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md cursor-pointer"
                >
                  새로고침 시도
                </button>
              </div>
            )}

            {/* Content Cards */}
            {!loading && !error && (
              <div>
                {posts.length === 0 ? (
                  <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-dashed border-neutral-300 p-12 text-center shadow-lg">
                    <BookOpen className="h-16 w-16 text-crimson/30 mx-auto mb-4" />
                    <h3 className="text-xl font-extrabold text-charcoal mb-2">등록된 소식이 없습니다.</h3>
                    <p className="text-warmgray text-sm leading-relaxed mb-6">
                      에스제이코퍼레이션의 첫 소식을 등록해보세요.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <a 
                        href="/studio"
                        onClick={(e) => {
                          e.preventDefault();
                          // Navigate to studio in parent state
                          window.history.pushState({ view: 'studio' }, '');
                          window.dispatchEvent(new PopStateEvent('popstate', { state: { view: 'studio' } }));
                        }}
                        className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-crimson text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Sanity 관리자 스튜디오 이동 (/studio)</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                      <motion.article 
                        key={post._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 0.999, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onClick={() => setSelectedPost(post)}
                        className="flex flex-col bg-white rounded-3xl overflow-hidden border border-silver/35 hover:shadow-2xl hover:border-crimson/30 transition-all duration-300 cursor-pointer group hover:-translate-y-1.5"
                      >
                        {/* Render cover image configured directly inside Sanity */}
                        {post.coverImage ? (
                          <div className="h-52 overflow-hidden relative bg-neutral-100">
                            <img 
                              src={urlFor(post.coverImage)?.width(400).height(240).fit('crop').auto('format').url() || ''} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 right-3 bg-crimson text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow">
                              NEWS
                            </div>
                          </div>
                        ) : (
                          <div className="h-52 bg-gradient-to-br from-crimson/10 via-navy/5 to-white flex flex-col items-center justify-center p-6 text-center border-b border-silver/10 relative">
                            <span className="text-4xl filter grayscale opacity-20 mb-2">📰</span>
                            <span className="text-[11px] font-bold text-crimson/70 tracking-widest uppercase">
                              SJ Corporation
                            </span>
                            <div className="absolute top-3 right-3 bg-neutral-100 text-warmgray font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-silver/20">
                              NEWS
                            </div>
                          </div>
                        )}

                        {/* Card Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Meta Info */}
                            <div className="flex items-center gap-3 text-xs text-warmgray mb-3 font-semibold">
                              <span className="flex items-center gap-1 text-crimson bg-[#FAF9F5] border border-crimson/10 px-2.5 py-0.5 rounded-full">
                                <Calendar className="h-3.5 w-3.5" />
                                {post.period}
                              </span>
                            </div>

                            {/* Post Title */}
                            <h3 className="font-extrabold text-lg text-charcoal leading-snug tracking-tight mb-3 group-hover:text-crimson transition-colors line-clamp-2 uppercase">
                              {post.title}
                            </h3>

                            {/* Post Summary (excerpt) */}
                            <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-medium line-clamp-3 text-justify">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Action Button Indicator */}
                          <div className="pt-2">
                            <span className="w-full inline-flex items-center justify-center gap-2 bg-neutral-900 group-hover:bg-crimson text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all duration-300">
                              소식 자세히 보기
                              <ExternalLink className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
