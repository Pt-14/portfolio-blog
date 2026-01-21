'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { X, Github, ZoomIn, Code2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  // === ĐỒ ÁN CHUYÊN NGÀNH ===
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
      vi: 'Ứng dụng quản lý thuốc và nhắc nhở uống thuốc cho gia đình. PillPulse giúp người dùng không bao giờ quên uống thuốc với hệ thống nhắc nhở thông minh, quản lý lịch uống thuốc cho nhiều thành viên trong gia đình, và theo dõi lịch sử uống thuốc.',
      en: 'Medication management and reminder app for families. PillPulse helps users never forget to take their medicine with an intelligent reminder system, manages medication schedules for multiple family members, and tracks medication history.',
    },
    githubUrl: 'https://github.com/Pt-14/pillpulse',
    technologies: {
      vi: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
      en: ['Flutter', 'Dart', 'Node.js', 'MongoDB Atlas'],
    },
  },
  // === ĐỒ ÁN MÔN HỌC ===
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
      vi: 'Ứng dụng học ngôn ngữ di động được xây dựng với Flutter, giúp người dùng luyện tập từ vựng, ngữ pháp, quiz và flashcards. Sử dụng thuật toán Spaced Repetition (SM-2) để tối ưu hóa việc ôn tập và tích hợp speech recognition để luyện phát âm.',
      en: 'A mobile language learning app built with Flutter, helping users practice vocabulary, grammar, quizzes, and flashcards. Uses Spaced Repetition algorithm (SM-2) to optimize review sessions and integrates speech recognition for pronunciation practice.',
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
  // === ĐỒ ÁN CƠ SỞ ===
  {
    id: 'petbridge',
    image: '/images/projects/petbridge.png',
    title: {
      vi: 'PetBridge',
      en: 'PetBridge',
    },
    projectType: {
      vi: 'Đồ án cơ sở',
      en: 'Foundation Project',
    },
    description: {
      vi: 'Nền tảng kết nối cộng đồng yêu thú cưng, hỗ trợ nhận nuôi và tìm kiếm thú cưng thất lạc. PetBridge giúp người dùng đăng tin nhận nuôi, tìm kiếm thú cưng phù hợp và kết nối với các trại cứu hộ động vật.',
      en: 'A platform connecting pet lovers community, supporting pet adoption and finding lost pets. PetBridge helps users post adoption listings, search for suitable pets, and connect with animal rescue shelters.',
    },
    githubUrl: 'https://github.com/Pt-14/PetBridge',
    technologies: {
      vi: ['HTML', 'CSS', 'JavaScript', 'C#', 'SQL Server'],
      en: ['HTML', 'CSS', 'JavaScript', 'C#', 'SQL Server'],
    },
  },
  // === BÀI LUYỆN TẬP ===
  {
    id: 'youtube-clone',
    image: '/images/projects/youtube-clone.png',
    title: {
      vi: 'YouTube Clone',
      en: 'YouTube Clone',
    },
    projectType: {
      vi: 'Bài luyện tập',
      en: 'Practice Project',
    },
    description: {
      vi: 'Clone giao diện YouTube được xây dựng hoàn toàn bằng HTML và CSS thuần. Dự án bao gồm header với thanh tìm kiếm, sidebar điều hướng, và grid hiển thị video với thiết kế responsive cho desktop, tablet và mobile.',
      en: 'YouTube interface clone built entirely with pure HTML and CSS. The project includes header with search bar, navigation sidebar, and video grid with responsive design for desktop, tablet, and mobile.',
    },
    githubUrl: 'https://github.com/Pt-14/youtube-clone',
    technologies: {
      vi: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive'],
      en: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive'],
    },
  },
  {
    id: 'facebook-clone',
    image: '/images/projects/facebook-clone.png',
    title: {
      vi: 'Facebook Clone',
      en: 'Facebook Clone',
    },
    projectType: {
      vi: 'Bài luyện tập',
      en: 'Practice Project',
    },
    description: {
      vi: 'Clone giao diện Facebook với HTML và CSS, tái tạo lại các thành phần chính như header, sidebar, news feed và phần hiển thị bài đăng. Dự án giúp luyện tập kỹ năng layout và styling.',
      en: 'Facebook interface clone with HTML and CSS, recreating main components like header, sidebar, news feed, and post display section. Project helps practice layout and styling skills.',
    },
    githubUrl: 'https://github.com/Pt-14/Facebook-clone',
    technologies: {
      vi: ['HTML5', 'CSS3', 'Flexbox', 'Responsive'],
      en: ['HTML5', 'CSS3', 'Flexbox', 'Responsive'],
    },
  },
  {
    id: 'x-clone',
    image: '/images/projects/x-clone.png',
    title: {
      vi: 'X Clone',
      en: 'X Clone',
    },
    projectType: {
      vi: 'Bài luyện tập',
      en: 'Practice Project',
    },
    description: {
      vi: 'Clone giao diện X (Twitter) với HTML và CSS, tái tạo lại giao diện timeline, thanh điều hướng và các thành phần tweet. Dự án giúp nắm vững kỹ năng xây dựng giao diện mạng xã hội.',
      en: 'X (Twitter) interface clone with HTML and CSS, recreating timeline interface, navigation bar, and tweet components. Project helps master social media interface building skills.',
    },
    githubUrl: 'https://github.com/Pt-14/X-clone',
    technologies: {
      vi: ['HTML5', 'CSS3', 'Flexbox', 'Responsive'],
      en: ['HTML5', 'CSS3', 'Flexbox', 'Responsive'],
    },
  },
  {
    id: 'wanderia',
    image: '/images/projects/wanderia.png',
    title: {
      vi: 'Wanderia',
      en: 'Wanderia',
    },
    projectType: {
      vi: 'Bài luyện tập',
      en: 'Practice Project',
    },
    description: {
      vi: 'Dự án website du lịch với giao diện hiện đại, giúp người dùng khám phá các điểm đến, lên kế hoạch chuyến đi và tìm kiếm thông tin du lịch. Thiết kế tập trung vào trải nghiệm người dùng.',
      en: 'Travel website project with modern interface, helping users explore destinations, plan trips, and search for travel information. Design focuses on user experience.',
    },
    githubUrl: 'https://github.com/Pt-14/Wanderia',
    technologies: {
      vi: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
      en: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    },
  },
  {
    id: 'motovalor',
    image: '/images/projects/motovalor.png',
    title: {
      vi: 'Motovalor',
      en: 'Motovalor',
    },
    projectType: {
      vi: 'Bài luyện tập',
      en: 'Practice Project',
    },
    description: {
      vi: 'Dự án website về xe máy và phương tiện giao thông, cung cấp thông tin, đánh giá và so sánh các loại xe. Giao diện được thiết kế hiện đại và dễ sử dụng.',
      en: 'Motorcycle and vehicle website project, providing information, reviews, and comparisons of various vehicles. Interface designed to be modern and user-friendly.',
    },
    githubUrl: 'https://github.com/Pt-14/Motovalor',
    technologies: {
      vi: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
      en: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    },
  },
];

