import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App';
import Tests from './components/newTests.js';

const router = createBrowserRouter([
  {
    path: "olix-reef-tests/",
    element: <App />,
  },
  {
    path: "olix-reef-tests/newtest",
    element: <Tests />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider  router={router} />
  </React.StrictMode>
);