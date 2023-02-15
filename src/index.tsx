import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./context/add-modal.context";
import PanelProvider from "./context/progress-panel.context";
import UserProvider from "./context/user.context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ModalProvider>
      <PanelProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </PanelProvider>
    </ModalProvider>
  </React.StrictMode>
);
