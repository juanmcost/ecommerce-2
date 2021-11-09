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
import { useLocation } from 'react-router-dom'
import axios from 'axios';
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
	const id = useLocation().pathname.split('/')[2];
	useEffect(() => {
		setArticle({
			name: 'Acer Nitro 5', 
			price: '$1000 USD', 
			desciption: 'Acer Nitro 5 AN517-41-R0RZ Gaming Laptop viene con estas especificaciones de alto nivel: AMD Ryzen 7 5800H Octa-Core Processor 3.2GHz con precisión Boost hasta 4.4GHz, pantalla panorámica Full HD de 17.3" con retroiluminación LED IPS (resolución 1920 x 1080; relación de aspecto 16:9; 144 Hz. Fresh Rate, NVIDIA GeForce RTX 3060 GPU para portátil con 6 GB de GDDR6 VRAM, NVIDIA DLSS, NVIDIA Redimensionable BAR, NVIDIA Dynamic Boost 2.0, NVIDIA GPU Boost, 16GB DDR4 3200MHz de memoria, 1TB PCIe NVMe SSD (2 x PCIe M.2 x PCIe M.2 PCIe M.2 x Ranuras | 1 Ranura disponible), 1 - Bahía de disco duro disponible, DTS: X Ultra Audio, Acer True Harmony Technology, dos altavoces estéreo integrados, Acer Purified.Tecnología de voz con dos micrófonos integrados, Intel Wireless Wi-Fi 6 AX200 802.11ax Dual-Band 2.4GHz y 5GHz con tecnología MU-MIMO 2x2 (Velocidad máxima de hasta 2.4Gbps), Killer Ethernet E2600000 Gbps), Killer E2 Gbps. 0 10/LAN Ethernet Gigabit 100/1000, Bluetooth 5.1, cámara web HD (1280 x 720) compatible con rango dinámico súper alto (SHDR), 1 puerto USB 3.2 tipo C Gen 2 (hasta 10 Gbps), 1 puerto USB 3.2 Gen 2 (con carga de apagado), 2 puertos USB 3.2, 1 - HDMI Puerto 2.1 con soporte HDCP, teclado retroiluminado RGB de 4 zonas, Windows 10 Home, batería de iones de litio, hasta 9 horas de duración de la batería, 6 libras. | 6 libras (sólo unidad del sistema) (NH.QARAA.001)',
			images: [
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com.mx%2FAcer-Nitro-Wireless-AC-retroiluminado-obsidiana%2Fdp%2FB08DCT2V6L&psig=AOvVaw2LeWZQm-pIpe5GHlaN3LNq&ust=1636488642672000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDQxPW9ifQCFQAAAAAdAAAAABAQ',
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com.mx%2FAcer-Port%25C3%25A1til-10300H-memoria-Obsidiana%2Fdp%2FB08CGMGTSM&psig=AOvVaw2LeWZQm-pIpe5GHlaN3LNq&ust=1636488642672000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDQxPW9ifQCFQAAAAAdAAAAABAe',
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pocket-lint.com%2Fes-es%2Fportatiles%2Fanalisis%2Facer%2F152482-acer-nitro-5-revision-economica-portatil-para-juegos&psig=AOvVaw2LeWZQm-pIpe5GHlaN3LNq&ust=1636488642672000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDQxPW9ifQCFQAAAAAdAAAAABAk',
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeknetic.es%2FReview%2F2129%2FAcer-Nitro-5-AN515-45-Review.html&psig=AOvVaw2LeWZQm-pIpe5GHlaN3LNq&ust=1636488642672000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLDQxPW9ifQCFQAAAAAdAAAAABAw',
			],
			quantity: 7,
		});
		// axios.get(`/article/${id}`)
		// 	.then(data => setArticle(data))
	}, []);
	
  return (
    <Container maxW={'90vw'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<Flex>
					<Carousel images={article.images}/>
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
              text={`In stock: ${article.quantity}`}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}