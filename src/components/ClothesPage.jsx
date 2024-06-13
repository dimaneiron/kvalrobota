import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecentlyViewed from "./RecentlyViewed";
import addToCart from "./func/addToCart";

const ClothesPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product) {
      const recentlyViewed =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      const index = recentlyViewed.findIndex(
        (item) => item._id === product._id
      );
      if (index !== -1) {
        recentlyViewed.splice(index, 1);
      }
      recentlyViewed.unshift(product);
      if (recentlyViewed.length > 4) {
        recentlyViewed.pop();
      }
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  }, [product]);

  useEffect(() => {
    axios
      .get(`/api/clothes/`)
      .then((response) => {
        setProduct(response.data.find((clothes) => clothes._id === id));
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page-container">
      <div className="product-page">
        <h2>{product.name}</h2>
        <div className="product-page-details">
          <img src={product.img} alt="" className="product-img" />
          <div className="info">
            <p>Бренд: {product.brand}</p>
            <p>Розміри: {product.sizes.join(", ")}</p>
            <p>Колір: {product.color}</p>
            <p>Категорія: {product.category}</p>
            <p>Ціна: {product.price} ₴</p>
            <button
              className="addToCartButton"
              onClick={() => addToCart(product)}
            >
              Додати до кошика
            </button>
          </div>
        </div>
      </div>
      {<RecentlyViewed />}
    </div>
  );
};

export default ClothesPage;
