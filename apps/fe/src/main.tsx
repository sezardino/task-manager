import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "./libs/apollo";
import { router } from "./libs/router-dom";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
