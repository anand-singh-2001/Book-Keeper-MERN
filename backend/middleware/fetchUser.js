const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";
const JWT_SECRET = "This is the secret token";

const fetchUser = (request, response, next) => {
  //Get the user from the jwt token and add id to request body
  const token = request.header("auth-token");
  // console.log("Request", token);
  if (!token) {
    response
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    request.user = data.user;
    next(); //run or execute the code after all the middleware function is finished.
  } catch (error) {
    response
      .status(401)
      .send({ error: "Please authenticate using a valid token xyz" });
  }
};
module.exports = fetchUser;
