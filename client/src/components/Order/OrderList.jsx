import React from 'react'

const OrderList = (prop) => {
    console.log(`prop`, prop)
    const {address, products, payMethod, amount } = prop.item
    console.log(address)
    console.log(products)
    console.log(payMethod)
    console.log(amount)

    return (
        <div>
            {/* <p>{address}</p>
            <p>{products}</p>
            <p>{payMethod}</p>
            <p>{amount}</p> */}
        </div>
    )
}

export default OrderList
