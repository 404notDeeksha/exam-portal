import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <PersistGate persistor={persistor} />
      <App />
    </Provider>
  </StrictMode>
);
