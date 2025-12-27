import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import ShareButton from '../../../components/blog/ShareButton';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: `${post.title} - Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Remove first h1 from content if it matches title
  let content = post.content;
  const titleRegex = new RegExp(`<h1[^>]*>${post.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h1>`, 'i');
  content = content.replace(titleRegex, '');

  return (
    <div className="pt-16 min-h-screen bg-[#f0f2f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#b16cea] hover:text-[#ff5e69] mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại Blog</span>
        </Link>

        {/* Post Header with Background */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#161513] mb-4 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          {post.tags.length > 0 && (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap" style={{ fontFamily: 'var(--font-inter)' }}>
                {formatDate(post.date)}
              </span>
            </div>
          )}
        </div>

        {/* Post Content without Background */}
        <article className="mb-12">
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#161513] prose-p:text-[#374151] prose-p:leading-relaxed prose-a:text-[#b16cea] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#161513] prose-code:text-[#b16cea] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[#1f2937] prose-pre:rounded-lg prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {/* Share Buttons & Author Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            {/* Author Info - Góc trái */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0">
                <Image
                  src="/images/avatar/avatar.png"
                  alt="Truong Yen Phuong"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#161513] text-lg mb-1">
                  Truong Yen Phuong
                </h3>
                <p className="text-sm text-gray-600">
                  Tổng hợp kinh nghiệm
                </p>
              </div>
            </div>

            {/* Share Buttons - Góc phải */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#b16cea]" />
                <span className="font-semibold text-[#161513]">Chia sẻ bài viết:</span>
              </div>
              <ShareButton 
                title={post.title}
                slug={post.slug}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#b16cea] to-[#ff5e69] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </div>
  );
}
