import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ApplicationUrls } from "./const";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>loading</p>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ApplicationUrls.landing.index,
        Component: () => <h1>Landing</h1>,
      },
      {
        path: ApplicationUrls.auth.index,
        Component: () => <Outlet />,
        children: [
          { path: ApplicationUrls.auth.index, Component: () => <h1>Auth</h1> },
          { path: ApplicationUrls.auth.login, Component: () => <h1>Auth</h1> },
          {
            path: ApplicationUrls.auth.registration,
            Component: () => <h1>Auth</h1>,
          },
        ],
      },
      {
        path: ApplicationUrls.application.index,
        Component: () => <Outlet />,
        children: [
          {
            path: ApplicationUrls.application.index,
            Component: () => <h1>App</h1>,
          },
        ],
      },
    ],
  },
]);
