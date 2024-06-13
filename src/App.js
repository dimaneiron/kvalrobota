import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import ClothesPage from "./components/ClothesPage";
import CartPage from "./components/CartPage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ClothesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
