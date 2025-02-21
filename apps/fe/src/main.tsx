import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { TanstackProvider } from "./libs/react-query";
import { router } from "./libs/router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanstackProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </TanstackProvider>
  </StrictMode>
);
