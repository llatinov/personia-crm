import "@components/ui/index.css";
import App from "app/app/app";
import { ContactsProvider } from "app/app/contacts-context";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ContactsProvider>
        <App />
      </ContactsProvider>
    </BrowserRouter>
  </StrictMode>
);
