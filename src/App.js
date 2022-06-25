import { Navbar } from "./components/navbar/Navbar";
import { IntroductionPage } from "./pages/introduction_page/IntroductionPage";
import { AboutMePage } from "./pages/about_me_page/AboutMePage";
import { ProjectsPage } from "./pages/projects_page/ProjectsPage";
import { Contact } from "./pages/contact/Contact";
function App() {
  return (
    <>
      <Navbar />
      <IntroductionPage />
      <div id="aboutContainer">
        <AboutMePage />
      </div>
      <div id="projectsContainer">
        <ProjectsPage />
      </div>
      <div id="contactContainer">
        <Contact />
      </div>
    </>
  );
}

export default App;
