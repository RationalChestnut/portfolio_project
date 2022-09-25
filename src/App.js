import { AppContainer } from "./App.styles";
import { Navbar } from "./components/NavigationBar/NavigationBar";
import { Content } from "./pages/Content";
import { Footer } from "./pages/Footer/Footer";
import { UpperContentContainer } from "./pages/Footer/Footer.styles";

function App() {
  return (
    <AppContainer>
      <UpperContentContainer>
        <Navbar />
        <Content />
      </UpperContentContainer>
      <Footer />
    </AppContainer>
  );
}

export default App;
