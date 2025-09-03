import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { setTokenGetter } from "./utils/axiosInstance.js";

// --- Set token getter AFTER store is ready ---
setTokenGetter(() => store.getState().auth.token);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <App />
    </Provider>
  </StrictMode>
);
