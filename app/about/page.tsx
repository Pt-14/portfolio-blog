'use client';

import { Code, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
        title: "Tôi là ai?",
        content: [
          "Tôi là Trương Yến Phương, sinh viên năm 4 ngành Công nghệ Thông tin, chuyên ngành Công nghệ Phần mềm tại Đại học Công Nghệ TP.HCM (HUTECH). Tôi có niềm yêu thích với việc xây dựng các sản phẩm số, đặc biệt là những trải nghiệm web thân thiện và hiệu quả cho người dùng.",
          "Tôi tập trung vào Frontend Development kết hợp với UI/UX Design, bởi tôi tin rằng một sản phẩm tốt không chỉ hoạt động ổn định mà còn cần có giao diện trực quan và trải nghiệm người dùng mượt mà.",
          "Tôi có kinh nghiệm với nhiều công nghệ frontend, trong đó React, Next.js, TypeScript và JavaScript là những công cụ tôi sử dụng thường xuyên nhất. Tôi cũng sử dụng Figma trong quá trình thiết kế giao diện và xây dựng trải nghiệm người dùng.",
          "Bên cạnh đó, tôi có khả năng giao tiếp bằng nhiều ngôn ngữ khác nhau: Tiếng Việt (Bản ngữ), Tiếng Trung (Bản ngữ), Tiếng Anh (Thành thạo) và Tiếng Thái (Thành thạo), giúp tôi tự tin trong việc tiếp cận tài liệu chuyên ngành, trao đổi học thuật và sẵn sàng làm việc trong môi trường đa văn hóa khi có cơ hội.",
          "Hiện tại, tôi đang trong giai đoạn chuyển tiếp từ môi trường học tập sang thị trường việc làm và đang tìm kiếm cơ hội thực tập hoặc làm việc trong lĩnh vực Frontend Development để áp dụng kiến thức đã học và tiếp tục phát triển kỹ năng của mình."
        ]
      },
      skills: {
        title: "Kỹ năng & Công cụ",
        frontend: {
          title: "Frontend Development",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"]
        },
        design: {
          title: "UI/UX Design",
          items: ["Figma", "Design Systems", "User Research", "Prototyping", "Wireframing", "Visual Design"]
        },
        tools: {
          title: "Công cụ",
          items: ["Git", "VS Code", "Chrome DevTools", "Postman", "npm/yarn"]
        }
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
        title: "Who Am I?",
        content: [
          "I am Truong Yen Phuong, a 4th-year Information Technology student majoring in Software Engineering at Ho Chi Minh City University of Technology (HUTECH). I have a passion for building digital products, especially user-friendly and efficient web experiences.",
          "I focus on Frontend Development combined with UI/UX Design, because I believe that a good product needs not only stable functionality but also intuitive interface and smooth user experience.",
          "I have experience with various frontend technologies, where React, Next.js, TypeScript and JavaScript are the tools I use most frequently. I also use Figma in the process of designing interfaces and building user experiences.",
          "Besides that, I can communicate in several languages: Vietnamese (Native), Chinese (Native), English (Fluent) and Thai (Fluent), which helps me confidently access professional materials, engage in academic exchanges and be ready to work in multicultural environments when opportunities arise.",
          "Currently, I am in the transition phase from academic environment to the job market and am looking for internship or job opportunities in Frontend Development to apply my learned knowledge and continue developing my skills."
        ]
      },
      skills: {
        title: "Skills & Tools",
        frontend: {
          title: "Frontend Development",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"]
        },
        design: {
          title: "UI/UX Design",
          items: ["Figma", "Design Systems", "User Research", "Prototyping", "Wireframing", "Visual Design"]
        },
        tools: {
          title: "Tools",
          items: ["Git", "VS Code", "Chrome DevTools", "Postman", "npm/yarn"]
        }
      },
    }
  };

  const t = translations[language];

  return (
    <div className="pt-16 min-h-screen bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* About Me Title */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.hero.badge}
          </h1>
        </section>

        {/* About Content */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.about.title}</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            {t.about.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>


        {/* Skills & Tools */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            {t.skills.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend Development */}
            <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#b16cea] to-[#ff5e69] rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.skills.frontend.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.skills.frontend.items.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* UI/UX Design */}
            <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff5e69] to-[#ff8a56] rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.skills.design.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.skills.design.items.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff8a56] to-[#ffa84b] rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.skills.tools.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.skills.tools.items.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
