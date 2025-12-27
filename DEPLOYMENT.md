# Hướng dẫn Deploy Portfolio Blog

Hướng dẫn chi tiết để deploy website lên các platform phổ biến.

## 🚀 Vercel (Khuyến nghị - Dễ nhất)

### Bước 1: Chuẩn bị GitHub Repository

1. Tạo repository mới trên GitHub
2. Push code lên GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio-blog.git
git push -u origin main
```

### Bước 2: Deploy trên Vercel

1. Vào [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Click "Add New Project"
4. Import repository vừa tạo
5. Vercel tự động detect Next.js
6. Click "Deploy"
7. Đợi vài phút, website sẽ có URL: `https://your-project.vercel.app`

### Ưu điểm Vercel:
- ✅ Miễn phí
- ✅ Tự động deploy khi push code
- ✅ Preview URLs cho mỗi PR
- ✅ CDN toàn cầu
- ✅ SSL tự động
- ✅ Custom domain dễ dàng

## 🌐 GitHub Pages

### Bước 1: Cài đặt dependencies

```bash
npm install --save-dev gh-pages
```

### Bước 2: Cập nhật package.json

Thêm vào `scripts`:

```json
{
  "scripts": {
    "export": "next build",
    "deploy": "npm run export && touch out/.nojekyll && gh-pages -d out"
  }
}
```

### Bước 3: Cập nhật next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Bước 4: Deploy

```bash
npm run deploy
```

Website sẽ có tại: `https://yourusername.github.io/portfolio-blog`

## ☁️ Netlify

### Bước 1: Chuẩn bị

Tạo file `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Bước 2: Deploy

1. Vào [netlify.com](https://netlify.com)
2. Đăng nhập bằng GitHub
3. Import project
4. Deploy!

## 🔧 Custom Domain

### Vercel:
1. Vào Project Settings > Domains
2. Thêm domain của bạn
3. Cập nhật DNS records theo hướng dẫn

### GitHub Pages:
1. Vào Repository Settings > Pages
2. Thêm custom domain
3. Cập nhật DNS records

## 📝 Environment Variables

Nếu cần thêm environment variables:

### Vercel:
Project Settings > Environment Variables

### Netlify:
Site Settings > Build & Deploy > Environment Variables

## ✅ Checklist trước khi deploy

- [ ] Test local với `npm run build`
- [ ] Kiểm tra tất cả links hoạt động
- [ ] Kiểm tra responsive trên mobile
- [ ] Cập nhật thông tin cá nhân trong code
- [ ] Thêm meta tags SEO
- [ ] Test blog posts hiển thị đúng

## 🐛 Troubleshooting

### Build fails:
- Kiểm tra lỗi trong terminal
- Đảm bảo tất cả dependencies đã install
- Kiểm tra TypeScript errors

### Blog posts không hiển thị:
- Kiểm tra file markdown có đúng format
- Kiểm tra frontmatter có đầy đủ
- Xem console logs

### Images không load:
- Kiểm tra đường dẫn trong public folder
- Với GitHub Pages, cần `images.unoptimized: true`

## 📚 Tài liệu tham khảo

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages](https://pages.github.com/)

---

**Lưu ý**: Vercel là lựa chọn tốt nhất cho Next.js projects!
