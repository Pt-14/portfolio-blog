# Fang Portfolio - Blog về Java & JavaScript

Portfolio website và blog cá nhân được xây dựng với Next.js, Tailwind CSS. Chia sẻ kiến thức về lập trình Java, JavaScript và UI/UX Design.

## ✨ Tính năng

- **Portfolio Showcase**: Trang chủ giới thiệu về skills và projects
- **Blog System**: Blog với Markdown support, chia sẻ về Java & JavaScript
- **Responsive Design**: Hoạt động hoàn hảo trên mọi thiết bị
- **SEO Optimized**: Meta tags và structured data
- **Modern UI**: Thiết kế đẹp, tối giản với Tailwind CSS
- **Fast Performance**: SSG (Static Site Generation) với Next.js

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Content**: Markdown files
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended) / GitHub Pages

## 📁 Cấu trúc Project

```
portfolio-blog/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Blog post detail
│   └── about/
│       └── page.tsx        # About page
├── components/
│   ├── Navbar.tsx          # Navigation component
│   └── Footer.tsx          # Footer component
├── lib/
│   └── posts.ts            # Blog posts utilities
├── posts/                  # Markdown blog posts
│   ├── java-basics.md
│   ├── java-oop.md
│   ├── javascript-basics.md
│   └── ...
└── public/                 # Static assets
```

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

### Build production
```bash
npm run build
npm start
```

## 📝 Thêm Blog Post mới

1. Tạo file Markdown mới trong thư mục `posts/`
2. Thêm frontmatter:

```markdown
---
title: "Tiêu đề bài viết"
date: "2024-03-10"
excerpt: "Mô tả ngắn về bài viết"
category: "Java" hoặc "JavaScript"
tags: ["tag1", "tag2"]
---

# Nội dung bài viết
```

3. File sẽ tự động xuất hiện trong blog listing

## 🌐 Deployment

### Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com)
3. Import project từ GitHub
4. Deploy tự động!

### GitHub Pages

1. Cài đặt `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Thêm script vào `package.json`:
```json
"scripts": {
  "export": "next build && next export",
  "deploy": "npm run export && gh-pages -d out"
}
```

3. Deploy:
```bash
npm run deploy
```

## 📚 Blog Posts

Hiện tại có **10 bài viết** về Java và JavaScript:

### Java (5 bài)
- Giới thiệu về Java
- Lập trình hướng đối tượng trong Java
- Java Collections Framework
- Xử lý Exception trong Java
- Java Streams API

### JavaScript (5 bài)
- JavaScript cơ bản
- ES6+ JavaScript
- JavaScript Async/Await
- JavaScript DOM Manipulation
- JavaScript Functions
- JavaScript Modules

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa trong `tailwind.config.ts` hoặc sử dụng Tailwind classes trực tiếp.

### Thay đổi thông tin cá nhân
- `app/page.tsx`: Hero section
- `app/about/page.tsx`: About page
- `components/Footer.tsx`: Footer links

### Thêm sections mới
Tạo page mới trong `app/` directory và thêm link vào `components/Navbar.tsx`

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👤 Author

**Fang**
- Portfolio: [Your Portfolio URL]
- Blog: [Your Blog URL]
- GitHub: [Your GitHub]

---

Made with ❤️ using Next.js and Tailwind CSS