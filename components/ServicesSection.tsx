'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function ServicesSection() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      title: "Tôi Có Thể Làm Gì Cho Bạn",
      description: "Là một sinh viên đam mê thiết kế và phát triển giao diện, tôi tập trung vào việc tạo ra những giao diện web đẹp mắt, trực quan và mang lại trải nghiệm người dùng tuyệt vời.",
      services: [
        {
          title: "Frontend Development",
          description: "Phát triển giao diện web hiện đại với React, Next.js và TypeScript, tạo ra những ứng dụng web nhanh chóng và tương tác cao.",
          href: "#"
        },
        {
          title: "UI/UX Design",
          description: "Thiết kế giao diện người dùng đẹp mắt và trực quan, tập trung vào trải nghiệm người dùng và tính khả dụng của sản phẩm.",
          href: "#"
        },
        {
          title: "Responsive Design",
          description: "Tạo ra những website có thể hoạt động tốt trên mọi thiết bị, từ desktop đến mobile, đảm bảo trải nghiệm nhất quán.",
          href: "#"
        },
        {
          title: "Web Animation",
          description: "Thêm các hiệu ứng animation mượt mà và chuyên nghiệp để làm cho website trở nên sinh động và thu hút hơn.",
          href: "#"
        },
        {
          title: "Component Development",
          description: "Xây dựng các component có thể tái sử dụng, dễ bảo trì và mở rộng, giúp tăng hiệu quả phát triển.",
          href: "#"
        },
        {
          title: "Thiết kế giao diện",
          description: "Tạo ra các giao diện web hiện đại với bố cục hợp lý, màu sắc hài hòa và typography chuyên nghiệp.",
          href: "#"
        }
      ]
    },
    en: {
      title: "What I Can Do For You",
      description: "As a student passionate about designing and building user interfaces, I focus on creating beautiful, intuitive web interfaces that deliver exceptional user experiences.",
      services: [
        {
          title: "Frontend Development",
          description: "Develop modern web interfaces with React, Next.js and TypeScript, creating fast and highly interactive web applications.",
          href: "#"
        },
        {
          title: "UI/UX Design",
          description: "Design beautiful and intuitive user interfaces, focusing on user experience and product usability.",
          href: "#"
        },
        {
          title: "Responsive Design",
          description: "Create websites that work perfectly on all devices, from desktop to mobile, ensuring a consistent experience.",
          href: "#"
        },
        {
          title: "Web Animation",
          description: "Add smooth and professional animation effects to make websites more dynamic and engaging.",
          href: "#"
        },
        {
          title: "Component Development",
          description: "Build reusable, maintainable and scalable components that increase development efficiency.",
          href: "#"
        },
        {
          title: "Interface Design",
          description: "Create modern web interfaces with thoughtful layouts, harmonious colors and professional typography.",
          href: "#"
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <section className="section bottom-pading-66">
      <div className="container w-container">
        <div className="spacer-2em---24px"></div>
        <div className="section-header">
          <div className="page-header-container">
            <div className="heading-animation-trigger">
              <div className="animation-content">
                <h2 className="section-subtitle">{t.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-1-3em---16px"></div>
        <div className="process-section-body-container">
          <p className="text-md">{t.description}</p>
        </div>
        <div className="spacer-2em---24px"></div>
        <div className="w-dyn-list">
          <div role="list" className="collection-list w-dyn-items">
            {t.services.map((service, index) => (
              <div key={index} role="listitem" className="w-dyn-item">
                <div className="services-box-container">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

