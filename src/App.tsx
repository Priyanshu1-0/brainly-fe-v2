import Dashboard from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import PublicBrain from "./pages/PublicBrain";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/share/:shareId" element={<PublicBrain />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
