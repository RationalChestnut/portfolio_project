import codeocityImage from "../../assets/codeocity.png";
import findsyImage from "../../assets/findsy.png";
import contactAiImage from "../../assets/contactai.png";
import climaImage from "../../assets/clima.png";
import codeupImage from "../../assets/codeup.png";
import extermaHate from "../../assets/extermahate.png";
import kawaii from "../../assets/kawaii.png";

export const projectsData = [
  {
    name: "Kawaii",
    image: kawaii,
    role: "Founder, Creator",
    highlights: [
      "Published Google & Apple App Store",
      "Generated $5,000+ in revenue",
      "7,000+ users",
      "1.5 million+ images generated",
    ],
    left: true,
    link: "https://kawaiiapp.net/",
  },
  {
    name: "Clima",
    image: climaImage,
    role: "Co-Creator",
    highlights: [
      "Won 2022 congressional hackathon",
      "Published Google & Apple App Store",
      "100+ users",
    ],
    link: "https://clima2022.netlify.app/",
    left: false,
  },
  {
    name: "Codeocity",
    image: codeocityImage,
    role: "Co-founder, Instructor",
    highlights: ["$11,500 revenue", "55 students taught"],
    link: "https://www.codeocity.org/",
    left: true,
  },
  {
    name: "CodeUp",
    image: codeupImage,
    role: "Founder, President",
    highlights: ["Taught 85 kids to code", "Raised $113"],
    link: "https://www.codeupnp.org/",
    left: false,
  },

  {
    name: "ContactAI",
    image: contactAiImage,
    role: "Founder, Creator",
    highlights: [
      "Used GPT-3 to generate text",
      "React Native, Node.js, Firebase",
    ],
    left: true,
  },
  {
    name: "Findsy",
    image: findsyImage,
    role: "Co-creator",
    highlights: [
      "Best environmental hackathon at Hack4Pan",
      "#1 at Educate Hacks 2022",
    ],
    link: "https://github.com/yxli001/Findsy",
    left: false,
  },
  {
    name: "ExtermaHate",
    image: extermaHate,
    role: "Co-Creator",
    highlights: ["Won 1st place at BrookCodes"],
    link: "https://detective-discord.netlify.app/",
    left: true,
  },
];
