import { chakra, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { RenderLeafProps } from 'slate-react'
import { CustomText } from '../slateTypes'

/**
 * Default renderer of leafs.
 *
 * Handles the following type of leafs `bold` (strong), `code` (code), `italic` (em), `strikethrough` (del), `underlined`(u).
 *
 * @param {Object} props
 */

interface CustomRenderLeafProps extends RenderLeafProps {
    leaf: CustomText
}

export default function defaultRenderLeaf({
    leaf,
    attributes,
    children,
    text,
}: CustomRenderLeafProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { colorMode, toggleColorMode } = useColorMode()

    if (leaf?.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf?.code) {
        children = (
            <chakra.code
                padding={'3px'}
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                fontSize={'90%'}
                spellCheck={false}
                // color="red.700"
                // fontFamily={`"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace;line-height:normal`}
            >
                {children}
            </chakra.code>
        )
    }
    if (leaf?.italic) {
        children = <em>{children}</em>
    }
    if (leaf?.strikethrough) {
        children = <del>{children}</del>
    }
    if (leaf?.underline || leaf.underlined) {
        children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
}
