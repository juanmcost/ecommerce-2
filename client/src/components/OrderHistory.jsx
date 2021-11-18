import React, { useEffect, useState } from 'react'
import axios from "axios"


const OrderHistory = () => {

    useEffect(() => {
        fetchOrders();
        async function fetchOrders() {
            const { data } = await axios.get('/api/order/history');
            console.log('data', data);
        }
    }, []);
    
    return (
        <div>
            <h1>Order History </h1>
        </div>
    )
}

export default OrderHistory
