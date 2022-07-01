import { Box, BoxProps, Center, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'

const Card: FC<BoxProps> = ({ children, ...rest }) => {
    const bgColor = useColorModeValue('white', 'gray.900')
    const color = useColorModeValue('black', 'white')
    return (
        <Box
            w="full"
            bg={bgColor}
            color={color}
            boxShadow="md"
            rounded="lg"
            p={6}
            // textAlign="center"
            {...rest}
        >
            {children}
        </Box>
    )
}

export default Card
