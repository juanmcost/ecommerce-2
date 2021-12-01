import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Box } from '@chakra-ui/react';

export default function Rating({ rating, numReviews, type }) {
    return (
        <Box d="flex" alignItems="center">
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return <BsStarFill key={i} style={{ marginLeft: '1' }} color="#ffb400" />;
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} style={{ marginLeft: '1' }} color={'#d79a08'} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
            {type !== 'home' && (
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {numReviews} review{numReviews > 1 && 's'}
                </Box>
            )}
        </Box>
    );
}
