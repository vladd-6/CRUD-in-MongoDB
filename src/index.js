import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Pilots from './pages/Pilots'
import NewPilotForm from './pages/NewPilotForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Pilots/:companyId",
    element: <Pilots/>
  },
  {
    path: "/addPilot",
    element: <NewPilotForm/>
  }
  // {
  //   path: "/editPlayer/:playerId",
  //   element: <EditPlayerForm/>
  // },
  // ,
  // {
  //   path: "/getGoals/:playerId",
  //   element: <Goals/>
  // }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();