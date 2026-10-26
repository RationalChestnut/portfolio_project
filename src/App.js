import { Route, Routes, useLocation } from "react-router-dom";
import { AppContainer } from "./App.styles";
import { Navbar } from "./components/NavigationBar/NavigationBar";
import { About } from "./pages/About/About";
import { Bookshelf } from "./pages/Bookshelf/Bookshelf";
import { Placeholder } from "./pages/Placeholder/Placeholder";

function App() {
  const { pathname } = useLocation();

  return (
    <AppContainer>
      {pathname !== "/bookshelf" && <Navbar />}
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/writing" element={<Placeholder title="Writing" />} />
        <Route path="/projects" element={<Placeholder title="Projects" />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
