import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
    primary: {
        100: '#E5FCF1',
        200: '#27EF96',
        300: '#10DE82',
        400: '#0EBE6F',
        500: '#0CA25F',
        600: '#0A864F',
        700: '#086F42',
        800: '#075C37',
        900: '#064C2E',
    },
}

const Container = {
    baseStyle: {
        maxW: '100%',
        px: 0,
    },
}
const styles = {
    global: (props) => ({
        body: {
            bg: mode('#f4f4f6', '#19191b')(props),
        },
        // '.chakra-text:after': {
        //     content: 'attr(placeholder)',
        // },

        // '*::placeholder': {
        //     color: mode('gray.400', 'whiteAlpha.400')(props),
        // },
        // '*, *::before, &::after': {
        //     borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        //     wordWrap: 'break-word',
        // },
    }),
}

const customTheme = extendTheme({
    colors,
    components: {
        Container,
    },
    styles,
})

/* customTheme.styles.global = ({ colorMode }) => {
    return {
        'body,html': {
            bg: colorMode === 'light' ? '#f4f4f6' : '#19191b',
        },
    }
} */

export default customTheme
