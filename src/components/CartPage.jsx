import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("cart");
    setCartItems([]);
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };
  const handleConfirmOrder = () => {
    localStorage.removeItem("cart");
    localStorage.setItem("cartLenght", 0);
    navigate("/");
  };

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Корзина порожня</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.name} className="product-img" />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">Ціна: {item.price} ₴</p>
                  <p className="item-count">Кількість: {item.quantity} </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p></p>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Адреса доставки"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button onClick={handleConfirmOrder} type="submit">
            Підтвердити замовлення
          </button>
        </form>
      )}
    </div>
  );
};

export default CartPage;
