import { DashBoard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"

import { BrowserRouter,Routes,Route } from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" index element={<Signup></Signup>}></Route>
        <Route path="/" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
      </Routes>
    
    </BrowserRouter>
  )
}
