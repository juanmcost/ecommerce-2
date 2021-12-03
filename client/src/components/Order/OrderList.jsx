import React, { useState } from 'react';
import OrderProduct from './OrderProduct';
import { Button, Table, Tr, Th, Td } from '@chakra-ui/react';
import { IoIosArrowDown } from 'react-icons/io';

const OrderList = (props) => {
    const { products, amount } = props.item;
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <Tr>
                <Th>
                    <Button onClick={handleClick}>
                        <IoIosArrowDown />
                    </Button>
                </Th>
                <Td isNumeric>${amount}</Td>
            </Tr>
            {toggle ? (
                <Tr>
                    <Table variant="simple">
                        {products.map((elem, i) => (
                            <OrderProduct key={i} item={elem} />
                        ))}
                    </Table>
                </Tr>
            ) : null}
        </>
    );
};

export default OrderList;
