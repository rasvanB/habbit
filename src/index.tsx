import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/theme.context";
import UserProvider from "./context/user.context";
import "./index.css";
import App from "./App";
import ModalProvider from "./context/add-modal.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
