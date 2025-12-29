import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: {
    vi: string;
    en: string;
  };
  date: string;
  excerpt: {
    vi: string;
    en: string;
  };
  content: {
    vi: string;
    en: string;
  };
  category: {
    vi: string;
    en: string;
  };
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

  // Process content for both languages if it's an object, otherwise use as single language
  let contentResult = { vi: '', en: '' };

  if (typeof data.content === 'object' && data.content.vi && data.content.en) {
    // Content is already structured as bilingual
    try {
      const processedContentVi = remark().use(html).processSync(data.content.vi);
      const processedContentEn = remark().use(html).processSync(data.content.en);
      contentResult = {
        vi: String(processedContentVi),
        en: String(processedContentEn)
      };
    } catch (error) {
      console.error(`Error processing bilingual markdown for ${realSlug}:`, error);
      contentResult = data.content;
    }
  } else {
    // Single language content - try to process as HTML
    try {
      const processedContent = remark().use(html).processSync(content);
      const contentHtml = String(processedContent);
      // For backward compatibility, assume this is Vietnamese content
      contentResult = { vi: contentHtml, en: contentHtml };
    } catch (error) {
      console.error(`Error processing markdown for ${realSlug}:`, error);
      contentResult = { vi: content, en: content };
    }
  }

  return {
    slug: realSlug,
    title: data.title || { vi: '', en: '' },
    date: data.date || '',
    excerpt: data.excerpt || { vi: '', en: '' },
    content: contentResult,
    category: data.category || { vi: 'Uncategorized', en: 'Uncategorized' },
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
  return getAllPosts().filter((post) =>
    post.category.vi === category || post.category.en === category
  );
}
