import ShopCartDB from "./components/ShopCartDB";
import React, { useEffect } from "react";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Admin from "./views/Admin.jsx";
import SearchList from "./components/Search/SearchList"
import OrderHistory from "./components/Order/OrderHistory"
import { Route, Routes } from "react-router-dom";
import Article from "./views/Article";
import MyProducts from "./views/MyProducts";
import OrderAddress from "./views/OrderAddress";
import OrderPayMethod from "./views/OrderPayMethod";
import EmailSent from "./views/EmailSent";
import ConfirmCart from "./views/ConfirmCart";
import ShopCart from "./components/ShopCart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/user";
import AdminPanel from "./components/Admin/AdminPanel";

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
          path={`/categories/categoryId`}
          element={<>{/* <productsByCategory id={categoryId} /> */}</>}
        />{" "}
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
