import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";

import AuthRoute from "../layout/AuthRoute";
import Streams from "../pages/Streams";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/streams" element={<Streams />} />
      <Route path="/admin" element={<Admin />} />
      <Route element={<AuthRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

export default router;
