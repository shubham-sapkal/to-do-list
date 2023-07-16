import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>

    </Router>   
  )
}

export default App
