import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/Store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
