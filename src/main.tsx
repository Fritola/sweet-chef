import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/index.tsx";
import { PedidosPage } from "./Pages/PedidosPage/index.tsx";
import { AboutPage, LoginPage } from "./Pages/index.tsx";
import "./index.css";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("userToken");
  console.log(isAuthenticated);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/pedidos" element={<PedidosPage />} /> */}

          {isAuthenticated ? (
            <>
              <Route path="/about" element={<AboutPage />} />
            </>
          ) : (
            <Route path="/about" element={<Navigate replace to="/login" />} />
          )}
          {isAuthenticated ? (
            <>
              <Route path="/pedidos" element={<PedidosPage />} />
            </>
          ) : (
            <Route path="/pedidos" element={<Navigate replace to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
