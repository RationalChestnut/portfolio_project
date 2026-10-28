import { Navigate, Route, Routes } from "react-router-dom";
import { Bookshelf } from "./pages/Bookshelf/Bookshelf";

// The whole site is the bookshelf; any other address leads back to it.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Bookshelf />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
