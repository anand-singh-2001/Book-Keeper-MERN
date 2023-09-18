// import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useBookContext } from "../../Context/BookContext";
import BookModal from "./BookModal";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const BooksTable = () => {
  const { books } = useBookContext();
  // console.log(books);
  const [showModal, setShowModal] = useState(false);
  const [currBook, setCurrBook] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md backdrop-blur-md bg-black text-white">
              No.
            </th>
            <th className="border border-slate-600 rounded-md backdrop-blur-md bg-black text-white">
              Title
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden  backdrop-blur-md bg-black text-white">
              Author
            </th>{" "}
            {/**max-md:hidden class hides the content in screen size smaller than medium. */}
            <th className="border border-slate-600 rounded-md max-md:hidden  backdrop-blur-md bg-black text-white">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md  backdrop-blur-md bg-black text-white">
              Operations
            </th>
          </tr>
        </thead>

        <tbody>
          {books?.map((book, index) => (
            <tr key={book?._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center backdrop-blur-md bg-black text-white">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center backdrop-blur-md bg-black text-white">
                {book?.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden backdrop-blur-md bg-black text-white">
                {book?.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden backdrop-blur-md bg-black text-white">
                {book?.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center backdrop-blur-md bg-black text-white">
                <div className="flex justify-center gap-x-4">
                  <BsInfoCircle
                    className="text-2xl text-green-800"
                    onClick={() => {
                      setShowModal(true);
                      setCurrBook(book);
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  <AiOutlineEdit
                    className="text-2xl text-yellow-600"
                    onClick={() => {
                      setUpdateModal(true);
                      setCurrBook(book);
                    }}
                    style={{ cursor: "pointer" }}
                  />

                  <MdOutlineDelete
                    className="text-2xl text-red-600"
                    onClick={() => {
                      setDeleteModal(true);
                      setCurrBook(book);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books?.length === 0 && (
        <h1 className="text-3xl my-8 text-gray-400">
          Empty here.....add your favourites.
        </h1>
      )}

      {showModal === true && (
        <BookModal
          currBook={currBook}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}

      {deleteModal === true && (
        <DeleteModal
          currBook={currBook}
          onClose={() => {
            setDeleteModal(false);
          }}
        />
      )}

      {updateModal === true && (
        <UpdateModal
          currBook={currBook}
          onClose={() => {
            setUpdateModal(false);
          }}
        />
      )}
    </>
  );
};

export default BooksTable;
