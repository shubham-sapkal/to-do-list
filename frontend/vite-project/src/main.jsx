import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'

// import { createContext } from 'react';

export const server = "https://shubham-todo-app.onrender.com/api/v1";

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ loading, setIsLoading] = useState(false);
  const [ user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setIsLoading,
        user,
        setUser
      }}>
      <App />
    </Context.Provider>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppWrapper />
  </React.StrictMode>
);
