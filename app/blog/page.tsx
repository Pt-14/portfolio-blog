import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog - Fang Portfolio',
  description: 'Chia sẻ kiến thức về Java, JavaScript và lập trình mạng',
};

export default function BlogPage() {
  const posts = getAllPosts();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  return (
    <div className="pt-16 min-h-screen bg-[#f0f2f5]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#161513] mb-4">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chia sẻ kiến thức về lập trình mạng với Java và JavaScript
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Chưa có bài viết nào. Đang cập nhật...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300"
              >
                {/* Content */}
                <div>
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-white">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        priority={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400 text-6xl font-bold opacity-50">
                          {post.title.charAt(0)}
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
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-[#161513] mb-3 line-clamp-2 leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 line-clamp-3 text-sm md:text-base leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
