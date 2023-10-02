import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
import Books from "./pages/Books";
import { styled } from "styled-components";

const Div = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-image: ${(props) =>
    `url('/assets/${
      props.pathname === "/login"
        ? "login.svg"
        : props.pathname === "/signup"
        ? "signup.svg"
        : "book.svg"
    }')`};
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) =>
    props.pathname === "/login"
      ? "50% 80%"
      : props.pathname === "/signup"
      ? "100% 100%"
      : "50% 90%"};
  object-fit: contain;
  background-color: ${(props) =>
    props.pathname === "/login"
      ? " #00b4ff59"
      : props.pathname === "/signup"
      ? ""
      : "#212139"};
  @media (max-width: 1000px) {
    background-size: ${(props) =>
      (props.pathname === "/login" && "60% 85%") ||
      (props.pathname === "/" && "60% 85%")};
  }
  @media (max-width: 768px) {
    background-size: 100% 100%;
  }
`;

const App = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <Div pathname={location.pathname}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Books />} />
      </Routes>
    </Div>
  );
};

export default App;
