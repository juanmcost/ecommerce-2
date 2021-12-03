import axios from 'axios';
import { successToast } from '../utils/toastMessages';

export default function addToCart(user, item, toast) {
    if (user.username) {
        let newList = [];
        axios
            .get(`http://localhost:8080/api/cart/${user._id}`)
            .then((response) => response.data)
            .then((dbCart) => {
                if (dbCart === null) {
                    newList.push({ productId: item._id });
                    axios
                        .post(`http://localhost:8080/api/cart/`, {
                            products: newList,
                            userId: user._id,
                        })
                        .then(() => successToast(toast, 'Product added to cart!'));
                } else {
                    let aux = false;
                    dbCart.products.forEach((el) => {
                        if (el.productId === item._id) {
                            aux = true;
                            el.quantity++;
                            return axios
                                .put(`http://localhost:8080/api/cart/${user._id}`, {
                                    products: [...dbCart.products],
                                })
                                .then(() => successToast(toast, 'summed to cart!'));
                        }
                    });
                    if (!aux) {
                        axios
                            .put(`http://localhost:8080/api/cart/${user._id}`, {
                                products: [...dbCart.products, { productId: item._id }],
                            })
                            .then((res) => {
                                successToast(toast, 'Product added to cart!');
                            });
                    }
                }
            });
    } else {
        const jsonCart = localStorage.getItem('carrito');
        let carrito = JSON.parse(jsonCart);
        if (carrito === null) carrito = { list: [], total: 0 };
        let aux = false;
        carrito.list.forEach((el) => {
            if (el.product._id === item._id) {
                aux = true;
                el.quantity++;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                successToast(toast, 'Summed to cart!');
                return;
            }
        });
        if (!aux) {
            carrito.list.push({ product: item, quantity: 1 });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            successToast(toast, 'Product added to cart!');
        }
    }
}
