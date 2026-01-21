'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, X, Github, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const certificates = [
  {
    id: 'gemini-certified-student',
    image: '/images/certificate/gemini_certificate.jpg',
    title: {
      vi: 'Gemini Certified Student',
      en: 'Gemini Certified Student',
    },
    issuer: {
      vi: 'Google for Education',
      en: 'Google for Education',
    },
    date: {
      vi: '2025',
      en: '2025',
    },
    description: {
      vi: 'Chứng chỉ Gemini Certified Student (University) chứng nhận tôi đã chứng minh được kiến thức, kỹ năng và năng lực cơ bản cần thiết để sử dụng Google AI. Chứng chỉ có giá trị đến 31/12/2028.',
      en: 'Gemini Certified Student (University) certificate demonstrates that I have proven the knowledge, skills, and basic competencies needed to use Google AI. Valid through 31/12/2028.',
    },
  },
  {
    id: 'javascript-essentials-1',
    image: '/images/certificate/JavaScriptEssentials1.jpg',
    title: {
      vi: 'JavaScript Essentials 1',
      en: 'JavaScript Essentials 1',
    },
    issuer: {
      vi: 'Cisco Networking Academy',
      en: 'Cisco Networking Academy',
    },
    date: {
      vi: '2025',
      en: '2025',
    },
    description: {
      vi: 'Khóa học JavaScript Essentials 1 giúp tôi nắm vững cú pháp cốt lõi, làm việc với biến, toán tử, điều khiển luồng và hàm. Tôi học được cách phân biệt các kiểu dữ liệu, phát triển tư duy thuật toán và thiết kế các chương trình JavaScript cơ bản.',
      en: 'JavaScript Essentials 1 course helped me master core syntax, working with variables, operators, flow control, and functions. I learned to distinguish data types, develop algorithmic thinking, and design basic JavaScript programs.',
    },
  },
  {
    id: 'javascript-essentials-2',
    image: '/images/certificate/JavaScriptEssentials2.jpg',
    title: {
      vi: 'JavaScript Essentials 2',
      en: 'JavaScript Essentials 2',
    },
    issuer: {
      vi: 'Cisco Networking Academy',
      en: 'Cisco Networking Academy',
    },
    date: {
      vi: '2025',
      en: '2025',
    },
    description: {
      vi: 'Khóa học JavaScript Essentials 2 giúp tôi hiểu sâu về objects, prototypes và inheritance. Tôi học được cách sử dụng classes, quản lý JSON, làm việc với Math object, regular expressions và lập trình bất đồng bộ với callbacks và iterators.',
      en: 'JavaScript Essentials 2 course helped me understand objects, prototypes, and inheritance deeply. I learned to use classes, manage JSON, work with Math object, regular expressions, and asynchronous programming with callbacks and iterators.',
    },
  },
];

// Featured projects shown on home page (3 main projects with images)
const projects = [
  {
    id: 'pillpulse',
    image: '/images/projects/pillpulse.png',
    title: {
      vi: 'PillPulse',
      en: 'PillPulse',
    },
    projectType: {
      vi: 'Đồ án chuyên ngành',
      en: 'Capstone Project',
    },
    description: {
      vi: 'Ứng dụng quản lý thuốc và nhắc nhở uống thuốc cho gia đình. PillPulse giúp người dùng không bao giờ quên uống thuốc với hệ thống nhắc nhở thông minh, quản lý lịch uống thuốc cho nhiều thành viên trong gia đình.',
      en: 'Medication management and reminder app for families. PillPulse helps users never forget to take their medicine with an intelligent reminder system, manages medication schedules for multiple family members.',
    },
    githubUrl: 'https://github.com/Pt-14/pillpulse',
    technologies: {
      vi: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
      en: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
    },
  },
  {
    id: 'circusverse',
    image: '/images/projects/circusverse.png',
    title: {
      vi: 'CircusVerse',
      en: 'CircusVerse',
    },
    projectType: {
      vi: 'Đồ án môn học',
      en: 'Course Project',
    },
    description: {
      vi: 'Ứng dụng học ngôn ngữ di động được xây dựng với Flutter, giúp người dùng luyện tập từ vựng, ngữ pháp, quiz và flashcards. Sử dụng thuật toán Spaced Repetition (SM-2) để tối ưu hóa việc ôn tập.',
      en: 'A mobile language learning app built with Flutter, helping users practice vocabulary, grammar, quizzes, and flashcards. Uses Spaced Repetition algorithm (SM-2) to optimize review sessions.',
    },
    githubUrl: 'https://github.com/Pt-14/circusverse',
    technologies: {
      vi: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
      en: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
    },
  },
  {
    id: 'gaumeo-shop',
    image: '/images/projects/gaumeoshop.png',
    title: {
      vi: 'GauMeo Shop',
      en: 'GauMeo Shop',
    },
    projectType: {
      vi: 'Đồ án môn học',
      en: 'Course Project',
    },
    description: {
      vi: 'Website thương mại điện tử cho cửa hàng thú cưng với giao diện hiện đại và thân thiện. Cung cấp đầy đủ các tính năng như danh mục sản phẩm, dịch vụ chăm sóc, hệ thống khuyến mãi và quản lý giỏ hàng.',
      en: 'E-commerce website for a pet shop with modern and friendly interface. Provides comprehensive features including product categories, pet care services, promotion system, and shopping cart management.',
    },
    githubUrl: 'https://github.com/Pt-14/GauMeo-shop',
    technologies: {
      vi: ['HTML', 'CSS', 'JavaScript', 'C#', 'SQL Server'],
      en: ['HTML', 'CSS', 'JavaScript', 'C#', 'SQL Server'],
    },
  },
];

