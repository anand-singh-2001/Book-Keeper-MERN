import { CircularProgress, Skeleton } from "@mui/material";
import { useBookContext } from "../../Context/BookContext";
import Spinner from "../Spinner";
import SingleBooks from "./SingleBooks";

const BooksTable = () => {
  const { books, loading } = useBookContext();
  // console.log(books);

  return (
    <div className="lg:w-[80%] md:w-[100%] sm:w-[90%] xs:w-[80%] h-[100%] item-center justify-center m-auto mt-[20px]">
      {loading ? (
        // <CircularProgress />
        // <Skeleton variant="rectangular" height={"50%"} />
        <Spinner />
      ) : (
        <div className="w-full m-[auto] my-2  grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1  border-separate border-spacing-2 cursor-pointer">
          {books?.map((book) => (
            <SingleBooks book={book} key={book._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksTable;
