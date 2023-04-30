import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext } from "react"

export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
