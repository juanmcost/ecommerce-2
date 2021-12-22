import Reviews from '../components/Review/Reviews';
import Carousel from '../components/Home/Carousel';
import Feature from '../common/Admin/Feature';
import { FaDollarSign } from 'react-icons/fa';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoAnalyticsSharp } from 'react-icons/io5';
import currencyConverter from '../utils/currencyConverter';
import {
    Container,
    SimpleGrid,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const appreciation = Number(article.value);

    useEffect(() => {
        window.scroll(0, 0);
        axios.get(`/api/product/${id}`).then(({ data }) => setArticle(data));
    }, [id]);

    return (
        <Container maxW={'95vw'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Flex>
                    <Carousel slides={article.img} type="article" />
                </Flex>
                <Stack spacing={4}>
                    <Heading>{article.title}</Heading>
                    <Text color={'gray.500'} align="justify" justify="inter-word" fontSize={'lg'}>
                        {article.description}
                    </Text>
                    <Stack
                        spacing={4}
                        divider={<StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />}
                    >
                        <Feature
                            icon={<Icon as={FaDollarSign} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Price: ' + ((article.price && currencyConverter(article.price)) || '')}
                        />
                        <Feature
                            icon={<Icon as={BiCategoryAlt} color={'blue.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('blue.100', 'blue.900')}
                            text={`Main category: ${(article.category && article.category[0]) || ''} `}
                        />
                        <Stack direction={['row']}>
                            <Feature
                                icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
                                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                                text={`Rating: `}
                            />
                            <Rating precision={0.1} name="read-only" value={appreciation} readOnly />
                        </Stack>
                    </Stack>
                </Stack>
            </SimpleGrid>
            <Reviews mt={15} product={article} />
        </Container>
    );
}
