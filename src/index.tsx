import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/theme.context";
import UserProvider from "./context/user.context";
import PanelProvider from "./context/progress-panel.context";
import ModalProvider from "./context/add-modal.context";
import ProgressCalendarProvider from "./context/progress-calendar.contex";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <PanelProvider>
          <UserProvider>
            <ProgressCalendarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProgressCalendarProvider>
          </UserProvider>
        </PanelProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
