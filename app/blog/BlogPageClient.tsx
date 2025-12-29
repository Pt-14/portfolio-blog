'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Post } from '@/lib/posts';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Blog Card Component with animation
function BlogCard({ post, language, index }: { post: Post; language: string; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  return (
    <Link
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={`/blog/${post.slug}`}
      className={`blog-card bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Content */}
      <div>
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-white">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title[language as 'vi' | 'en']}
              fill
              className="object-contain p-3"
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400 text-6xl font-bold opacity-50">
                {post.title[language as 'vi' | 'en'].charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="p-7">
          {/* Date and Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
              {formatDate(post.date)}
            </span>
            <span className="px-2 py-1 bg-[#f0f2f5] text-gray-700 rounded-full text-xs font-medium">
              {post.category[language as 'vi' | 'en']}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-[#161513] mb-3 line-clamp-2 leading-tight">
            {post.title[language as 'vi' | 'en']}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-3 text-sm md:text-base leading-relaxed">
            {post.excerpt[language as 'vi' | 'en']}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const { language } = useLanguage();

  const translations = {
    vi: {
      title: 'Blog',
      description: 'Chia sẻ kiến thức về lập trình mạng với Java và JavaScript',
      noPosts: 'Chưa có bài viết nào. Đang cập nhật...',
    },
    en: {
      title: 'Blog',
      description: 'Sharing knowledge about networking programming with Java and JavaScript',
      noPosts: 'No posts available. Coming soon...',
    },
  };

  const t = translations[language];
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <div className="pt-16 min-h-screen bg-[#f0f2f5]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#161513] mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">{t.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
            {posts.map((post, index) => (
              <BlogCard 
                key={post.slug}
                post={post}
                language={language}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
