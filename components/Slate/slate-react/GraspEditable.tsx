import React, { FC, useCallback } from 'react'
import { Descendant, Editor, Transforms } from 'slate'
import { Editable, useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import isHotkey from 'is-hotkey'

import defaultRenderElement from './defaultRenderElement'
import defaultRenderLeaf from './defaultRenderLeaf'
import defaultHotkeys from './defaultHotkeys'

const editableStyle: React.CSSProperties | undefined = {
    paddingLeft: '0.25rem',
    paddingRight: '0.25rem',
    paddingBottom: '0.25rem',
}

interface GraspEditableProps {
    name?: string
    renderElement
    renderLeaf
    placeholder
    hotkeys
    onHotkey
    children
    className
    readOnly: boolean
}

/**
 * Wrapper of Slate Editable
 *
 */
const GraspEditable: FC<Partial<GraspEditableProps>> = ({
    name = 'main',
    renderElement,
    renderLeaf,
    placeholder,
    hotkeys,
    onHotkey,
    children,
    className,
    readOnly = false,
    ...props
}) => {
    const editor = useSlate()
    const CMD_KEY = '/'
    // Define a rendering function based on the element passed to `props`.
    // Props is deconstructed in the {element, attributes, children, rest (any other prop)
    // We use `useCallback` here to memoize the function for subsequent renders.
    const handleRenderElement = useCallback((props) => {
        return renderElement ? renderElement(props) : defaultRenderElement({ ...props })
    }, [])

    const handleRenderLeaf = useCallback((props) => {
        return renderLeaf ? renderLeaf(props) : defaultRenderLeaf(props)
    }, [])

    const handleOnKeyDown = (event) => {
        for (const pressedKeys in hotkeys) {
            if (isHotkey(pressedKeys, event)) {
                const hotkey = hotkeys[pressedKeys]

                event.preventDefault()
                if (hotkey.type === 'mark') {
                    editor.toggleMark(hotkey.value)
                }
                if (hotkey.type === 'block') {
                    editor.toggleBlock(hotkey.value)
                }
                if (hotkey.type === 'newline') {
                    editor.insertText('\n')
                    //The following line updates the cursor
                    Transforms.move(editor, { distance: 0, unit: 'offset' })
                }

                return onHotkey && onHotkey({ event, editor, hotkey, pressedKeys, hotkeys })
            }
            // if (event.key === CMD_KEY) {
            //     editor.isCommandMenu = true
            //     // editor.insertText('hey')
            // }
            if (event.key === 'Enter') {
                if (!editor.isCommandMenu) {
                    const currentType = editor.getCurrentNode().type

                    if (!editor.LIST_TYPES.includes(currentType) && currentType !== 'list-item') {
                        event.preventDefault()
                        const newLine = {
                            type: 'paragraph',
                            children: [
                                {
                                    text: '',
                                },
                            ],
                        } as Descendant
                        Transforms.insertNodes(editor, newLine)
                        return onHotkey && onHotkey({ event, editor, pressedKeys, hotkeys })
                    }
                } else event.preventDefault()
            }
        }
    }
    return (
        <Editable
            data-editor-name={name}
            readOnly={readOnly}
            renderElement={handleRenderElement}
            renderLeaf={handleRenderLeaf}
            onKeyDown={(event) => handleOnKeyDown(event)}
            placeholder={placeholder}
            style={editableStyle}
            {...props}
        >
            {children}
        </Editable>
    )
}

// Specifies the default values for props:
GraspEditable.defaultProps = {
    placeholder: 'Type some text...',
    hotkeys: defaultHotkeys,
    readOnly: false,
}

// TODO add info about arguments in functions

export default GraspEditable
