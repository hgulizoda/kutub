import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Libraries from "./pages/Libraries";
import LoginPage from "./pages/LoginPage";
import MyBooks from "./pages/MyBooks";
import BookDetail from "./pages/BookDetail";
import LibraryDetail from "./pages/LibraryDetail";
import UserProfile from "./pages/UserProfile";
import UserLayout from "./components/UserLayout";
import LibraryRegistrationForm from "./pages/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route
            path="/library/:libraryID/:libraryName"
            element={<LibraryDetail />}
          />
          <Route path="/books/:bookID" element={<BookDetail />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<LibraryRegistrationForm />} />
        <Route element={<UserLayout />}>
          <Route path="/profile/my_books" element={<MyBooks />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
