import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewedItems =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(viewedItems.slice(1, 4));
  }, []);

  return (
    <div>
      <h2 className="recomend">Рекомендації</h2>
      <div className="container">
        <ul className="product-list">
          {recentlyViewed.map((item, index) => (
            <li key={index} className="product-item">
              <Link to={`/product/${item._id}`} className="product-link">
                <img src={item.img} alt="" className="product-img" />
                <h3 className="product-name">{item.name}</h3>
                <div className="product-details">
                  <p>Ціна: {item.price} ₴</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyViewed;
