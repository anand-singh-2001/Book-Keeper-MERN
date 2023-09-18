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

// -------------------Render Deployment----------------------------------------

const __dirname1 = path.resolve(); //the variable signifies the current working directory.

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "./frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack");
  });
}

// -------------------Render Deployment----------------------------------------
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
