import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import addToCart from "./func/addToCart";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("тип");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios
      .get("/api/clothes")
      .then((response) => {
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.clothesType))
        );
        setCategories(["тип", ...uniqueCategories]);

        const uniqueColors = Array.from(
          new Set(data.map((product) => product.color))
        );
        setColors(["колір", ...uniqueColors]);
      })
      .catch((error) => {
        console.error("Error fetching clothes:", error);
      });
  }, []);

  const applyFilters = () => {
    let filtered = products;

    if (categoryFilter !== "тип") {
      filtered = filtered.filter(
        (product) => product.clothesType === categoryFilter
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseInt(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseInt(maxPrice)
      );
    }

    if (selectedColor !== "" && selectedColor !== "колір") {
      filtered = filtered.filter(
        (product) => product.color.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, minPrice, maxPrice, selectedColor]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div className="clothes-list">
      <div className="container">
        <div className="filters">
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Мін. ціна"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-input"
          />
          <span> - </span>
          <input
            type="number"
            placeholder="Макс. ціна"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-input"
          />
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="filter-select"
          >
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <p>Такого товару немає</p>
        ) : (
          <ul className="product-list">
            {filteredProducts.map((product, index) => (
              <li key={index} className="product-item">
                <Link to={`/product/${product._id}`} className="product-link">
                  <img src={product.img} alt="" className="product-img" />
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-details">
                    <p>Ціна: {product.price} ₴</p>
                  </div>
                </Link>
                <button
                  className="addToCartButton"
                  onClick={() => addToCart(product)}
                >
                  Додати до кошика
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
    </div>
  );
};

export default MainPage;
