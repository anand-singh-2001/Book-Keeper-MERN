import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SnackbarProvider } from "notistack";
import BookContextProvider from "./Context/BookContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
