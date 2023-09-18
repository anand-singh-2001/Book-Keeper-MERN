// import mongoose from "mongoose";
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    user: {
      //connecting or referencing the model with the user model. Now we can store a user here.
      type: String,
      ref: "users",
    },
    //creating a schema
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, //provides the timestamps in our database.
  }
);

const Book = mongoose.model("books", BookSchema); //takes the name for the model and the schema created.
module.exports = Book;
