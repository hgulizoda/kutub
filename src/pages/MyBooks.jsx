import { useQuery } from "@tanstack/react-query";
import { API } from "../api/api";
import useAuthStore from "../store/useAuthStore";
import BooksCardGrid from "../components/BooksCardGrid";

const MyBooks = () => {
  const { tokens } = useAuthStore();

  const {
    data: myBooks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await API.get("/libraries/library/books/", {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      console.log(res.data);
      return res.data;
    },
    enabled: !!tokens?.access,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;
  if (!myBooks.length) return <p>No books found</p>;

  return (
    <div>
      {myBooks.map((book) => (
        <BooksCardGrid key={book.id} {...book} />
      ))}
    </div>
  );
};

export default MyBooks;
