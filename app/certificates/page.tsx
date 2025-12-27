'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { X } from 'lucide-react';

const certificates = [
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
      vi: 'Ngày cấp: 02/12/2025',
      en: 'Issued: Dec 02, 2025',
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
      vi: 'Ngày cấp: 22/12/2025',
      en: 'Issued: Dec 22, 2025',
    },
    description: {
      vi: 'Khóa học JavaScript Essentials 2 giúp tôi hiểu sâu về objects, prototypes và inheritance. Tôi học được cách sử dụng classes, quản lý JSON, làm việc với Math object, regular expressions và lập trình bất đồng bộ với callbacks và iterators.',
      en: 'JavaScript Essentials 2 course helped me understand objects, prototypes, and inheritance deeply. I learned to use classes, manage JSON, work with Math object, regular expressions, and asynchronous programming with callbacks and iterators.',
    },
  },
  {
    id: 'networking-basics',
    image: '/images/certificate/NetworkingBasics.jpg',
    title: {
      vi: 'Networking Basics',
      en: 'Networking Basics',
    },
    issuer: {
      vi: 'Cisco Networking Academy',
      en: 'Cisco Networking Academy',
    },
    date: {
      vi: 'Ngày cấp: 21/11/2025',
      en: 'Issued: Nov 21, 2025',
    },
    description: {
      vi: 'Khóa học Networking Basics giúp tôi hiểu các khái niệm cơ bản về mạng máy tính, giao thức và cách giao tiếp trên mạng Ethernet. Tôi học được về địa chỉ IP (IPv4/IPv6), cách router kết nối mạng và cấu hình mạng không dây an toàn.',
      en: 'Networking Basics course helped me understand fundamental network concepts, protocols, and communication on Ethernet networks. I learned about IP addresses (IPv4/IPv6), how routers connect networks, and secure wireless network configuration.',
    },
  },
  {
    id: 'survival-thai',
    image: '/images/certificate/SurvivalThai.jpg',
    title: {
      vi: 'Survival Thai',
      en: 'Survival Thai',
    },
    issuer: {
      vi: 'Chulalongkorn University - CHULA MOOC',
      en: 'Chulalongkorn University - CHULA MOOC',
    },
    date: {
      vi: 'Ngày cấp: 16/09/2024',
      en: 'Issued: Sep 16, 2024',
    },
    description: {
      vi: 'Khóa học Survival Thai giúp tôi nắm vững các kỹ năng giao tiếp tiếng Thái cơ bản trong cuộc sống hàng ngày. Tôi học được cách chào hỏi, giới thiệu bản thân và sử dụng từ vựng trong các tình huống thực tế như mua sắm, ăn uống và hỏi đường.',
      en: 'Survival Thai course helped me master basic Thai communication skills for daily life. I learned greetings, self-introduction, and vocabulary for real situations like shopping, dining, and asking for directions.',
    },
  },
  {
    id: 'thai-on-campus',
    image: '/images/certificate/ThaionCampus.jpg',
    title: {
      vi: 'Thai on Campus',
      en: 'Thai on Campus',
    },
    issuer: {
      vi: 'Chulalongkorn University - CHULA MOOC',
      en: 'Chulalongkorn University - CHULA MOOC',
    },
    date: {
      vi: 'Ngày cấp: 17/09/2024',
      en: 'Issued: Sep 17, 2024',
    },
    description: {
      vi: 'Khóa học Thai on Campus giúp tôi phát triển kỹ năng tiếng Thái trong môi trường học thuật. Tôi học được các thuật ngữ chuyên ngành, cách diễn đạt trong lớp học và kỹ năng thảo luận, thuyết trình cũng như tương tác với giảng viên và bạn học.',
      en: 'Thai on Campus course helped me develop Thai language skills in academic settings. I learned specialized terminology, classroom expressions, and skills for discussions, presentations, and interactions with professors and classmates.',
    },
  },
];

export default function CertificatesPage() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="pt-16 min-h-screen bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#161513] mb-4">
              {language === 'vi' ? 'Chứng chỉ' : 'Certificates'}
            </h1>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="certificate-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
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

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cert.description[language]}
                  </p>
                </div>
              </div>
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
              alt="Certificate"
              width={1200}
              height={1600}
              className="object-contain max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
