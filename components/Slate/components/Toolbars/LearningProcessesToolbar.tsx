import React from 'react'
import { useRef, useEffect } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import {
    Box,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useInterval,
    useToast,
} from '@chakra-ui/react'
import { FC } from 'react'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { CreateConceptDocument } from '../../../../../api/graphql-operations'
import { useGraphqlMutation } from '../../../../hooks/useGraphql'
import { getEditorId } from '../../slate-utils'

interface LearningProcessesToolbarProps {
    docId: string
    onNewProcessClick
    onOpenInWindowClick
}

export const LearningProcessesToolbar: FC<LearningProcessesToolbarProps> = ({
    docId,
    onNewProcessClick,
    onOpenInWindowClick,
    children,
    ...props
}) => {
    const toast = useToast()

    const menuListBorderColor = useColorModeValue('1px solid #ddd', '1px solid #444')
    const menuListBGColor = useColorModeValue('white', 'gray.800')
    const menuListColor = useColorModeValue('black', 'white')

    const menuItemBorderColor = useColorModeValue('blue.500', 'blue.400')
    const menuItemBorderColor2 = useColorModeValue('white', 'gray.800')
    const menuItemBGColor = useColorModeValue('blue.100', 'blue.600')

    const ref = useRef<HTMLDivElement>()
    const menuListRef = useRef<HTMLDivElement>()
    const editorRef = useRef<HTMLElement>(null)
    const editor = useSlate()

    const mouseX = useRef(0)
    const mouseY = useRef(0)

    // const [createConcept, { data, loading, error }] = useMutation(CREATE_CONCEPT, {
    //     onCompleted: () => {
    //         toast({
    //             title: 'Success',
    //             description: 'Concept was saved.',
    //             status: 'success',
    //         })
    //     },
    // })

    const { mutate } = useGraphqlMutation(CreateConceptDocument, {
        onSuccess: (data) => {
            editor.insertConcept(data.createConcept.id)
            toast({
                title: 'Success',
                description: 'Concept was saved.',
                status: 'success',
            })
        },
    })

    useEffect(() => {
        editorRef.current = ReactEditor.toDOMNode(editor, editor)
    }, [])

    // editorRef.current = ReactEditor.toDOMNode(editor, editor)

    const { colorMode, toggleColorMode } = useColorMode()
    const mouseUpListener = () => {
        setTimeout(() => {
            if (ref.current && !window.getSelection().toString().length)
                ref.current.removeAttribute('style')
        }, 500)
    }
    const primaryMouseButtonDownRef = useRef(false)

    const HandleOnProcessClick = () => {
        const selectedText = Editor.string(editor, editor.selection)

        const content = [
            {
                type: 'paragraph',
                children: [{ text: selectedText }],
            },
        ]

        mutate({
            input: { documentId: docId, content: content, contentRaw: selectedText },
        })
    }

    const handleOnConceptWindowOpenClick = () => {
        const selectedText = Editor.string(editor, editor.selection)?.trim()
        onNewProcessClick(selectedText)
        onOpenInWindowClick(selectedText)
    }

    const myw = (isFromMup = true, e = null) => {
        let editorName = null
        if (e) editorName = getEditorId(e.target)

        const el: any = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            // !ReactEditor.isFocused(editor)
            //  ||
            Range.isCollapsed(selection)
            // ||
            // Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }
        if (editorName === 'main') {
            if (
                (window.getSelection().toString().length && !primaryMouseButtonDownRef.current) ||
                (isFromMup && window.getSelection().toString().length)
            ) {
                const domSelection = window.getSelection()
                const domRange = domSelection.getRangeAt(0)
                const rect = domRange.getBoundingClientRect()
                el.style.opacity = 1
                el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight + 50}px`
                el.style.left = `${mouseX.current - 80}px`

                setTimeout(() => {
                    menuListRef.current.focus()
                    menuListRef.current.click()
                }, 10)
            } else {
                el.removeAttribute('style')
                //     return
            }
        }
        mouseUpListener()
    }

    useEffect(() => {
        const setPrimaryButtonState = (e) => {
            const flags = e.buttons !== undefined ? e.buttons : e.which
            primaryMouseButtonDownRef.current = (flags & 1) === 1
        }

        const setMousePos = (e) => {
            mouseX.current = e.clientX
            mouseY.current = e.clientY
        }

        document.addEventListener('mousemove', setMousePos)
        document.addEventListener('mousedown', setPrimaryButtonState)
        document.addEventListener('mousemove', setPrimaryButtonState)
        document.addEventListener('mouseup', (e) => {
            myw(true, e)
        })

        return () => {
            document.removeEventListener('mousemove', setMousePos)
            document.removeEventListener('mousedown', setPrimaryButtonState)
            document.removeEventListener('mousemove', setPrimaryButtonState)
            document.removeEventListener('mouseup', () => {
                myw()
            })
        }
    }, [])

    useEffect(() => {
        myw(false)
    })

    return (
        // <Portal>
        <Box
            // direction="row"
            ref={ref}
            position="absolute"
            padding="1"
            zIndex={'popover'}
            top="-10000px"
            left="-10000px"
            opacity={0}
            transition="opacity 0.25s"
            {...props}
        >
            <Menu isOpen={true}>
                <MenuList
                    ref={menuListRef}
                    minWidth="185px"
                    max-height="300px"
                    overflow="auto"
                    bg={menuListBGColor}
                    color={menuListColor}
                    boxShadow="base"
                    border={menuListBorderColor}
                >
                    <Stack spacing={0.5} isInline>
                        <MenuItem
                            width="81%"
                            px="4"
                            borderRadius="0"
                            boxSizing="border-box"
                            borderLeftWidth="3px"
                            // {editor.isBlockActive(x.type)&&
                            // backgroundColor={isMenuItemActive && menuItemBGColor}
                            // borderColor={isMenuItemActive ? menuItemBorderColor : menuItemBorderColor2}
                            _hover={{
                                backgroundColor: menuItemBGColor,
                                borderLeftWidth: '3px',
                                borderColor: menuItemBorderColor,
                            }}
                            onClick={HandleOnProcessClick}
                        >
                            Default
                        </MenuItem>

                        <IconButton
                            size="sm"
                            onClick={handleOnConceptWindowOpenClick}
                            variant="link"
                            aria-label="o-icn"
                            icon={<ExternalLinkIcon />}
                            paddingEnd="0px"
                        />
                    </Stack>
                    <MenuItem onClick={handleOnConceptWindowOpenClick} icon={<AddIcon />}>
                        New Process
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
        // </Portal>
    )
}

export default LearningProcessesToolbar
