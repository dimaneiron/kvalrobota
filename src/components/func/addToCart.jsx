const addToCart = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsLenght = JSON.parse(localStorage.getItem("cartLenght")) || [];
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === product._id
  );

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
    localStorage.setItem("cartLenght", cartItemsLenght + 1);
  } else {
    cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem("cartLenght", cartItemsLenght + 1);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export default addToCart;
