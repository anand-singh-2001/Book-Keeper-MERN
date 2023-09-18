import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
// import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
// import BooksCard from "../components/Home/BooksCard";
import { useBookContext } from "../Context/BookContext";
import CreateModal from "../components/Home/CreateModal";
import { BsArrowRight } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

const Books = () => {
  // const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  // const [showType, setShowType] = useState("table");
  const { books, fetchBooks } = useBookContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    //Getting the books for the specified user if logged in.
    // console.log(localStorage.getItem("email"));

    if (localStorage.getItem("token")) {
      fetchBooks();
      setLoading(false);
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, [fetchBooks, navigate]);

  const user = localStorage.getItem("email");

  return (
    <div className="p-4 books">
      <h1
        style={{
          fontSize: "25px",
          fontWeight: 900,
          textAlign: "center",
          color: "white",
          textShadow: "0px 0px 3px black",
        }}>
        Welcome {user}
      </h1>

      <div
        className="flex justify-end items-center "
        style={{ marginTop: "50px" }}>
        <div className="arrow">
          <p
            style={{
              fontSize: "20px",
              fontWeight: "700",
              paddingRight: "5px",
              color: "white",
              textShadow: "0px 0px 3px black",
            }}>
            Add a book
          </p>
          <BsArrowRight
            color="white"
            style={{ textShadow: "0px 0px 3px black" }}
          />
        </div>
        {/* <MdOutlineAddBox
          className="text-sky-400 text-4xl"
          onClick={() => setCreateModal(true)}
          style={{ cursor: "pointer" }}
          size={50}
        /> */}
        <BsFillPlusCircleFill
          onClick={() => setCreateModal(true)}
          style={{ cursor: "pointer" }}
          size={30}
          color="white"
          className="addBook"
        />
        {/* </Link> */}
      </div>
      {createModal === true && (
        <CreateModal
          onClose={() => {
            setCreateModal(false);
          }}
        />
      )}
      {loading ? <Spinner /> : <BooksTable books={books} />}
    </div>
  );
};

export default Books;
