import { Button } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useState, useMemo } from 'react'
import { Descendant } from 'slate'
import { useSlate } from 'slate-react'
import { GraspSlate, GraspEditable, createGraspEditor, HoveringToolbar, SlateMenus } from '.'
import SlateCommand from './components/Command/SlateCommand'
import MenuHandler from './components/MenuHandler/MenuHandler'

//Initial contents of the editor
const initialValue = () => {
    return [
        {
            type: 'paragraph',
            children: [
                { text: 'Basic example. This is editable ' },
                { text: 'rich', bold: true },
                { text: ' text, ' },
                { text: 'much', italic: true },
                { text: ' better than a ' },
                { text: '<textarea>', code: true },
                { text: '!' },
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: "Since it's rich text, you can do things like turn a selection of text ",
                },
                { text: 'bold', bold: true, underlined: true },
                {
                    text:
                        ', or add a semantically rendered block quote in the middle of the page, like this:',
                },
            ],
        },
        {
            type: 'block-quote',
            children: [{ text: 'A wise quote.' }],
        },
        {
            type: 'heading-one',
            children: [{ text: 'Basic example the second' }],
        },
        {
            type: 'paragraph',
            children: [{ text: 'Basic example the second' }],
        },
    ]
}
/**
 * Instance of a Material Slate with hovering toolbar, that is, a toolbar that appears only when a text is
 * selected and hovering that selection.
 */
export default function Hovering() {
    // Holds the value of the editor
    const [value, setValue] = useState<Descendant[]>(initialValue())

    // An instance of material editor. It is an slate editor with a few more functions
    const editor = useMemo(() => createGraspEditor(), [])

    return (
        <GraspSlate editor={editor} value={value} onChange={(value) => setValue(value)}>
            <HoveringToolbar />
            <MenuHandler />
            <SlateCommand />
            <GraspEditable />
        </GraspSlate>
    )
}
