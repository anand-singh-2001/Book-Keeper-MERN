import { AiOutlineClose } from "react-icons/ai";
// import { PiBookOpenTextLight } from "react-icons/pi";
// import { BiUserCircle } from "react-icons/bi";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useBookContext } from "../../Context/BookContext";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const UpdateModal = ({ currBook, onClose }) => {
  const [book, setBook] = useState(currBook);
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  //   const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { updateBooks } = useBookContext();

  const handleEditBook = async (e) => {
    e.preventDefault();

    // if (
    //   !book.title ||
    //   !book.description ||
    //   !book.author ||
    //   !book.publishYear ||
    //   isNaN(book.publishYear)
    // ) {
    //   enqueueSnackbar("Please enter all the fields correctly.", {
    //     variant: "error",
    //   });
    // if (!book.title) {
    //   book.title = currBook.title;
    // } else if (!book.description) {
    //   book.description = currBook.description;
    // } else if (!book.author) {
    //   book.author = currBook.author;
    // } else if (!book.publishYear) {
    //   book.publishYear = currBook.publishYear;
    // } else {
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
      //   navigate("/book");
      onClose();
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        "Some error occured, please check the console for more info.",
        { variant: "error" }
      );
      // alert(`Some error occured, please check the console for more info.`);
      console.log(error);
    }
    // }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="lg:w-[600px] md:w-[600px] sm:w-[800px] xs:w-[95vw] max-w-full lg:h-[95vh] md:h-[95vh] xs:h-[90vh] sm:h-[90vh] min-h-[90vh] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-3xl my-4">Edit</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl h-[100%] lg:w-[500px] md:w-[500px] sm:w-[700px] xs:w-[90vw] p-4 mx-auto">
            <div className=" min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={book.title}
                name="title"
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className=" min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Author</label>
              <input
                type="text"
                value={book.author}
                name="author"
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full "
              />
            </div>
            <div className="min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500">Description</label>
              <textarea
                type="text"
                value={book.description}
                name="description"
                onChange={handleChange}
                style={{ overflowY: "scroll" }}
                className="border-2 border-gray-500 px-4 py-2 w-full h-[100px] "
              />
            </div>
            <div className="min-h-[50px]">
              <label className="text-xl mr-4 text-gray-500  ">
                Publish Year
              </label>
              <input
                type="text"
                name="publishYear"
                value={book.publishYear}
                onChange={handleChange}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>

            <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateModal;

UpdateModal.propTypes = {
  currBook: PropTypes.node,
  onClose: PropTypes.ReactNode,
};
