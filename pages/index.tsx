import { Box } from '@chakra-ui/layout'
import { FC } from 'react'
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
