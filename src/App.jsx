import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Libraries from "./pages/Libraries";
import LoginPage from "./pages/LoginPage";
import MyBooks from "./pages/MyBooks";
import BookDetail from "./pages/BookDetail";
import LibraryDetail from "./pages/LibraryDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/libraries" element={<Libraries />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/my_books" element={<MyBooks />} />
        <Route path="/books/:bookID" element={<BookDetail />} />
        <Route path="/library/:libraryID" element={<LibraryDetail />} />
      </Routes>
    </>
  );
};

export default App;
