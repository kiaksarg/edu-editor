import { Node } from 'slate'
/**
 *
 * Counter plugin for Material Slate.
 *
 * @param {Editor} editor
 */
const withCounter = (editor) => {
    /**
     * Returns the chars length
     */
    editor.getCharLength = (nodes) => {
        return editor.serialize(nodes).length
    }

    /**
     * Returns the words length
     *
     */
    editor.getWordsLength = (nodes) => {
        const content = editor.serialize(nodes)
        //Reg exp from https://css-tricks.com/build-word-counter-app/
        return content && content.replace(/\s/g, '') !== '' ? content.match(/\S+/g).length : 0
    }

    /**
     * Returns the paragraphs length
     */
    editor.getParagraphLength = (nodes) => {
        return nodes
            .map((n) => Node.string(n))
            .join('\n')
            .split(/\r\n|\r|\n/).length
    }

    return editor
}

export default withCounter
