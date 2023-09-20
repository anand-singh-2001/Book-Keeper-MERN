import { AiOutlineClose } from "react-icons/ai";
// import { PiBookOpenTextLight } from "react-icons/pi";
// import { BiUserCircle } from "react-icons/bi";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useBookContext } from "../../Context/BookContext";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const CreateModal = ({ onClose }) => {
  const [books, setBooks] = useState({
    title: "",
    description: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { addBooks } = useBookContext();

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (
      !books.title ||
      !books.description ||
      !books.author ||
      !books.publishYear ||
      isNaN(books.publishYear)
    ) {
      enqueueSnackbar("Please fill all the fields correctly.", {
        variant: "error",
      });
    } else {
      try {
        setLoading(true);

        await addBooks(
          books.title,
          books.description,
          books.author,
          books.publishYear
        ); //sending these to the addbooks function in the context to get the value.

        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        // navigate("/books");
        onClose();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      // console.log(error);
    }
  };

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value })); //Handle the type changes.
  };
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="lg:w-[600px] md:w-[600px] sm:w-[800px] xs:w-[100vw] max-w-full h-[95vh] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h1 className="text-3xl my-3">Create</h1>

        <div className="flex flex-col border-2 border-sky-400 rounded-xl h-[100%] lg:w-[500px] md:w-[500px] sm:w-[700px] xs:w-[90vw] min-w-[320px] p-4 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className=" min-h-[50px]">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input
                  type="text"
                  value={books.title}
                  name="title"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="min-h-[50px]">
                <label className="text-xl mr-4 text-gray-500">Author</label>
                <input
                  type="text"
                  value={books.author}
                  name="author"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className=" min-h-[50px]">
                <label className="text-xl mr-4 text-gray-500">
                  Description
                </label>
                <textarea
                  type="text"
                  value={books.description}
                  name="description"
                  onChange={handleChange}
                  style={{ overflowY: "scroll" }}
                  className="border-2 border-gray-500 px-4 py-2 w-full h-[100px]"
                />
              </div>
              <div className=" min-h-[50px]">
                <label className="text-xl mr-4 text-gray-500">
                  Publish Year
                </label>
                <input
                  type="text"
                  value={books.publishYear}
                  name="publishYear"
                  onChange={handleChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full "
                />
              </div>
              <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

CreateModal.propTypes = { currBook: PropTypes.node, onClose: PropTypes.node };
