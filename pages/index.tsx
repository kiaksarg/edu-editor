import { Box } from '@chakra-ui/layout'
import { FC } from 'react'
import NLink from 'next/link'
import { Button } from '@chakra-ui/button'
import Link from 'next/link'
import { Flex } from '@chakra-ui/react'
import EditorView from '../components/EditorView'
const IndexPage: FC = () => {
    // Tick the time every second

    return (
        <Box my={10}>
            <EditorView />
        </Box>
    )
}

export default IndexPage
