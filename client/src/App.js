import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Admin from "./views/Admin.jsx";
import Article from "./views/Article";
import ShopCart from "./views/ShopCart";
import Register from "./views/Register";
import EmailSent from "./views/EmailSent";
import ShopCartDB from "./views/ShopCartDB";
import MyProducts from "./views/MyProducts";
import ConfirmCart from "./views/ConfirmCart";
import OrderAddress from "./views/OrderAddress";
import OrderPayMethod from "./views/OrderPayMethod";
import { getUser } from "./store/user";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/Admin/AdminPanel";
import SearchList from "./components/Search/SearchList"
import OrderHistory from "./components/Order/OrderHistory"
import Category from "./components/Category/Category"

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  useEffect(() => {
    axios.get("/api/auth/me").then((user) => {
      if (user.data) dispatch(getUser(user.data[0]));
    });
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/v2" element={<AdminPanel />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/order_history" element={<OrderHistory />} />
        <Route path="/search_list" element={<SearchList />} />
        <Route path="/myProducts" element={<MyProducts />} />
        <Route path="/myCart" element={<ShopCart />} />
        <Route path={`/${user.username}/myCart`} element={<ShopCartDB />} />
        <Route path={`/cart`} element={<ShopCart />} />
        <Route
          path={`/category/:tag`}
          element={<Category />}
        />
        <Route exact path="/articles/:id" element={<Article />} />
        <Route
          path="/new_order/address"
          element={user.username ? <OrderAddress /> : <Login />}
        />
        <Route
          path="/new_order/paymethod"
          element={user.username ? <OrderPayMethod /> : <Login />}
        />
        <Route
          path="/new_order/address"
          element={user.username ? <OrderAddress /> : <Login />}
        />
        <Route
          path="/new_order/paymethod"
          element={user.username ? <OrderPayMethod /> : <Login />}
        />
        <Route path="/emailSent" element={<EmailSent />} />
        <Route path={`/:id/myCart/confirm/:token`} element={<ConfirmCart />} />
      </Routes>
    </div>
  );
};

export default App;
