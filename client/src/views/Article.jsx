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
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
} from 'react-icons/io5';
import { React, useEffect, useState } from 'react';
import Reviews from '../containers/Reviews'
import Carousel from '../components/Carousel';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
	const [article, setArticle] = useState({});
	//const id = useLocation().pathname.split('/')[2]; //toDo Usar para gestionar estado de producto con redux.
	useEffect(() => {
    const data = {
      name: 'Acer Nitro 5', 
      price: '$1000 USD', 
      desciption: 'Acer Nitro 5 AN517-41-R0RZ Gaming Laptop viene con estas especificaciones de alto nivel: AMD Ryzen 7 5800H Octa-Core Processor 3.2GHz con precisión Boost hasta 4.4GHz, pantalla panorámica Full HD de 17.3" con retroiluminación LED IPS (resolución 1920 x 1080; relación de aspecto 16:9; 144 Hz. Fresh Rate, NVIDIA GeForce RTX 3060 GPU para portátil con 6 GB de GDDR6 VRAM, NVIDIA DLSS, NVIDIA Redimensionable BAR, NVIDIA Dynamic Boost 2.0, NVIDIA GPU Boost, 16GB DDR4 3200MHz de memoria, 1TB PCIe NVMe SSD (2 x PCIe M.2 x PCIe M.2 PCIe M.2 x Ranuras | 1 Ranura disponible), 1 - Bahía de disco duro disponible, DTS: X Ultra Audio, Acer True Harmony Technology, dos altavoces estéreo integrados, Acer Purified.Tecnología de voz con dos micrófonos integrados, Intel Wireless Wi-Fi 6 AX200 802.11ax Dual-Band 2.4GHz y 5GHz con tecnología MU-MIMO 2x2 (Velocidad máxima de hasta 2.4Gbps), Killer Ethernet E2600000 Gbps), Killer E2 Gbps. 0 10/LAN Ethernet Gigabit 100/1000, Bluetooth 5.1, cámara web HD (1280 x 720) compatible con rango dinámico súper alto (SHDR), 1 puerto USB 3.2 tipo C Gen 2 (hasta 10 Gbps), 1 puerto USB 3.2 Gen 2 (con carga de apagado), 2 puertos USB 3.2, 1 - HDMI Puerto 2.1 con soporte HDCP, teclado retroiluminado RGB de 4 zonas, Windows 10 Home, batería de iones de litio, hasta 9 horas de duración de la batería, 6 libras. | 6 libras (sólo unidad del sistema) (NH.QARAA.001)',
      images: [
        'https://m.media-amazon.com/images/I/81Z8NvO2TFL._AC_SL1500_.jpg',
        'https://images.idgesg.net/images/article/2020/11/acer-nitro-5-an515-44-r99q-vents-100865209-large.jpg?auto=webp&quality=85,70',
        'https://m.media-amazon.com/images/I/81PUD0rM2NL._AC_SL1500_.jpg',
        'https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/mg/gm/1p/images/product-images/img_large/00019319977512l.jpg',
        'https://static.acer.com/up/Resource/Acer/Laptops/Nitro_5/rev-jan-2021-intel/20210329/Acer-Nitro5-KSP1-640.jpg',
      ],
      quantity: 7,
      avgRating: 8.5
    }
    if (article !== data) {
      window.localStorage.setItem('product', JSON.stringify(data));
      setArticle(JSON.parse(window.localStorage.getItem('product')));
    };
	}, [article]);
	
  return (
    <Container maxW={'95vw'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<Flex>
					<Carousel slides={article.images}/>
				</Flex>
        <Stack spacing={4}>
          <Heading>{article.name}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>{article.desciption}</Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
						<Feature
							icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
							iconBg={useColorModeValue('green.100', 'green.900')}
							text={article.price}
						/>
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={`In stock: ${article.quantity}`}                                    //toDo cambiar icono
            />
             <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={`Average rating: ${article.avgRating}`}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
      <Reviews mt={15} />
    </Container>
  );
}