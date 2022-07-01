import { Transforms } from 'slate'
import { jsx } from 'slate-hyperscript'

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
    CODE: () => ({ code: true }),
    DEL: () => ({ strikethrough: true }),
    EM: () => ({ italic: true }),
    I: () => ({ italic: true }),
    S: () => ({ strikethrough: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underline: true }),
}

const ELEMENT_TAGS = {
    // A: (el) => ({ type: 'link', url: el.getAttribute('href') }),
    BLOCKQUOTE: () => ({ type: 'block-quote' }),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    H3: () => ({ type: 'heading-three' }),
    // H4: () => ({ type: 'heading-four' }),
    // H5: () => ({ type: 'heading-five' }),
    // H6: () => ({ type: 'heading-six' }),
    // IMG: (el) => ({ type: 'image', url: el.getAttribute('src') }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    // PRE: () => ({ type: 'code' }),
    UL: () => ({ type: 'bulleted-list' }),
}

export const deserialize = (el) => {
    if (el.nodeType === 3) {
        return el.textContent
    } else if (el.nodeType !== 1) {
        return null
    } else if (el.nodeName === 'BR') {
        return '\n'
    }

    const { nodeName } = el
    let parent = el

    if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
        parent = el.childNodes[0]
    }
    let children = Array.from(parent.childNodes).map(deserialize).flat()

    if (children.length === 0) {
        children = [{ text: '' }]
    }

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children)
    }

    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el)
        // if (nodeName === 'BLOCKQUOTE') {
        //     if (
        //         (children as any[]).filter((x) => x && typeof x !== 'string' && x?.children)
        //             .length > 0
        //     ) {
        //         console.log('d');

        //     } else {
        //         children = { text: el.innerText?.trim() }
        //     }

        // }
        ;(children as any[]).forEach((x) => {
            if (x && typeof x !== 'string' && x?.children && x.type === 'paragraph') {
                children = x?.children
            }
        })
        return jsx('element', attrs, children)
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el)
        return children.map((child) => jsx('text', attrs, child))
    }

    return children
}

const withHtml = (editor) => {
    const { insertData, isInline, isVoid } = editor

    // editor.isInline = (element) => {
    //     return element.type === 'link' ? true : isInline(element)
    // }

    // editor.isVoid = (element) => {
    //     return element.type === 'image' ? true : isVoid(element)
    // }

    editor.insertData = (data) => {
        const html = data.getData('text/html')

        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html')
            let fragment = deserialize(parsed.body)
            // if (fragment[0] && fragment[0].text.trim() === '') (fragment as []).splice(0, 1)
            fragment = (fragment as any[]).filter((x, idx) => x?.text?.trim() !== '' || idx === 0)

            if (fragment[0] && fragment[0]?.text?.trim() === '' && !fragment[0]['type']) {
                fragment[0].text = ''
            }
            // else {
            //     ;(fragment as any[]).splice(0, 0, { text: '' })
            // }
            ;(fragment as any[]).forEach((x) => {
                if (editor.LIST_TYPES.includes(x.type)) {
                    x.children = x.children.filter((x, idx) => x?.text?.trim() !== '')
                }
            })

            let NextElementsToBeSkipped = 0

            //to put a non-empty text-element or consecutive text-elements into a paragraph
            fragment = (fragment as any[]).map((x, idx) => {
                if (NextElementsToBeSkipped > 0) {
                    NextElementsToBeSkipped =
                        NextElementsToBeSkipped - 1 < 0 ? 0 : NextElementsToBeSkipped - 1
                    return
                }
                const isText = x && x['text'] && !x['type'] && x['text'].trim() !== ''

                if (isText) {
                    const consecutiveElements = [x]
                    for (let index = idx + 1; index < fragment.length; index++) {
                        const element = fragment[index]
                        const isElementText =
                            element && element['text'] && !x['type'] && x['text'].trim() !== ''
                        if (!isElementText) break

                        consecutiveElements.push(element)
                    }
                    if (consecutiveElements.length > 1) {
                        NextElementsToBeSkipped = consecutiveElements.length - 1
                        return { type: 'paragraph', children: consecutiveElements }
                    } else {
                        NextElementsToBeSkipped = 0
                        return { type: 'paragraph', children: [x] }
                    }
                }

                return x
            })

            fragment = fragment.filter((x) => x)

            Transforms.insertFragment(editor, fragment)
            return
        }

        insertData(data)
    }

    return editor
}

export default withHtml
