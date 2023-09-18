// import mongoose from "mongoose";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //creating a schema
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, //provides the timestamps in our database.
  }
);

const User = mongoose.model("users", UserSchema); //takes the name for the model and the schema created.
User.createIndexes(); //checks if the property specified as unique in the schema are not repeated,i.e here more than one user with the same email cannot be created.
module.exports = User;