export default function Home() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleProjectDescription = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const displayedCertificates = certificates.slice(0, 3);
  const { ref: certTitleRef, isVisible: certTitleVisible } = useScrollAnimation();

  // Certificate Card Component with animation
  const CertificateCard = ({ cert, index }: { cert: typeof certificates[0], index: number }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`certificate-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: `${index * 100}ms`
        }}
      >
        {/* Certificate Image */}
        <div
          className="relative w-full overflow-hidden bg-gray-50 cursor-pointer"
          onClick={() => openModal(cert.image)}
        >
          <Image
            src={cert.image}
            alt={cert.title[language]}
            width={400}
            height={533}
            className="object-contain w-full h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Certificate Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600 font-medium">
              {cert.issuer[language]}
            </p>
            <p className="text-xs text-gray-500">
              {cert.date[language]}
            </p>
          </div>

          <h3 className="text-xl font-bold text-[#161513] mb-4">
            {cert.title[language]}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {cert.description[language]}
          </p>
        </div>
      </div>
    );
  };

  // Project Card Component with animation
  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg group ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: `${index * 100}ms`
        }}
      >
        {/* GitHub Link - Top Right Corner */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-30 bg-white/90 hover:bg-gradient-to-r hover:from-[#b16cea] hover:via-[#ff5e69] hover:via-[#ff8a56] hover:to-[#ffa84b] rounded-full p-2 shadow-lg transition-all hover:scale-110 group/github"
            onClick={(e) => e.stopPropagation()}
            title={language === 'vi' ? 'Mã nguồn' : 'Source Code'}
          >
            <Github className="w-5 h-5 text-gray-700 group-hover/github:text-white transition-colors" />
          </a>
        )}

        {/* Project Image */}
        <div
          onClick={() => openModal(project.image)}
          className="relative w-full h-48 min-h-[192px] overflow-hidden bg-gray-50 cursor-pointer block group/image"
        >
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <Image
              src={project.image}
              alt={project.title[language]}
              width={400}
              height={300}
              unoptimized
              className="object-contain w-auto h-auto max-w-full max-h-full transition-transform duration-300 group-hover/image:scale-105"
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Preview</div>';
                }
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 text-gray-700 bg-white/90 rounded-full p-2 shadow-lg flex items-center justify-center">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-[#161513]">
              {project.title[language]}
            </h3>
            {project.projectType && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-300 text-gray-800 rounded whitespace-nowrap">
                {project.projectType[language]}
              </span>
            )}
          </div>

          <div className="relative mb-4">
            <p className={`text-sm text-gray-600 leading-relaxed break-words ${expandedProjects.has(project.id) ? '' : 'line-clamp-3'}`}>
              {project.description[language]}
            </p>
            <button
              onClick={() => toggleProjectDescription(project.id)}
              className="text-xs font-medium mt-1 inline-block bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {expandedProjects.has(project.id) 
                ? (language === 'vi' ? 'Thu gọn' : 'Show less') 
                : (language === 'vi' ? 'Xem thêm' : 'Read more')} →
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies[language].map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

        {/* Featured Certificates Section */}
      <section className="py-20 bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={certTitleRef as React.RefObject<HTMLDivElement>}
            className={`text-left mb-8 transition-all duration-700 ease-out ${
              certTitleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                {language === 'vi' ? 'Chứng chỉ' : 'Certificates'}
                <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCertificates.map((cert, index) => (
                <CertificateCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
          
          {/* All Certificates Button - positioned below grid, aligned to right of 3rd card */}
          <div className="mt-8 flex justify-end">
            <Link
                href="/certificates"
                className="group inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
            >
                <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">
                  {language === 'vi' ? 'Tất cả chứng chỉ' : 'All Certificates'}
                </span>
              <ArrowRight className="w-4 h-4 text-[#b16cea] transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="pt-4 pb-20 bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
              {language === 'vi' ? 'Hãy xem các dự án của tôi' : 'Check my Projects'}
              <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* All Projects Button */}
          <div className="mt-8 flex justify-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">
                {language === 'vi' ? 'Tất cả dự án' : 'All Projects'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#b16cea] transition-colors" />
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt={selectedImage.includes('certificate') ? 'Certificate' : 'Project'}
              width={1200}
              height={1600}
              unoptimized
              className="object-contain max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
    </div>
      )}
    </>
  );
}