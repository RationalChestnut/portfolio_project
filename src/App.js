import { AppContainer } from "./App.styles";
import { Navbar } from "./components/NavigationBar/NavigationBar";
import { Content } from "./pages/Content";

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Content />
    </AppContainer>
  );
}

export default App;
