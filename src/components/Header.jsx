import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import cartIcon from "../img/cart-shopping.png"; // Шлях до зображення корзини
import axios from "axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCartItems = localStorage.getItem("cartLenght");
      setCartItemCount(storedCartItems);
      if (storedCartItems === 0) {
        clearInterval(interval);
      }
    }, 500);
  }, []);

  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get("/api/clothes");
        const data = response.data;

        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="header">
      <Link to="/">
        <p>Дитячий одяг</p>
      </Link>
      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm !== "" && (
          <div className="suggestions">
            {suggestions
              .filter((suggestion) =>
                suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((suggestion, index) => (
                <Link to={`/product/${suggestion._id}`}>
                  <p key={index}>{suggestion.name}</p>
                </Link>
              ))}
          </div>
        )}
      </div>
      <Link to="/cart">
        <img src={cartIcon} alt="Cart" className="cart-icon" />
        {cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </Link>
    </div>
  );
};

export default Header;
