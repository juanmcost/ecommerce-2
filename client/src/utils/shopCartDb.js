import { errorToast } from "./toastMessages";
import axios from "axios";

export const moreQuantity = (index, cart, aux, setter, auxSetter) => {
    let auxCart = cart;
    auxCart.list[index].quantity+=1;
    auxCart.total += auxCart.list[index].product.price
    setter(auxCart);
    aux===true ? auxSetter(false) : auxSetter(true);
}

export const lessQuantity = (index, cart, aux, setter, auxSetter, toast) => {
    let auxCart = cart;
    if (auxCart.list[index].quantity>1) {
        auxCart.list[index].quantity--;
        auxCart.total -= auxCart.list[index].product.price
        setter(auxCart);
        aux===true ? auxSetter(false) : auxSetter(true);
    } else {
        errorToast(toast, "use the delete button");
    }
}

export const deleteFromCart = (index, cart, aux, setter, auxSetter) => {
    let auxCart = cart;
    auxCart.total -= auxCart.list[index].product.price * auxCart.list[index].quantity
    auxCart.list.splice(index,1);
    setter(auxCart);
    aux===true ? auxSetter(false) : auxSetter(true);
}

export const deleteCart = (aux, setter, auxSetter, userId, toast) => {
    axios.delete(`http://localhost:8080/api/cart/${userId}`)
    .then(() => errorToast(toast, "user cart deleted"))
    .then(()=>{
        setter({list: [], total: 0});
        if (!auxSetter) return;
        else aux===true ? auxSetter(false) : auxSetter(true);
    })
}