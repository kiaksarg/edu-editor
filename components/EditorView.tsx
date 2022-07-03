import { Button } from '@chakra-ui/button'
import { Center, Spacer, Stack } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { FC, useState } from 'react'
import { Descendant } from 'slate'
import MainEditor from './GraspEditor/MainEditor'
import Card from './Card'
import { createGraspEditor } from './Slate'
import { CustomEditor } from './Slate/slateTypes'

const initialValue = (): Descendant[] => {
    return [
        { type: 'heading-0', children: [{ text: 'Slate.js' }] },
        {
            type: 'paragraph',
            children: [
                { text: 'Slate is a ', bold: true },
                { text: 'completely', italic: true, bold: true },
                { text: ' customizable framework for building rich text editors.', bold: true },
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text:
                        'Slate lets you build rich, intuitive editors like those in Medium, Dropbox Paper or Google Docs—which are becoming table stakes for applications on the web—without your codebase getting mired in complexity.',
                },
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text:
                        "It can do this because all of its logic is implemented with a series of plugins, so you aren't ever constrained by what ",
                },
                { text: 'is', italic: true },
                { text: ' or ' },
                { text: "isn't", italic: true },
                { text: ' in "core". You can think of it like a pluggable implementation of ' },
                { text: 'contenteditable', code: true },
                {
                    text:
                        ' built on top of React. It was inspired by libraries like Draft.js, Prosemirror and Quill.',
                },
            ],
        },
        {
            type: 'block-quote',
            children: [
                { text: '🤖 ' },
                { text: 'Slate is currently in beta', bold: true },
                {
                    text:
                        '. Its core API is usable now, but you might need to pull request fixes for advanced use cases. Some of its APIs are not "finalized" and will (breaking) change over time as we find better solutions.',
                },
            ],
        },
        { type: 'heading-1', children: [{ text: 'Why Slate?' }] },
        {
            type: 'paragraph',
            children: [
                { text: 'Why create Slate? Well... ' },
                { text: '(Beware: this section has a few ofmyopinions!)', italic: true },
                {
                    text:
                        'Before creating Slate, I tried a lot of the other rich text libraries out there—',
                },
                { text: 'Draft.js', bold: true },
                { text: ', ' },
                { text: 'Prosemirror', bold: true },
                { text: ', ' },
                { text: 'Quill', bold: true },
                {
                    text:
                        ', etc. What I found was that while getting simple examples to work was easy enough, once you started trying to build something like Medium, Dropbox Paper or Google Docs, you ran into deeper issues...',
                },
            ],
        },
        {
            type: 'bulleted-list',
            children: [
                {
                    type: 'list-item',
                    children: [
                        {
                            text: 'The editor\'s "schema" was hardcoded and hard to customize.',
                            bold: true,
                        },
                        {
                            text:
                                ' Things like bold and italic were supported out of the box, but what about comments, or embeds, or even more domain-specific needs?',
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text:
                                'Transforming the documents programmatically was very convoluted.',
                            bold: true,
                        },
                        {
                            text:
                                ' Writing as a user may have worked, but making programmatic changes, which is critical for building advanced behaviors, was needlessly complex.',
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text:
                                'Serializing to HTML, Markdown, etc. seemed like an afterthought.',
                            bold: true,
                        },
                        {
                            text:
                                ' Simple things like transforming a document to HTML or Markdown involved writing lots of boilerplate code, for what seemed like very common use cases.',
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: 'Re-inventing the view layer seemed inefficient and limiting.',
                            bold: true,
                        },
                        {
                            text:
                                ' Most editors rolled their own views, instead of using existing technologies like React, so you had to learn a whole new system with new "gotchas".',
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: "Collaborative editing wasn't designed for in advance.",
                            bold: true,
                        },
                        {
                            text:
                                " Often the editor's internal representation of data made it impossible to use for a realtime, collaborative editing use case without basically rewriting the editor.",
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        {
                            text: 'The repositories were monolithic, not small and reusable.',
                            bold: true,
                        },
                        {
                            text:
                                " The code bases for many of the editors often didn't expose the internal tooling that could have been re-used by developers, leading to having to reinvent the wheel.",
                        },
                    ],
                },
                {
                    type: 'list-item',
                    children: [
                        { text: 'Building complex, nested documents was impossible.', bold: true },
                        {
                            text:
                                ' Many editors were designed around simplistic "flat" documents, making things like tables, embeds and captions difficult to reason about and sometimes impossible.',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text:
                        "Of course not every editor exhibits all of these issues, but if you've tried using another editor you might have run into similar problems. To get around the limitations of their APIs and achieve the user experience you're after, you have to resort to very hacky things. And some experiences are just plain impossible to achieve.",
                },
            ],
        },
        {
            type: 'paragraph',
            children: [{ text: 'If that sounds familiar, you might like Slate.' }],
        },
        {
            type: 'paragraph',
            children: [{ text: 'Which brings me to how Slate solves all of that...' }],
        },
        { type: 'heading-0', children: [{ text: 'Edu-Eidtor' }] },
        {
            type: 'paragraph',
            children: [
                {
                    text:
                        'Edu-Editor is a basic medium, notion like rich text editor based on Slate.js framework.',
                },
            ],
        },
        { type: 'heading-1', children: [{ text: 'Basic Features' }] },
        {
            type: 'bulleted-list',
            children: [
                { type: 'list-item', children: [{ text: 'blocks' }] },
                { type: 'list-item', children: [{ text: 'command' }] },
                { type: 'list-item', children: [{ text: 'paragraph' }] },
                { type: 'list-item', children: [{ text: 'headings' }] },
                { type: 'list-item', children: [{ text: 'lists' }] },
                { type: 'list-item', children: [{ text: 'Slash commands' }] },
            ],
        },
        { type: 'paragraph', children: [{ text: '' }] },
    ]
}

const EditorView: FC = () => {
    const mainEditorRef = useRef<CustomEditor>()

    const [isReadOnly, setIsReadOnly] = useState(false)

    const [value, setValue] = useState<Descendant[]>(
        typeof window === 'undefined'
            ? []
            : JSON.parse(localStorage.getItem('slate-content')) ?? initialValue()
    )

    // useEffect(() => {
    //     const localStorageContent = localStorage.getItem('slate-content')
    //     if (localStorageContent) {
    //         const parsedContent = JSON.parse(localStorageContent)

    //         setValue(parsedContent ?? initialValue())
    //     } else setValue(initialValue())
    // }, [])

    const conceptWindowPositionsRef = useRef({
        x: 775,
        y: -248,
    })

    // An instance of material editor. It is an slate editor with a few more functions
    if (!mainEditorRef.current) mainEditorRef.current = createGraspEditor('mainEditor')
    const editor = mainEditorRef.current

    // const [saveBlocks, { data, loading, error }] = useMutation(SAVE_BLOCKS)

    const onEditorChange = (value) => {
        setValue(value)

        const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)
        if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            localStorage.setItem('slate-content', content)
        }
    }

    return (
        <>
            <Center w={['360px', '410px', '600px', '800px', '1100px']} id="i11111">
                <Card
                    width="100%"
                    maxWidth="1000"
                    minWidth={['xs', 'md', 'lg']}
                    minH="800px"
                    px="16"
                    py="12"
                >
                    <Stack isInline>
                        <Spacer />
                        <Button
                            size={'sm'}
                            colorScheme={'linkedin'}
                            onClick={() => {
                                setIsReadOnly((state) => !state)
                            }}
                        >
                            {isReadOnly ? 'Edit Mode' : 'Read Only Mode'}
                        </Button>
                    </Stack>
                    <MainEditor
                        editor={editor}
                        value={value}
                        setValue={setValue}
                        onEditorChange={onEditorChange}
                        editorKey={'main-editor'}
                        readOnly={isReadOnly}
                    />
                </Card>
            </Center>
        </>
    )
}

export default EditorView
