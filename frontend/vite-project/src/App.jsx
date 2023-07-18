import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";

import axios from "axios";
import { Context, server } from "./main";

function App() {

  const { setUser, isAuthenticated ,setIsAuthenticated, loading, setIsLoading } = useContext(Context);

  useEffect(() => {

    setIsLoading(true);

    axios.get(`${server}/users/profile`,
    {
      withCredentials: true
    })
    .then( res =>{
      setUser(res.data.user);
      console.log("user= " + res.data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error.response.data.message)
      setUser({});
      setIsAuthenticated(false);
      setIsLoading(false);
    });



  }, [isAuthenticated]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster />
    </Router>   
  )
}

export default App
