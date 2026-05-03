import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import { ConfirmProvider } from "./app/context/ConfirmContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfirmProvider>
        <App />
        <Toaster />``
      </ConfirmProvider>
    </BrowserRouter>
  </Provider>,
);
