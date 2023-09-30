const express = require("express");
const Book = require("../models/BookModel");
const fetchUser = require("../middleware/fetchUser");
const { validationResult, body } = require("express-validator");
const router = express.Router();

//Route for adding a new book:
router.post(
  "/addbooks",
  fetchUser,
  [
    body("title", "Title must contain atleast 3 characters.").isLength({
      min: 3,
    }), //checks and validation messages

    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("author", "Author name must be atleast 3 characters long").isLength({
      min: 3,
    }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).send({ errors: errors.array() });
      }

      const { title, author, description, publishYear, pinned } = request.body;

      console.log("UserId", request.user.id);
      const user = request.user.id;

      const book = await Book.create({
        title,
        author,
        description,
        publishYear,
        pinned,
        user,
      }); //creating a new book.

      return response.status(201).send(book);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  }
);

//Route for getting all the books from the database for the specific user:

router.get("/fetchbooks", fetchUser, async (request, response) => {
  try {
    const books = await Book.find({ user: request.user.id }); //getting all the books from the database.

    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//Route to update an existing book:

router.put("/updatebook/:id", fetchUser, async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.description
    ) {
      return response.status(
        (400).send({ message: `Please fill all the required fields` })
      );
    }
    const { id } = request.params;
    // console.log("paramId", id);

    //Checking if the book exists
    const book = await Book.findById(id);
    console.log("BookId", book);
    if (!book) {
      return response.status(404).send({ message: "Book not found." });
    }

    //Checking if the book belongs to the current user:
    if (book.user !== request.user.id) {
      return response.status(401).send({ message: "Not Authorised." });
    }

    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    }); //request.body is the passed as it will be used to update the specific book. new:true- shows the updated book rather than the previous one.

    // if (!result) {
    //   return response.status(404).send({ message: `Book not found` });
    // }
    return response.status(200).send({ message: `Book updated successfuly` });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book:

router.delete("/deletebook/:id", fetchUser, async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    //Checking if the book exists:
    if (!book) {
      return response.status(404).send({ message: `Book not found` });
    }
    //Checking if the book belongs to the user:
    if (book.user.toString() !== request.user.id) {
      return response.status(401).send({ message: `Not Authorised` });
    }

    const result = await Book.findByIdAndDelete(id);

    return response.status(200).send({ message: `Book deleted successfuly` });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
