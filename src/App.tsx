import Dashboard from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {


  return (
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          {/* <Route path="/share/:shareId"></Route> */}
        </Routes>
      </BrowserRouter>
  )
}

export default App
