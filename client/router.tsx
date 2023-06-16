import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import App from "./components/App";
import Home from "./components/Home";
import Rounds from "./components/Rounds";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/rounds" element={<Rounds />} />
    </Route>
  )
)

export default router