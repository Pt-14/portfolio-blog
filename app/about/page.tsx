'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutPage() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      hero: {
        badge: "About Me",
        title: "",
        name: "",
        subtitle: ""
      },
      about: {
        greeting: "// Xin chào! Tôi là",
        name: "Trương Yến Phương",
        university: "Đại học Công Nghệ TP.HCM • năm 4 chuyên ngành Công nghệ Phần mềm",
        quote: "Nơi thiết kế gặp code – biến ý tưởng thành trải nghiệm"
      },
      skills: {
        title: "Hãy xem các kỹ năng của tôi",
        webDesign: {
          title: "Web Design",
          items: ["UI/UX Design", "Responsive Design", "Wireframing", "User Research", "Design Systems"]
        },
        frontend: {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "HTML5/CSS3", "Tailwind CSS"]
        },
        backend: {
          title: "Backend",
          items: ["Node.js", "Express", "RESTful API", "MySQL", "MongoDB"]
        },
        softSkills: {
          title: "Kĩ năng mềm",
          items: ["Tiếng Trung (Bản ngữ)", "Tiếng Thái/Anh (Thành thạo)", "Giao tiếp hiệu quả", "Làm việc nhóm", "Học hỏi nhanh"]
        }
      },
      myJourney: {
        title: "Hành trình của tôi",
        content: [
          "Hành trình với mong muốn trở thành Frontend Developer của tôi bắt đầu vào năm 2021, trong thời gian tôi đang chọn chuyên ngành đại học. Giống như nhiều sinh viên khác, tôi cảm thấy không chắc chắn về hướng đi của mình cho đến khi tôi khám phá frontend development qua việc tìm hiểu trực tuyến, bị thu hút bởi sự kết hợp giữa logic, sáng tạo và thiết kế tập trung vào người dùng.",
          "Bước vào đại học đã mở ra nhiều cơ hội để tôi tiếp tục khám phá lĩnh vực này thông qua các khóa học, dự án cá nhân và tự học. Tôi đam mê xây dựng các sản phẩm số với trọng tâm là Frontend Development và UI/UX Design, kết hợp chức năng ổn định với giao diện trực quan và tôi sử dụng các công cụ như Figma để tạo ra những trải nghiệm người dùng mượt mà.",
          "Hiện tại, tôi đang trong giai đoạn chuyển tiếp từ môi trường học tập sang thị trường việc làm và đang tìm kiếm cơ hội thực tập hoặc công việc trong lĩnh vực Frontend Development để áp dụng kỹ năng, tích lũy kinh nghiệm thực tế và tiếp tục phát triển với tư cách là một lập trình viên."
        ]
      },
    },
    en: {
      hero: {
        badge: "About Me",
        title: "",
        name: "",
        subtitle: ""
      },
      about: {
        greeting: "// Hello, World! I am",
        name: "Truong Yen Phuong",
        university: "Ho Chi Minh City University of Technology • 4th-year Software Engineering",
        quote: "Where design meets code – turning ideas into experiences"
      },
      skills: {
        title: "Check my Skills",
        webDesign: {
          title: "Web Design",
          items: ["UI/UX Design", "Responsive Design", "Wireframing", "User Research", "Design Systems"]
        },
        frontend: {
          title: "Frontend",
          items: ["React", "Next.js", "TypeScript", "HTML5/CSS3", "Tailwind CSS"]
        },
        backend: {
          title: "Backend",
          items: ["Node.js", "Express", "RESTful API", "MySQL", "MongoDB"]
        },
        softSkills: {
          title: "Soft Skills",
          items: ["Chinese (Native)", "Thai/English (Fluent)", "Effective communication", "Teamwork", "Learning Agility"]
        }
      },
      myJourney: {
        title: "My Journey",
        content: [
          "My journey toward becoming a Frontend Developer began in 2021, during the time I was choosing my university major. Like many students, I felt uncertain about my direction until I discovered frontend development through online exploration, drawn to its mix of logic, creativity, and user-focused design.",
          "Entering university opened up opportunities for me to further explore this field through coursework, personal projects, and self-learning. I'm passionate about building digital products with a focus on Frontend Development and UI/UX Design, combining stable functionality with intuitive interfaces and I use tools like Figma to create seamless user experiences.",
          "Currently, I am in the transition phase from the academic environment to the job market and seeking internship or job opportunities in Frontend Development to apply my skills, gain practical experience, and continue growing as a developer."
        ]
      },
    }
  };

  const t = translations[language];
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: journeyRef, isVisible: journeyVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  return (
    <div className="pt-16 min-h-screen bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* About Content - 2 Column Layout */}
        <section 
          ref={aboutRef as React.RefObject<HTMLElement>}
          className={`mb-12 transition-all duration-700 ease-out ${
            aboutVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
            {/* Left Column - Avatar Image */}
            <div className="flex justify-center lg:justify-end pr-23">
              <img 
                src="/images/avatar/avatar.jpg" 
                alt={t.about.name}
                loading="lazy"
                className="w-full max-w-xs rounded-full border-5 border-gray-300 object-cover aspect-square shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Right Column - Introduction */}
            <div className="min-w-0 flex flex-col justify-center -ml-23">
              <p className="text-lg md:text-xl text-gray-600 font-medium mb-4">
                {t.about.greeting}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent leading-tight pb-1 mb-2 break-words">
                {t.about.name}
              </h2>
              <p className="text-base text-gray-600 mb-4">
                {t.about.university}
              </p>
              <div className="bg-gray-200 rounded-lg px-4 py-3 w-fit relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b]"></div>
                <p className="text-sm md:text-base text-gray-500 italic pl-2">
                  {t.about.quote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Journey Section */}
        <section 
          ref={journeyRef as React.RefObject<HTMLElement>}
          className={`mb-12 max-w-8xl mx-auto mt-23 transition-all duration-700 ease-out delay-200 ${
            journeyVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[36px] font-bold text-gray-900 mb-8">
            {t.myJourney.title}
            <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">.</span>
          </h2>
          <div className="prose prose-lg text-gray-700 space-y-4 text-left">
            {t.myJourney.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>


        {/* Skills */}
        <section 
          ref={skillsRef as React.RefObject<HTMLElement>}
          className={`max-w-8xl mx-auto transition-all duration-700 ease-out delay-300 ${
            skillsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[36px] font-bold text-gray-900 mb-8">
            {t.skills.title}
            <span className="bg-gradient-to-r from-[#b16cea] via-[#ff5e69] via-[#ff8a56] to-[#ffa84b] bg-clip-text text-transparent">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Web Design */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-[22px] font-bold text-gray-900 mb-4">{t.skills.webDesign.title}</h4>
              <div className="space-y-2">
                {t.skills.webDesign.items.map((item, index) => (
                  <p key={index} className="text-[16px] text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-[22px] font-bold text-gray-900 mb-4">{t.skills.frontend.title}</h4>
              <div className="space-y-2">
                {t.skills.frontend.items.map((item, index) => (
                  <p key={index} className="text-[16px] text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-[22px] font-bold text-gray-900 mb-4">{t.skills.backend.title}</h4>
              <div className="space-y-2">
                {t.skills.backend.items.map((item, index) => (
                  <p key={index} className="text-[16px] text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-[22px] font-bold text-gray-900 mb-4">{t.skills.softSkills.title}</h4>
              <div className="space-y-2">
                {t.skills.softSkills.items.map((item, index) => (
                  <p key={index} className="text-[16px] text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
