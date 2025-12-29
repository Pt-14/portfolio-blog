import { getAllPosts } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
