import React from 'react'
import { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'

import BoldButton from '../Buttons/BoldButton'
import ItalicButton from '../Buttons/ItalicButton'
import UnderlineButton from '../Buttons/UnderlineButton'
import StrikethroughButton from '../Buttons/StrikethroughButton'
import CodeButton from '../Buttons/CodeButton'
import { Box, Stack, useColorMode } from '@chakra-ui/react'
import { FC } from 'react'
import BulletedListButton from '../Buttons/BulletedListButton'
import NumberedListButton from '../Buttons/NumberedListButton'
import ButtonSeparator from '../Buttons/ButtonSeparator'
import BlockquoteButton from '../Buttons/BlockquoteButton'
import HeadingButtons from '../Buttons/HeadingButtons'

const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

/**
 * A hovering toolbar that is, a toolbar that appears over a selected text, and only when there is
 * a selection.
 *
 * If no children are provided it displays the following buttons:
 * Bold, italic, underline, strike through and code.
 *
 * Children will typically be `ToolbarButton`.
 */
export const HoveringToolbar: FC<any> = ({ children, ...props }) => {
    const ref = useRef()
    const editor: any = useSlate()
    const { colorMode, toggleColorMode } = useColorMode()

    useEffect(() => {
        const el: any = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            !ReactEditor.isFocused(editor) ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = 1
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - 4}px`
        el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
    })

    return (
        <Portal>
            <Stack
                direction="row"
                borderRadius="lg"
                spacing=".1"
                ref={ref}
                position="absolute"
                padding="1"
                zIndex="1"
                top="-10000px"
                left="-10000px"
                opacity={0}
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                transition="opacity 0.75s"
                {...props}
            >
                {!children && (
                    <React.Fragment>
                        <HeadingButtons />
                        <ButtonSeparator />
                        <BulletedListButton />
                        <NumberedListButton />
                        <BlockquoteButton />
                        <ButtonSeparator />
                        <BoldButton />
                        <ItalicButton />
                        <UnderlineButton />
                        <StrikethroughButton />
                        <CodeButton />
                    </React.Fragment>
                )}
                {children && children}
            </Stack>
        </Portal>
    )
}

export default HoveringToolbar
