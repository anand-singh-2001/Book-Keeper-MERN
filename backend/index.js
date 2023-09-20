const express = require("express");
const { PORT, mongoURL } = require("./config");
const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

//CORS policy handling:
// Allow all the Originis with default of cors(*)
app.use(cors());

// OR allow custom origins:
// app.use(
//   cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
//   })
// )

app.use(express.json()); //using middleware so that the request.body can recognise the express server.

app.use("/books", booksRoute); //tells express that for each request with prefix of books handle them with /books middleware.
app.use("/users", userRoutes);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack");
}); //get is an http method to get resource from the server. takes the first parameter as a string for our route, the second one is a callback to deal with the response and request
console.log("MongoURL", mongoURL);
mongoose
  .connect(mongoURL) //connecting the database
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      //running the express server only if the database connection is successful
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
