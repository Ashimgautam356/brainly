import { DashBoard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { TwitterPage } from "./pages/TwitterPage"

import { BrowserRouter,Routes,Route } from "react-router-dom"
import { InitalLayout } from "./layout/InitalLayout"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" index element={<Signup></Signup>}></Route>
        <Route path="/" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<InitalLayout></InitalLayout>}>
          <Route index element={<DashBoard></DashBoard>}></Route>
          <Route path="/twitter" element={<TwitterPage></TwitterPage>}></Route>
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}
