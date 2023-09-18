import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import PropTypes from "prop-types";

const BookModal = ({ currBook, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className=" lg:w-[600px] md:w-[600px] sm:w-[800px] xs:w-[100vw] max-w-full h-[90vh] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2
          className="w-fit px-4 py-1 bg-red-300 rounded-lg"
          style={{ minHeight: "40px" }}>
          {currBook.publishYear}
        </h2>
        <h4 className="my-1 text-gray-500" style={{ minHeight: "40px" }}>
          {currBook._id}
        </h4>

        <div className="flex justify-start items-center-gap-x-2 min-h-[40px]">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="px-2">{currBook.title}</h2>
        </div>

        <div className="flex justify-start items-center gap-x-2 min-h-[40px]">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="px-2">{currBook.author}</h2>
        </div>
        <p className="my-2" style={{ overflowY: "scroll" }}>
          {currBook.description}
        </p>
      </div>
    </div>
  );
};

export default BookModal;

BookModal.propTypes = {
  currBook: PropTypes.node,
  onClose: PropTypes.ReactNode,
};
