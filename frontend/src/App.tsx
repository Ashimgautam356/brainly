import { DashBoard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { TwitterPage } from "./pages/TwitterPage"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { InitalLayout } from "./layout/InitalLayout"
import { YoutubePage } from "./pages/YoutubePage"
import { OtherPage } from "./pages/OtherPage"
import { SharedBrain } from "./pages/SharedBrain"




export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" index element={<Signup></Signup>}></Route>
        <Route path="/" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<InitalLayout></InitalLayout>}>
          <Route index element={<DashBoard></DashBoard>}></Route>
          <Route path="twitter" element={<TwitterPage></TwitterPage>}></Route>
          <Route path="youtube" element={<YoutubePage></YoutubePage>}></Route>
          <Route path="other" element={<OtherPage></OtherPage>}></Route>
          <Route path="brain/:shareId" element={<SharedBrain></SharedBrain>}></Route>

        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}
