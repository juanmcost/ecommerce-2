import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './views/Home';
import Navbar from './views/Navbar';
import Article from './views/Article';
import ShopCart from './components/Cart/ShopCart';
import NotFound from './views/NotFound';
import EmailSent from './components/Cart/EmailSent';
import ShopCartDB from './views/ShopCartDB';
import ConfirmCart from './components/Cart/ConfirmCart';
import OrderAddress from './components/Order/OrderAddress';
import OrderPayMethod from './components/Order/OrderPayMethod';
import Login from './components/User/Login';
import Profile from './components/User/Profile';
import Register from './components/User/Register';
import AdminPanel from './views/AdminPanel';
import SearchList from './components/Search/SearchList';
import OrderHistory from './components/Order/OrderHistory';
import Category from './components/Category/Category';
import { getUser } from './store/user';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ user }) => user);

    useEffect(() => {
        axios.get('/api/auth/me').then((user) => {
            if (user.data) dispatch(getUser(user.data[0]));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/profile" element={!user._id ? <NotFound /> : <Profile />} />
                <Route exact path="/profile/order_history" element={!user._id ? <NotFound /> : <OrderHistory />} />
                <Route path="/search_list" element={<SearchList />} />
                <Route path="/myCart" element={<ShopCart />} />
                <Route path={`/${user.username}/myCart`} element={<ShopCartDB />} />
                <Route path={`/cart`} element={<ShopCart />} />
                <Route path={`/category/:tag`} element={<Category />} />
                <Route exact path="/articles/:id" element={<Article />} />
                <Route path="/new_order/address" element={user.username ? <OrderAddress /> : <Login />} />
                <Route path="/new_order/paymethod" element={user.username ? <OrderPayMethod /> : <Login />} />
                <Route path="/new_order/address" element={user.username ? <OrderAddress /> : <Login />} />
                <Route path="/new_order/paymethod" element={user.username ? <OrderPayMethod /> : <Login />} />
                <Route path="/emailSent" element={<EmailSent />} />
                <Route path={`/:id/myCart/confirm/:token`} element={<ConfirmCart />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
