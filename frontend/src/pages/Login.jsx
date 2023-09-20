import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import Spinner from "../components/Spinner";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      //Checking if user exists:
      setLoading(true);
      if (!credentials.email || !credentials.password) {
        enqueueSnackbar("Please fill all the fields correctly", {
          variant: "error",
        });
      }

      const data = { email: credentials.email, password: credentials.password };

      const headers = {
        "Content-Type": "application/json",
      };

      // console.log(credentials);
      try {
        const response = await axios.post(
          // "http://localhost:5555/users/login",
          "https://book-store-d41z.onrender.com/users/login", //new backend server after deploying the backend to render.
          data,
          {
            headers: headers,
            //Header passed to the backend for authentication.
          }
        );
        const json = response.data;
        // console.log(json);
        // if (json.success) {
        //Save the authtoken and redirect
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("email", credentials.email); //saving the users authtoken as token in localStorage.
        enqueueSnackbar("Login Successful", { variant: "success" });
        setCredentials({ email: "", password: "" });

        navigate("/");
        // }
      } catch (error) {
        // console.log("Error occured");
        console.log(error);

        if (error.response.data.errors) {
          const err = er.response.data.errors;
          err.forEach((errmsg) =>
            enqueueSnackbar(errmsg.msg, { variant: "error" })
          );
        } else {
          enqueueSnackbar(error.response.data.error, { variant: "error" });
        }
      } finally {
        setLoading(false);
      }
    },
    [credentials.email, credentials.password, enqueueSnackbar, navigate]
  );

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //Handles onChange.
  };
  return (
    <div className="login">
      <h1
        style={{
          margin: "0px auto",
          fontSize: "30px",
          fontWeight: 700,
          padding: "5px",
          textShadow: "0px 0px 3px white",
        }}>
        Login to continue to Book Store
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <form className="form">
          <div className="email">
            {/* <label htmlFor="email" className="label">
            Email :
          </label> */}
            <MdEmail color="white" size={30} />
            <input
              type="email"
              className="input"
              value={credentials.email}
              name="email"
              onChange={handleChange}
              id="email"
              aria-describedby="emailHelp"
              placeholder=" Enter your email."
            />
          </div>
          <div className="password">
            {/* <label htmlFor="password" className="label">
            Password :
          </label> */}
            <FaKey size={30} color="white" />
            <input
              type="password"
              className="input"
              value={credentials.password}
              onChange={handleChange}
              id="password"
              name="password"
              placeholder=" Enter your password."
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

export default Login;
