import axios from "axios";
import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSnackbar } from "notistack";

const BookContext = createContext({});
// const host = "http://localhost:5555/books";

const host = import.meta.env.VITE_APP_HOST;

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookDetail, setBookDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  //Fetch all books for the current user:

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };
    try {
      const result = await axios.get(`${host}/fetchbooks`, {
        headers: headers,
      });

      const booksData = result.data.data;
      booksData.sort((a, b) => b.pinned - a.pinned);
      // console.log(json);
      setBooks(booksData);
    } catch (error) {
      // console.error(error);
      const err = error.response.data.errors;
      err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchBooks();
  }, []);

  //Adding a book:

  const addBooks = useCallback(
    async (title, description, author, publishYear) => {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };

      const data = { title, description, author, publishYear };

      try {
        const result = await axios.post(`${host}/addbooks`, data, {
          headers: headers,

          //Things passed to backend as body.
        });

        const json = result.data;
        // console.log(json);

        setBooks((prev) => [...prev, json]); //Adding the book received to the books array.
      } catch (error) {
        console.error(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
        throw new Error(error);
      }
    },
    [enqueueSnackbar]
  );

  //Delete a book:
  //Backend logic:
  const deleteBooks = useCallback(
    async (id) => {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };

      try {
        const result = await axios.delete(`${host}/deletebook/${id}`, {
          headers: headers,
        });
        // const json = result.data;
        // console.log(json);

        //Frontend Logic:
        // console.log("Deleting the book with id:" + id);
        setBooks((prev) => prev.filter((book) => book._id !== id));
      } catch (error) {
        console.error(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
      }
    },
    [enqueueSnackbar]
  );

  //Edit a book:
  //Backend logic:
  const updateBooks = useCallback(
    async (id, title, description, author, publishYear) => {
      const headers = {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      };
      const data = { title, description, author, publishYear };

      try {
        const result = await axios.put(`${host}/updatebook/${id}`, data, {
          headers: headers,
        });

        // const json = result.data;
        // console.log(json);

        setBooks((prev) => {
          //Frontend logic:
          let newBook = [...prev]; //Creating a shallow copy of books. Helps to change the content on the frontend without refreshing.Without making a copy, we need to refresh the page in order to see changes.

          for (let i = 0; i < books.length; i++) {
            const element = books[i];

            if (element._id === id) {
              newBook[i].title = title;
              newBook[i].description = description;
              newBook[i].author = author;
              newBook[i].publishYear = publishYear;
            }
          }
          return newBook;
        });
      } catch (error) {
        console.log(error);
        const err = error.response.data.errors;
        err.forEach((er) => enqueueSnackbar(er.msg, { variant: "error" }));
        throw new Error(error);
      }
    },
    [books, enqueueSnackbar]
  );

  const setPinned = useCallback(async (book) => {
    const headers = {
      "Content-type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };
    // console.log(book._id);
    try {
      await axios.put(`${host}/updatebook/${book._id}`, book, {
        headers,
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const updatePinned = useCallback(
    async (book) => {
      setBooks((prev) => {
        const clone = [...prev];
        const index = clone.findIndex((item) => item._id === book._id);
        if (index !== -1) {
          clone[index] = book;
        }
        clone.sort((a, b) => b.pinned - a.pinned);
        return clone;
      });
      await setPinned(book);
    },
    [setPinned]
  );

  const value = useMemo(
    () => ({
      books,
      loading,
      fetchBooks,
      addBooks,
      deleteBooks,
      updateBooks,
      bookDetail,
      updatePinned,
    }),
    [
      books,
      fetchBooks,
      addBooks,
      deleteBooks,
      updateBooks,
      loading,
      bookDetail,
      updatePinned,
    ]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export default BookContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useBookContext = () => {
  return useContext(BookContext);
  // console.log(context);
};

BookContextProvider.propTypes = { children: PropTypes.node };
