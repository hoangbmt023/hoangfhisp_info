import React from 'react';
import SectionHeader from '../../components/common/SectionHeader';
import StatCounter from '../../components/common/StatCounter';
import SkillCard from '../../components/common/SkillCard';
import './Skills.css';

const Skills = () => {
  const statsData = [
    { value: "Java 21", label: "Core & Modern Backend" },
    { value: "Spring", label: "Boot, Security, JPA" },
    { value: "PostgreSQL", label: "Data Modeling & SQL" },
    { value: "UML / REST", label: "System Architecture" },
  ];

  const skillCardsData = [
    {
      category: "Ngôn Ngữ & Framework",
      icon: "☕",
      skills: [
        { name: "Java (Java 21 LTS / Clean Code)", level: 95 },
        { name: "Spring Boot & Spring Security", level: 92 },
        { name: "JPA / Hibernate ORM", level: 90 },
      ],
    },
    {
      category: "Cơ Sở Dữ Liệu",
      icon: "🐘",
      skills: [
        { name: "PostgreSQL Data Modeling", level: 90 },
        { name: "Query Optimization & Indexing", level: 88 },
        { name: "Database Schema Design & Migration", level: 86 },
      ],
    },
    {
      category: "Kiến Trúc Hệ Thống & Mô Hình Hóa",
      icon: "📐",
      skills: [
        { name: "RESTful APIs Architecture", level: 94 },
        { name: "UML Design (Use Case, Class, Sequence)", level: 92 },
        { name: "Microservices & Monolithic Patterns", level: 85 },
      ],
    },
    {
      category: "Quản Lý Dự Án & Công Cụ",
      icon: "📊",
      skills: [
        { name: "Microsoft Project (Resource Leveling/Loading)", level: 90 },
        { name: "Cost & Schedule Tracking (EVM / Milestone)", level: 88 },
        { name: "Risk Management & EMV Analysis", level: 86 },
      ],
    },
    {
      category: "Kỹ Năng Mềm & Tài Liệu Kỹ Thuật",
      icon: "🌐",
      skills: [
        { name: "Technical English (Đọc hiểu & biên soạn Specs)", level: 88 },
        { name: "Phân Tích Nghiệp Vụ & Yêu Cầu Kỹ Thuật", level: 90 },
        { name: "Git Workflow & Team Collaboration", level: 92 },
      ],
    },
  ];

  return (
    <section id="skills" className="narrative-chapter-section alt-bg skills-section">
      <div className="chapter-inner-container">
        <SectionHeader
          chapter="CHAPTER 02"
          title="KỸ NĂNG CHUYÊN MÔN"
          subtitle="Kỷ luật trong tư duy kỹ thuật, vững vàng nền tảng hệ thống và quản trị dự án."
        />

        <StatCounter stats={statsData} />

        <div className="skills-grid-wrapper">
          {skillCardsData.map((card, idx) => (
            <SkillCard
              key={idx}
              category={card.category}
              icon={card.icon}
              skills={card.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
