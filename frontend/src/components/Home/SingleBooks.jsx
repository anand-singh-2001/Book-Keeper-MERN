import React, { useState } from "react";
import { BsPinAngleFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MdOutlineDelete } from "react-icons/md";
import { useBookContext } from "../../Context/BookContext";
import Update from "./Update";
import Delete from "./Delete";

const SingleBooks = ({ book }) => {
  // const [showModal, setShowModal] = useState(false);
  const [currBook, setCurrBook] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const { updatePinned } = useBookContext();

  const handlePinned = (book) => {
    // console.log(book._id);
    if (book.pinned) {
      book.pinned = false;
    } else {
      book.pinned = true;
    }

    updatePinned(book);
  };

  return (
    <>
      <Box style={{ width: "fit-content", margin: "20px auto" }}>
        <Card
          variant="outlined"
          sx={{
            background: "none",
            backgroundColor:
              "rgb(" +
              Math.floor(Math.random() * (256 - 100) + 100) +
              "," +
              Math.floor(Math.random() * (256 - 100) + 100) +
              "," +
              Math.floor(Math.random() * (256 - 100) + 100) +
              ")",

            color: "black",
            border: "1px solid white",
            borderRadius: "8px",
            backdropFilter: "brightness(150%)",
            height: "280px",
            width: "200px",
            boxShadow: "5px 4px #e0d4d4",
          }}>
          <CardActions
            sx={{
              textShadow: "0 0 3px white",
              cursor: "pointer",
              zIndex: 20,
            }}>
            <Button size="small">
              {" "}
              <BsPinAngleFill
                className={
                  book.pinned ? "text-2xl text-black" : "text-2xl text-white"
                }
                onClick={() => {
                  // setCurrBook(book)
                  handlePinned(book);
                }}
              />
            </Button>
          </CardActions>

          <CardContent
            sx={{
              cursor: "pointer",
              height: "95%",
              marginTop: "-15px",
              padding: "0px 5px !important",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
              fontWeight: 900,
            }}
            onClick={() => {
              setUpdateModal(true);
              setCurrBook(book);
            }}>
            <Typography sx={{ fontSize: "30px" }} gutterBottom>
              {book?.title}
            </Typography>
            <Typography sx={{ fontSize: "20px", marginTop: "100px" }}>
              {book?.author}
            </Typography>

            <Typography
              sx={{
                paddingTop: "5px",
                fontSize: "20px",
                padding: "0 10px",
              }}>
              {book?.publishYear}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              marginTop: "-80px",
              textShadow: "0 0 3px white",
              zIndex: 20,
            }}>
            <Button size="small">
              <MdOutlineDelete
                className="text-2xl text-black"
                onClick={() => {
                  setDeleteModal(true);
                  setCurrBook(book);
                }}
                style={{
                  cursor: "pointer",
                }}
              />
            </Button>
          </CardActions>
        </Card>
      </Box>

      {deleteModal === true && (
        <Delete
          currBook={currBook}
          onClose={() => {
            setDeleteModal(false);
          }}
        />
      )}

      {updateModal === true && (
        <Update
          currBook={currBook}
          onClose={() => {
            setUpdateModal(false);
          }}
        />
      )}
    </>
  );
};

export default SingleBooks;
