import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Libraries from "./pages/Libraries";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/libraries" element={<Libraries />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
