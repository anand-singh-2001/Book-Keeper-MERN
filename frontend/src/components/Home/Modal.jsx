import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const Modal = ({ book, handleBook, setBook }) => {
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value })); //Handle the type changes.
  };
  return (
    <div className="flex flex-col border-2 border-none rounded-xl h-[100%] w-full p-2 mx-[5px]">
      <div className=" min-h-[50px] flex items-center">
        <MdTitle className="text-red-300 text-2xl" />
        <input
          type="text"
          value={book.title}
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border-none outline-none  px-4 py-2 w-[70%] "
        />
      </div>
      <div className="min-h-[50px] flex items-center">
        <BiSolidUserCircle className="text-red-300 text-2xl" />
        <input
          type="text"
          value={book.author}
          name="author"
          placeholder="Author"
          onChange={handleChange}
          className="border-none outline-none px-4 py-2 w-[70%]"
        />
      </div>

      <div className=" min-h-[50px] flex items-center">
        <SlCalender className="text-red-300 text-2xl" />
        <input
          type="text"
          value={book.publishYear}
          name="publishYear"
          placeholder="Publish Year"
          onChange={handleChange}
          className="border-none outline-none px-4 py-2 w-[70%] "
        />
      </div>
      <div className=" flex items-start mt-[5px] h-[100%] ">
        <PiBookOpenTextLight className="text-red-300 text-2xl" />
        <textarea
          type="text"
          value={book.description}
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border-none outline-none px-4 py-2 w-[100%] h-[100%] overflow-y-auto"
        />
      </div>
      <button
        className="p-2 my-2 bg-sky-300 m-4 rounded-xl w-[50%] mx-auto"
        onClick={handleBook}>
        Save
      </button>
    </div>
  );
};

export default Modal;
