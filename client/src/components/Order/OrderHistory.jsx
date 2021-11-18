import React, { useEffect, useState } from 'react'
import OrderList from './OrderList'
import axios from "axios"


const OrderHistory = () => {

    const [order, setOrder] = useState([])

    useEffect(() => {
        fetchOrders();
        async function fetchOrders() {
            const { data } = await axios.get('/api/order/history');
            console.log('datazo', data)
            if (data.length) setOrder(data);

        }
    }, []);
    console.log(`order`, order)
    return (
        <div>
            <h1>Order History </h1>
            {order ? (
        order.map((elem, i) => <OrderList key={i} item={elem} />)
      ) : null}
        </div>
    )
}

export default OrderHistory
