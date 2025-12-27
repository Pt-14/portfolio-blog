'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '/', label: { vi: 'Trang chủ', en: 'Home' } },
  { href: '/certificates', label: { vi: 'Chứng chỉ', en: 'Certificates' } },
  { href: '/blog', label: { vi: 'Bài viết', en: 'Blog' } },
  { href: '/about', label: { vi: 'Giới thiệu', en: 'About' } },
];

function ContactButton() {
  const { language } = useLanguage();
  const buttonText = language === 'vi' ? "Liên hệ" : "Let's talk";

  return (
    <div className="relative overflow-hidden bg-[#161513] rounded-full group">
      <Link
        href="/contact"
        className="relative block text-[#f0f2f5] px-5 py-2.5 text-sm font-medium transition-colors duration-300 group-hover:text-white z-10"
      >
        {buttonText}
      </Link>
      <div className="absolute inset-0 bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
    </div>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button
        onClick={() => setLanguage('vi')}
        className={`transition-all duration-300 ${
          language === 'vi'
            ? 'text-[#161513]'
            : 'text-gray-400 hover:bg-gradient-to-r hover:from-[#b16cea] hover:via-[#ff5e69] hover:via-[#ff8a56] hover:to-[#ffa84b] hover:bg-clip-text hover:text-transparent'
        }`}
      >
        VI
      </button>
      <div className="w-px h-4 bg-gray-300"></div>
      <button
        onClick={() => setLanguage('en')}
        className={`transition-all duration-300 ${
          language === 'en'
            ? 'text-[#161513]'
            : 'text-gray-400 hover:bg-gradient-to-r hover:from-[#b16cea] hover:via-[#ff5e69] hover:via-[#ff8a56] hover:to-[#ffa84b] hover:bg-clip-text hover:text-transparent'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? 'top-4 left-20 right-20 rounded-2xl bg-[#f0f2f5]/60 backdrop-blur-xl border border-gray-200/50 shadow-lg'
          : 'top-0 left-0 right-0 rounded-none bg-[#f0f2f5]/95 backdrop-blur-xl border-b'
      }`}
      style={{
        borderColor: isScrolled ? undefined : 'var(--color--transparent)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 transition-all duration-700">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
              <span className="text-[28px] font-bold text-[#161513]">
                Fang.
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-base font-medium transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent'
                      : 'text-[#161513] hover:bg-gradient-to-r hover:from-[#b16cea] hover:via-[#ff5e69] hover:via-[#ff8a56] hover:to-[#ffa84b] hover:bg-clip-text hover:text-transparent'
                  }`}
                >
                  {link.label[language]}
                </Link>
              );
            })}
          </div>

          {/* Right: Contact Button + Language Switcher + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Contact Button */}
            <div className="hidden md:block">
              <ContactButton />
            </div>
            
            {/* Language Switcher */}
            <div className="hidden md:block ml-2">
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-base font-medium transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent'
                      : 'text-[#161513] hover:bg-gradient-to-r hover:from-[#b16cea] hover:via-[#ff5e69] hover:via-[#ff8a56] hover:to-[#ffa84b] hover:bg-clip-text hover:text-transparent'
                  }`}
                >
                  {link.label[language]}
                </Link>
              );
            })}
            <div className="px-4 py-2 flex items-center gap-3">
              <ContactButton />
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
