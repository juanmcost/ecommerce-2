import axios from 'axios';
import { successToast } from '../utils/toastMessages';

export default function addToCart(user, item, toast){
  if (user.username) {
    let newList = [];
    axios
      .get(`http://localhost:8080/api/cart/${user._id}`)
      .then(response => response.data)
      .then((dbCart) => {
        if (dbCart === null) { //-------------------if cart is not created: --------------------------
          newList.push({ productId: item._id, quantity: 1});
          axios
            .post(`http://localhost:8080/api/cart/`, {
              list: newList,
              userId: user._id,
              total: item.price
            })
            .then(() => successToast(toast, "Product added to cart!"))
            .catch((err) => console.log(err));
        } else { //--------------------------if cart already exists: --------------------------
          dbCart.total += item.price;
          let isInCart = false;

          dbCart.list.forEach((cartItem) => { 
            if (cartItem.product._id === item._id) { //is item in cart?
              isInCart = true;
              cartItem.quantity++;
              return axios
                .put(`http://localhost:8080/api/cart/${user._id}`, {newCart: dbCart})
                .then(() => successToast(toast, "summed to cart!"));
            }
          });

          if (!isInCart) {//----------------------if item wasn't in the cart--------------------------
            dbCart.list.push({product: item, quantity: 1})
            return axios
              .put(`http://localhost:8080/api/cart/${user._id}`, {newCart: dbCart})
              .then(() => successToast(toast, "Product added to cart!"));
          }
        }
      });
  } else { //if user is not logged in
    const jsonCart = localStorage.getItem("carrito");
    let carrito = JSON.parse(jsonCart);
    if (carrito === null) carrito = { list: [], total: 0 };
    let aux = false;
    carrito.list.forEach((el) => {
      if (el.product._id === item._id) {
        aux = true;
        el.quantity++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        successToast(toast, "Summed to cart!");
        return;
      }
    });
    if (!aux) {
      carrito.list.push({ product: item, quantity: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      successToast(toast, "Product added to cart!");
    }
  }
}
