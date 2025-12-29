'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const translations = {
  vi: {
    title: 'Liên hệ với tôi',
    description: 'Bạn có dự án thú vị? Muốn hợp tác hoặc làm việc cùng nhau? Hãy liên hệ qua form bên dưới và tôi sẽ phản hồi trong vòng 48 giờ.',
    nameLabel: 'Tên của bạn',
    namePlaceholder: 'Nhập tên của bạn',
    emailLabel: 'Địa chỉ Email',
    emailPlaceholder: 'Nhập email của bạn',
    messageLabel: 'Hãy cho tôi biết thêm về dự án bạn đang tìm kiếm?',
    submitButton: 'Gửi ngay',
    email: 'phuongtruong177853@gmail.com',
    phone: '+84 907-879-103'
  },
  en: {
    title: 'Get in touch',
    description: 'Have a project in mind? Looking to partner or work together? Reach out through the form and I\'ll get back to you in the next 48 hours.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    messageLabel: 'Tell me a bit more what you are looking for?',
    submitButton: 'Submit now',
    email: 'phuongtruong177853@gmail.com',
    phone: '+84 907-879-103'
  }
};

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add form submission logic here
  };

  return (
    <section className="contact-page-hero-section">
        <div className="w-layout-blockcontainer container w-container">
        <div className="contact-page-hero-wrap">
          <div className="contact-page-hero-content">
            <h1 
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className={`gradient is-text transition-all duration-700 ease-out ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {t.title}
            </h1>
            <div 
              ref={descRef as React.RefObject<HTMLDivElement>}
              className={`contact-page-hero-paragraph transition-all duration-700 ease-out delay-100 ${
                descVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="dark">
                {t.description}
              </p>
            </div>
            <div 
              className={`contact-page-contact-details transition-all duration-700 ease-out delay-200 ${
                descVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="contact-page-contact-item">
                <div className="contact-item-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                      fill="url(#gradient)"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b16cea" />
                        <stop offset="25%" stopColor="#ff5e69" />
                        <stop offset="50%" stopColor="#ff8a56" />
                        <stop offset="100%" stopColor="#ffa84b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="contact-item-text dark">{t.email}</div>
              </div>
              <div className="contact-page-contact-item">
                <div className="contact-item-icon-wrap">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                      fill="url(#gradient2)"
                    />
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b16cea" />
                        <stop offset="25%" stopColor="#ff5e69" />
                        <stop offset="50%" stopColor="#ff8a56" />
                        <stop offset="100%" stopColor="#ffa84b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="contact-item-text dark">{t.phone}</div>
              </div>
            </div>
          </div>
          <div 
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`contact-page-hero-form transition-all duration-700 ease-out delay-300 ${
              formVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <form
              id="email-form"
              name="email-form"
              onSubmit={handleSubmit}
              className="form-block w-form"
            >
              <label htmlFor="name" className="field-label dark">{t.nameLabel}</label>
              <input
                className="text-field w-input"
                maxLength={256}
                name="name"
                placeholder={t.namePlaceholder}
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email" className="field-label dark">{t.emailLabel}</label>
              <input
                className="text-field-two w-input"
                maxLength={256}
                name="email"
                placeholder={t.emailPlaceholder}
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="message" className="field-label text-area dark">
                {t.messageLabel}
              </label>
              <textarea
                placeholder=""
                maxLength={5000}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="textarea w-input"
              />

              <input
                type="submit"
                className="gradient-btn form-btn w-button"
                value={t.submitButton}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
