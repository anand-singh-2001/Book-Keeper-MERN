import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useBookContext } from "../../Context/BookContext";
import { useState } from "react";
import Spinner from "../Spinner";
import Modal from "./Modal";

const Update = ({ currBook, onClose }) => {
  const [book, setBook] = useState(currBook);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { updateBooks } = useBookContext();

  const handleEditBook = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateBooks(
        currBook._id,
        book.title,
        book.description,
        book.author,
        book.publishYear
      );
      setLoading(false);
      enqueueSnackbar("Book Edited Successfully", { variant: "success" });
      onClose();
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        "Some error occured, please check the console for more info.",
        { variant: "error" }
      );
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className=" lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[90vw] min-w-[350px] max-w-full h-[90%] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-3xl my-4">Edit</h1>
        {loading ? (
          <Spinner />
        ) : (
          <Modal book={book} setBook={setBook} handleBook={handleEditBook} />
        )}
      </div>
    </div>
  );
};

export default Update;

Update.propTypes = {
  currBook: PropTypes.node,
  onClose: PropTypes.ReactNode,
};
