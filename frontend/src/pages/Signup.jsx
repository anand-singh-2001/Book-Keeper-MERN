import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import Spinner from "../components/Spinner";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { GiHouseKeys } from "react-icons/gi";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  let navigate = useNavigate(); //useNavigate hook

  const { name, email, password } = credentials; //Destructuring.

  const handleClick = async (e) => {
    e.preventDefault(); //Prevents refresh.
    //Checking if user exists:
    setLoading(true);

    const headers = { "Content-Type": "application/json" };
    const data = { name, email, password };
    try {
      const response = await axios.post(
        "http://localhost:5555/users/createUser",
        data,
        {
          headers: headers,

          //Things passed to backend as body for authentication.
        }
      );
      const json = response.data;
      // console.log(json);
      localStorage.setItem("token", json.authtoken);
      enqueueSnackbar("Account Created successfully.", { variant: "success" });

      navigate("/");
    } catch (er) {
      console.error(er);
      if (er.response.data.errors) {
        const err = er.response.data.errors;
        err.forEach((errmsg) =>
          enqueueSnackbar(errmsg.msg, { variant: "error" })
        );
      } else {
        enqueueSnackbar(er.response.data.error, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //Allows typing in the fields.
  };
  return (
    <div className="signup">
      <h2
        style={{
          margin: "20px auto",
          fontSize: "30px",
          fontWeight: 700,
          marginTop: "50px",
          color: "white",
          textShadow: "0px 0px 3px black",
        }}>
        Create an account to store your Books
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <form className="signup_form">
          <div className="signup_labels">
            {/* <label htmlFor="name" className="label">
              Name :
            </label> */}
            <BsPersonCircle size={30} color="white" />
            <input
              type="text"
              className="input"
              id="name"
              name="name"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter name."
            />
          </div>
          <div className="signup_labels">
            {/* <label htmlFor="email" className="label">
              Email address :
            </label> */}
            <MdEmail size={30} color="white" />
            <input
              type="email"
              className="input"
              id="email"
              name="email"
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Enter email."
            />
          </div>

          <div className="signup_labels">
            {/* <label htmlFor="password" className="label">
              Password :
            </label> */}
            <FaKey size={30} color="white" />
            <input
              type="password"
              className="input"
              id="password"
              name="password"
              onChange={handleChange}
              minLength={5}
              placeholder="Enter password"
            />
          </div>
          <div className="signup_labels">
            {/* <label htmlFor="cpassword" className="label">
              Confirm Password :
            </label> */}
            <GiHouseKeys size={30} color="white" />
            <input
              type="password"
              className="input"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
              minLength={5}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="submit-btn" onClick={handleClick}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