// Project Card Component with animation
function ProjectCard({
  project,
  language,
  index,
  onImageClick,
  isExpanded,
  onToggleDescription,
}: {
  project: (typeof projects)[0];
  language: string;
  index: number;
  onImageClick: (imageSrc: string) => void;
  isExpanded: boolean;
  onToggleDescription: () => void;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg group relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
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
        onClick={() => project.image && onImageClick(project.image)}
        className="relative w-full h-48 min-h-[192px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer block group/image"
      >
        <div className="relative w-full h-full flex items-center justify-center p-2">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title[language as 'vi' | 'en']}
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
                  const placeholder = document.createElement('div');
                  placeholder.className = 'flex flex-col items-center justify-center text-gray-400';
                  placeholder.innerHTML = '<svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg><span class="text-sm">No Preview</span>';
                  parent.appendChild(placeholder);
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <Code2 className="w-16 h-16 mb-2" strokeWidth={1.5} />
              <span className="text-sm">{language === 'vi' ? 'Chưa có ảnh' : 'No Preview'}</span>
            </div>
          )}
        </div>
        {project.image && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
            <div className="w-10 h-10 text-gray-700 bg-white/90 rounded-full p-2 shadow-lg flex items-center justify-center">
              <ZoomIn className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-[#161513]">
            {project.title[language as 'vi' | 'en']}
          </h3>
          {project.projectType && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-300 text-gray-800 rounded whitespace-nowrap">
              {project.projectType[language as 'vi' | 'en']}
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <p
            className={`text-sm text-gray-600 leading-relaxed break-words ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {project.description[language as 'vi' | 'en']}
          </p>
          <button
            onClick={onToggleDescription}
            className="text-xs font-medium mt-1 inline-block bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            {isExpanded
              ? language === 'vi'
                ? 'Thu gọn'
                : 'Show less'
              : language === 'vi'
                ? 'Xem thêm'
                : 'Read more'}{' '}
            →
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies[language as 'vi' | 'en'].map((tech, techIndex) => (
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
}

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

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

  return (
    <>
      <div className="pt-16 min-h-screen bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Header */}
          <div
            ref={headerRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#161513] mb-4">
              {language === 'vi' ? 'Dự án' : 'Projects'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'vi'
                ? 'Các dự án tôi đã thực hiện trong quá trình học tập và phát triển kỹ năng.'
                : 'Projects I have completed during my learning and skill development journey.'}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
                index={index}
                onImageClick={openModal}
                isExpanded={expandedProjects.has(project.id)}
                onToggleDescription={() => toggleProjectDescription(project.id)}
              />
            ))}
          </div>
        </div>
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
              alt="Project"
              width={1200}
              height={900}
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
