import sudokuImage from "../../assets/sudokuGuessrImage.png";
import mealsToGo from "../../assets/mealsToGo.png";
import connectCode from "../../assets/connectCode.png";
import codeocity from "../../assets/codeocity.png";
import findsy from "../../assets/findsy.png";
export const projectsData = [
  {
    id: 1,
    name: "Codeocity",
    description: "A student-led company that teaches grade students to code",
    image: codeocity,
    color: "#65CA73",
    rotate: "clockwise",
    secondaryColor: "#4f9e5a",
    techList: ["CSS", "HTML", "React"],
    myRoleText: "Co-Founder and Instructor",
    highlightsList: ["18 Students Taught", "$4045 Revenue"],
    link: "https://github.com/yxli001/Codeocity",
  },
  {
    id: 2,
    name: "Connect Code",
    description: "An application to connect programmers around the world",
    image: connectCode,
    color: "#F74A6A",
    rotate: "counterclockwise",
    secondaryColor: "#c23851",
    techList: ["CSS", "HTML", "React", "Node JS"],
    myRoleText: "Co-Founder",
    highlightsList: ["Submitted for investment at Repl but was turned down :("],
    link: "https://github.com/RationalChestnut/Connect-Code",
  },
  {
    id: 3,
    name: "Findsy",
    description:
      "An app designed to help anyone start a local environmental movement/event",
    image: findsy,
    color: "#f759ff",
    rotate: "counterclockwise",
    secondaryColor: "#be45c4",
    techList: ["CSS", "HTML", "React", "Node JS"],
    myRoleText: "Co-Creator",
    highlightsList: [
      "Best environmental hack at Hack4Pan hackthon",
      "1st place at EducateHacks 2022",
    ],
    link: "https://github.com/yxli001/Findsy",
  },
  {
    id: 4,
    name: "Meals To Go",
    description: "An app built to allow people to find nearby resturants",
    image: mealsToGo,
    color: "#41c9f2",
    rotate: "clockwise",
    secondaryColor: "#34a7c9",
    techList: ["React Native", "Node JS"],
    myRoleText: "Creator",
    highlightsList: ["First major react native project"],
    link: "https://github.com/RationalChestnut/MealToGo",
  },
];
