import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./styles/globals.css";
import ToastManager from "./components/ToastManager.jsx";
import store from "./store/store.js";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastManager />
  </Provider>
);
