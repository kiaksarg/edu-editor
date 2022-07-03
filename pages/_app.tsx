import { AppProps } from 'next/app'
import { Center, ChakraProvider, CSSReset } from '@chakra-ui/react'
import customTheme from '../utils/theme'
import { FC } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={customTheme}>
            <CSSReset />
            <Center>
                <Component {...pageProps} />
            </Center>
        </ChakraProvider>
    )
}

export default App
