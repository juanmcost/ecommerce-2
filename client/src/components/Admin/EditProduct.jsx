import React from 'react';

import { Avatar, Text, Flex } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';

import NewProduct from './NewProduct';
import Spinner from '../../common/Spinner/Spinner';
import useAdminEditProduct from '../../hooks/useAdminEditProduct';

const EditProduct = () => {
    const { prod, setInput, toggle, current } = useAdminEditProduct();

    return (
        <>
            <Flex direction="column" flex="2" margin="0 auto" h="100%">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        variant="filled"
                        placeholder="Search a product"
                        autoFocus
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <AutoCompleteList>
                        {prod.map(({ title, img }, i) => (
                            <AutoCompleteItem
                                key={`option-${i}`}
                                value={title}
                                align="center"
                                onClick={(e) => setInput(e.target.innerText)}
                            >
                                <Avatar size="sm" name={img[0]} src={img[0]} />
                                <Text ml="4">{title}</Text>
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
                {!current._id && toggle ? <Spinner /> : null}
                {current._id ? <NewProduct article={current} type="edit" art_id={current._id} /> : null}
            </Flex>
        </>
    );
};

export default EditProduct;
