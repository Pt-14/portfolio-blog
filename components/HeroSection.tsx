'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      greeting: "Xin chào, tôi là",
      name: "Phương",
      university: "HUTECH – Đại học Công Nghệ TP.HCM • Công nghệ Thông tin",
      description: "Một sinh viên ngành Công nghệ Phần mềm đam mê Frontend Development và UI/UX Design, hướng tới việc xây dựng những trải nghiệm người dùng đẹp mắt, trực quan và mang tính tương tác cao.",
      getInTouch: "Liên hệ",
      viewAllWorks: "Xem tất cả dự án"
    },
    en: {
      greeting: "Hello, I'm",
      name: "Phuong",
      university: "HUTECH – Ho Chi Minh City University of Technology • Information Technology",
      description: "A Software Engineering student passionate about Frontend Development and UI/UX Design, aiming to build beautiful, intuitive, and highly interactive user experiences.",
      getInTouch: "GET IN TOUCH",
      viewAllWorks: "VIEW ALL WORKS"
    }
  };

  const t = translations[language];

  return (
    <section className="hero-section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-section-wrap">
          <div className="hero-section-content">
            <h1 className="heading">
              <span className="gradient is-text is-heading-one">
                {t.greeting} {t.name}
              </span>
              <p className="university-text">{t.university}</p>
            </h1>
            <p className="dark">{t.description}</p>
            <div className="button-wrap">
              <Link href="/contact" className="gradient-btn w-inline-block">
                <div className="gradient-btn-text">{t.getInTouch}</div>
              </Link>
              <Link href="/blog" className="sec-btn w-inline-block">
                <div className="sec-btn-text">{t.viewAllWorks}</div>
              </Link>
            </div>
          </div>
          <div className="hero-section-image">
            <Image
              src="/images/avatar/avatar.png"
              alt="hero image"
              width={200}
              height={200}
              priority
              className="hero-img rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

