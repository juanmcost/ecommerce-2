import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';

import useSearch from '../../hooks/useSearch';

const Search = () => {
    const navigate = useNavigate();
    const { isMobile, prod, setCurrent, handlePress } = useSearch();
    const [ancho, setAncho] = useState('12em');
    const [margin, setMargin] = useState('0');

    return (
        <>
            <Flex mr={margin} w={!isMobile && '10em'} transition="all 0.5s ease">
                <AutoComplete rollNavigation>
                    <AutoCompleteInput
                        borderColor={'gray.800'}
                        variant="filled"
                        placeholder="Search a product..."
                        textAlign={'center'}
                        autoFocus
                        onChange={(e) => setCurrent(e.target.value)}
                        onKeyDown={handlePress}
                        w={ancho}
                        transition="all 0.5s ease"
                        onFocus={() => {
                            setAncho('25em');
                            setMargin('8em');
                        }}
                        onBlur={() => {
                            setAncho('17em');
                            setMargin('0');
                        }}
                    />
                    <AutoCompleteList w={!isMobile && '30em'}>
                        {prod
                            ? prod.map((element, oid) => (
                                  <AutoCompleteItem
                                      key={`option-${oid}`}
                                      value={element.title}
                                      align="center"
                                      onClick={(e) => navigate(`/articles/${element._id}`)}
                                  >
                                      <Avatar size="sm" name={element.img[0]} src={element.img[0]} />
                                      <Text ml="4">{element.title}</Text>
                                  </AutoCompleteItem>
                              ))
                            : null}
                    </AutoCompleteList>
                </AutoComplete>
            </Flex>
        </>
    );
};

export default Search;
