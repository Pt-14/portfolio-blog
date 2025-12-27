import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${realSlug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents, {
    engines: {
      yaml: (s: string) => {
        return yaml.load(s, { schema: yaml.DEFAULT_SCHEMA }) as object;
      },
    },
  });

  let contentHtml = '';
  try {
    const processedContent = remark().use(html).processSync(content);
    contentHtml = String(processedContent);
  } catch (error) {
    console.error(`Error processing markdown for ${realSlug}:`, error);
    contentHtml = content;
  }

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: contentHtml,
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    image: data.image || '',
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  return posts;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}
