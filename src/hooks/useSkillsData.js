import { useMemo } from "react";

// 1. Tự động quét và import toàn bộ ảnh nền trong thư mục skills/backgrounds
const bgModules = import.meta.glob(
  "../assets/images/skills/backgrounds/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" }
);
const SKILL_BG_IMAGES = Object.values(bgModules);

// 2. Tự động quét và import logo trong thư mục skills/core-technologies-frameworks
const frmModules = import.meta.glob(
  "../assets/images/skills/core-technologies-frameworks/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}",
  { eager: true, import: "default" }
);

// 3. Tự động quét và import logo trong thư mục skills/database-devops-tools
const dtbModules = import.meta.glob(
  "../assets/images/skills/database-devops-tools/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}",
  { eager: true, import: "default" }
);

/**
 * Ánh xạ tên định danh file thành tên hiển thị chuyên nghiệp
 */
export const getFriendlyName = (filename) => {
  const base = filename
    .substring(filename.lastIndexOf("/") + 1)
    .replace(/\.[^/.]+$/, "");

  const nameMap = {
    java: "Java",
    "spring-boot": "Spring Boot",
    react: "React",
    nodejs: "Node.js",
    js: "JavaScript",
    csharp: "C#",
    "c#": "C#",
    dotnet: ".NET",
    php: "PHP",
    python: "Python",
    vite: "Vite",
    docker: "Docker",
    git: "Git",
    github: "GitHub",
    gitlab: "GitLab",
    "mongo-db": "MongoDB",
    mongodb: "MongoDB",
    "my-sql": "MySQL",
    mysql: "MySQL",
    "portgre-sql": "PostgreSQL",
    postgresql: "PostgreSQL",
    postgres: "PostgreSQL",
    postman: "Postman",
    "sql-server": "SQL Server",
    sqlserver: "SQL Server",
  };

  if (nameMap[base.toLowerCase()]) return nameMap[base.toLowerCase()];

  return base
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

/**
 * Thuật toán xáo trộn Fisher-Yates
 */
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Cấp phát ảnh nền ngẫu nhiên từ backgrounds mà không lặp lại trước khi hết chu kỳ
 */
const generateSkillBgPhotos = (count) => {
  if (SKILL_BG_IMAGES.length === 0) return [];
  let pool = [];
  const result = [];
  while (result.length < count) {
    if (pool.length === 0) {
      pool = shuffleArray(SKILL_BG_IMAGES);
    }
    result.push(pool.pop());
  }
  return result;
};

// Chuẩn hóa danh sách thẻ kỹ năng cơ bản
const rawLeftCards = Object.entries(frmModules).map(([path, iconSrc]) => {
  const id = path.substring(path.lastIndexOf("/") + 1).replace(/\.[^/.]+$/, "");
  return {
    id,
    name: getFriendlyName(path),
    icon: iconSrc,
  };
});

const rawRightCards = Object.entries(dtbModules).map(([path, iconSrc]) => {
  const id = path.substring(path.lastIndexOf("/") + 1).replace(/\.[^/.]+$/, "");
  return {
    id,
    name: getFriendlyName(path),
    icon: iconSrc,
  };
});

/**
 * Hook quản lý toàn bộ dữ liệu thẻ kỹ năng và cấp phát ảnh nền ngẫu nhiên (SRP)
 */
export const useSkillsData = () => {
  const configuredLeftCards = useMemo(() => {
    const randomPhotos = generateSkillBgPhotos(rawLeftCards.length);
    return rawLeftCards.map((card, idx) => ({
      ...card,
      bgPhoto: randomPhotos[idx],
    }));
  }, []);

  const configuredRightCards = useMemo(() => {
    const randomPhotos = generateSkillBgPhotos(rawRightCards.length);
    return rawRightCards.map((card, idx) => ({
      ...card,
      bgPhoto: randomPhotos[idx],
    }));
  }, []);

  return {
    leftCards: configuredLeftCards,
    rightCards: configuredRightCards,
  };
};

export default useSkillsData;
