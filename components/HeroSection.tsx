'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => {
      if (transitionRef.current) {
        observer.unobserve(transitionRef.current);
      }
    };
  }, []);

  const translations = {
    vi: {
      greeting: "Xin chào, tôi là",
      name: "Phương",
      job: "Frontend Developer | UI/UX Designer",
      description: "Một sinh viên ngành Công nghệ Phần mềm đam mê Frontend Development và UI/UX Design, hướng tới việc xây dựng những trải nghiệm người dùng đẹp mắt, trực quan và mang tính tương tác cao.",
      getInTouch: "Liên hệ",
      viewAllWorks: "Xem tất cả dự án",
      transitionText: "Nơi thiết kế gặp code – biến ý tưởng thành trải nghiệm"
    },
    en: {
      greeting: "Hello, I'm",
      name: "Phuong",
      job: "Frontend Developer | UI/UX Designer",
      description: "A Software Engineering student passionate about Frontend Development and UI/UX Design, aiming to build beautiful, intuitive, and highly interactive user experiences.",
      getInTouch: "GET IN TOUCH",
      viewAllWorks: "VIEW ALL WORKS",
      transitionText: "Where design meets code – turning ideas into experiences"
    }
  };

  const t = translations[language];

  return (
    <section className="hero-section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-section-wrap">
          <div className="hero-section-content">
            <h1 className="heading mt-4 md:mt-2.5">
              <span className="gradient is-text is-heading-one">
                {t.greeting} {t.name}
              </span>
              <p className="university-text">{t.job}</p>
            </h1>
            <p className="dark">{t.description}</p>
            <div className="button-wrap">
              <Link href="/contact" className="gradient-btn w-inline-block">
                <div className="gradient-btn-text">{t.getInTouch}</div>
              </Link>
              <Link href="#projects" className="sec-btn w-inline-block">
                <div className="sec-btn-text">{t.viewAllWorks}</div>
              </Link>
            </div>
          </div>
          <div className="hero-section-image mt-4 md:mt-6">
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

        {/* Transition Divider/Caption - Giao thoa giữa Hero và Services với animation */}
      <div 
        ref={transitionRef}
        className={`w-layout-blockcontainer container w-container mt-20 md:mt-24 lg:mt-30 mb-8 md:mb-12 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 md:translate-y-3'
        }`}
      >
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
          <p className="text-center text-sm md:text-base lg:text-lg text-gray-500 font-light italic whitespace-nowrap">
            {t.transitionText}
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
        </div>
      </div>
    </section>
  );
}

