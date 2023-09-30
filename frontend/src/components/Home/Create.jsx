import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useBookContext } from "../../Context/BookContext";
import { useState } from "react";
import Spinner from "../Spinner";
import Modal from "./Modal";

const Create = ({ onClose }) => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { addBooks } = useBookContext();

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (
      !book.title ||
      !book.description ||
      !book.author ||
      !book.publishYear ||
      isNaN(book.publishYear)
    ) {
      enqueueSnackbar("Please fill all the fields correctly.", {
        variant: "error",
      });
    } else {
      try {
        setLoading(true);

        await addBooks(
          book.title,
          book.description,
          book.author,
          book.publishYear
        ); //sending these to the addbooks function in the context to get the value.

        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        onClose();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[90vw] min-w-[350px] max-w-full h-[90%] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="text-3xl my-3">Create</h1>

        <div className="flex flex-col border-2 border-none rounded-xl h-[100%] lg:w-[500px] md:w-[500px] sm:w-[700px] xs:w-[90vw] min-w-[320px] p-2 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <Modal book={book} setBook={setBook} handleBook={handleSaveBook} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;

Create.propTypes = { currBook: PropTypes.node, onClose: PropTypes.node };
