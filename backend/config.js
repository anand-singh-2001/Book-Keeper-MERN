require("dotenv").config();

const PORT = process.env.PORT;
// module.exports = PORT;
const mongoURL = process.env.MONGO_URI;
console.log("Mongo", mongoURL);
console.log("PORT", PORT);

// module.exports =mongoURL ;
module.exports = {
  PORT,
  mongoURL,
};
