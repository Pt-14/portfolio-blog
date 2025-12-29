'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { useState, Suspense } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Service Item Component with animation
function ServiceItem({ service, index }: { service: { title: string; description: string; href: string }, index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      role="listitem" 
      className={`w-dyn-item transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        minHeight: 'fit-content',
        transitionDelay: `${200 + index * 100}ms`
      }}
    >
      <div className="services-box-container h-full">
        <div className="heading-animation-trigger">
          <div className="animation-content">
            <div className="services-title">{service.title}</div>
          </div>
        </div>
        <div className="div-block-24">
          <div className="animation-image-swipe-reveal _2em-width">
            <Image
              src="https://cdn.prod.website-files.com/651aa8b4feb6490e2b81db9a/651ab09b11b4ed7aadd49365_services-decor.svg"
              alt=""
              width={32}
              height={32}
              loading="lazy"
              className="services-decoration-image"
            />
            <div className="animation-image-swipe-reveal-overlay more-width"></div>
          </div>
          <p className="text-md">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();

  const translations = {
    vi: {
      title: "Tôi Có Thể Làm Gì Cho Bạn",
      description: "Với niềm đam mê thiết kế và phát triển giao diện, tôi hướng đến việc tạo ra những giao diện đẹp mắt, trực quan và mang đến trải nghiệm người dùng chất lượng.",
      services: [
        {
          title: "Frontend Development",
          description: "Xây dựng giao diện hiện đại, chất lượng cao với code sạch và tương tác mượt mà, mang lại trải nghiệm người dùng nhanh chóng và đáng tin cậy.",
          href: "#"
        },
        {
          title: "UI/UX Design",
          description: "Thiết kế giao diện người dùng đẹp mắt và trực quan, tập trung vào trải nghiệm người dùng và tính khả dụng của sản phẩm.",
          href: "#"
        },
        {
          title: "Responsive Design",
          description: "Đảm bảo website hiển thị và hoạt động mượt mà trên mọi kích thước màn hình, từ desktop đến thiết bị di động.",
          href: "#"
        },
        {
          title: "Web Animation",
          description: "Thêm các hiệu ứng animation mượt mà và chuyên nghiệp để làm cho website trở nên sinh động và thu hút hơn.",
          href: "#"
        }
      ]
    },
    en: {
      title: "What I Can Do For You",
      description: "With a passion for designing and developing interfaces, I aim to create beautiful, intuitive interfaces that deliver quality user experiences.",
      services: [
        {
          title: "Frontend Development",
          description: "Build modern, high-quality interfaces with clean code smooth interactions, delivering fast and reliable user experiences.",
          href: "#"
        },
        {
          title: "UI/UX Design",
          description: "Design beautiful and intuitive user interfaces, focusing on user experience and product usability.",
          href: "#"
        },
        {
          title: "Responsive Design",
          description: "Ensure websites look and work seamlessly across all screen sizes, from desktop to mobile devices.",
          href: "#"
        },
        {
          title: "Web Animation",
          description: "Add smooth and professional animation effects to make websites more dynamic and engaging.",
          href: "#"
        }
      ]
    }
  };

  const t = translations[language];
  // Sử dụng file local từ public/models
  const splineSceneUrl = "/models/scene (1).splinecode";

  return (
    <section className="services-section section bottom-pading-66">
      <div className="container w-container">
        <div className="spacer-2em---24px"></div>
        <div className="section-header">
          <div className="page-header-container">
            <div className="heading-animation-trigger">
              <div className="animation-content">
                <h2 
                  ref={titleRef as React.RefObject<HTMLHeadingElement>}
                  className={`section-subtitle flex items-center transition-all duration-700 ease-out ${
                    titleVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  {t.title}
                  <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">.</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-1-3em---16px"></div>
        <div 
          ref={descRef as React.RefObject<HTMLDivElement>}
          className={`process-section-body-container transition-all duration-700 ease-out delay-100 ${
            descVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-md">{t.description}</p>
        </div>
        <div className="spacer-2em---24px"></div>
        
        {/* Layout: Services bên trái, 3D Spline absolute bên phải - Có thể đè lên chữ */}
        <div className="relative">
          {/* Services Content - Bên trái - Grid 2x2 */}
          <div className="w-dyn-list relative z-10 lg:pr-[45%]">
            <div 
              role="list" 
              className="collection-list w-dyn-items services-grid-2cols"
              style={{ gap: '1.5rem' }}
            >
              {t.services.map((service, index) => (
                <ServiceItem key={index} service={service} index={index} />
              ))}
            </div>
          </div>

          {/* 3D Spline Model - Absolute bên phải - Xích lên trên, không giới hạn, có thể đè lên chữ */}
          <div className="hidden lg:block absolute top-0 lg:-top-8 xl:-top-63 right-[-140px] w-[50%] lg:w-[55%] xl:w-[60%] h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-visible z-20">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-[#b16cea] rounded-full animate-spin"></div>
                  <div className="text-gray-400 text-sm">Loading 3D model...</div>
                </div>
              </div>
            )}
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center p-4">
                  <p className="text-gray-400 text-sm">Unable to load 3D model</p>
                </div>
              </div>
            ) : (
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              }>
                <Spline
                  scene={splineSceneUrl}
                  onLoad={() => {
                    setIsLoading(false);
                      setHasError(false);
                  }}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                    }}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </Suspense>
            )}
          </div>

          {/* 3D Model cho mobile - Hiển thị dưới services */}
          <div className="lg:hidden relative w-full h-[400px] md:h-[500px] mt-8 overflow-hidden">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-[#b16cea] rounded-full animate-spin"></div>
                  <div className="text-gray-400 text-sm">Loading 3D model...</div>
                </div>
              </div>
            )}
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center p-4">
                  <p className="text-gray-400 text-sm">Unable to load 3D model</p>
                </div>
              </div>
            ) : (
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              }>
              <Spline
                  scene={splineSceneUrl}
                onLoad={() => {
                  setIsLoading(false);
                  setHasError(false);
                }}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
              />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

