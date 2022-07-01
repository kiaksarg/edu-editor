import GraspEditor from '../GraspEditor'
import { Element, Transforms } from 'slate'

/**
 * Simple block handling
 *
 * @param {Editor} editor
 */
const withBlocks = (editor) => {
    editor.LIST_TYPES = ['numbered-list', 'bulleted-list']

    /**
     * checks if a block is active
     */
    editor.isBlockActive = (block) => {
        const [match] = GraspEditor.nodes(editor, {
            match: (n) => Element.isElement(n) && n.type === block,
        })
        return !!match
    }

    /**
     * Toggles the block in the current selection
     */
    editor.toggleBlock = (format) => {
        const isActive = editor.isBlockActive(format)
        const isList = editor.LIST_TYPES.includes(format)

        Transforms.unwrapNodes(editor, {
            match: (n) => Element.isElement(n) && editor.LIST_TYPES.includes(n.type),
            split: true,
        })

        //TODO cannot this be generalized??
        Transforms.setNodes(editor, {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        })

        if (!isActive && isList) {
            const selected = { type: format, children: [] } as Element
            Transforms.wrapNodes(editor, selected)
        }
    }
    return editor
}

export default withBlocks
