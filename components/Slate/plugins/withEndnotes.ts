import { Editor } from 'slate'
/**
 * Plugin for handling endnote synced type
 *
 * Requires withBase plugin
 */
const withEndnotes = (editor) => {
    const { isInline, isVoid } = editor

    const ENDNOTE_TYPE = 'endnote'

    /**
     * Overwrite to indicate `endnote` nodes are inline
     */
    editor.isInline = (element) => {
        return element.type === ENDNOTE_TYPE ? true : isInline(element)
    }

    /**
     * Overwrite to indicate `endnote` nodes are void
     */
    editor.isVoid = (element) => {
        return element.type === ENDNOTE_TYPE ? true : isVoid(element)
    }

    /**
     * If the editor loses focus upon pressing the `AddEndnoteButton`, you need to call
     * editor.rememberCurrentSelection() before the editor loses the focus
     *
     * `data` cannot contain the following items: id, type or children.
     */
    editor.addEndnote = (id, data) => {
        const text = { text: '' }
        const node = {
            id: id,
            type: ENDNOTE_TYPE,
            children: [text],
            data, //any data of the comment will be an attribute.
        }
        editor.wrapNode(node, editor.selection || editor.rememberedSelection)
        return node
    }

    /**
     * Gets the endnote node previous to this one.
     * If there is no endnote, returns null
     */
    editor.previousEndnoteNode = (endnoteId) => {
        let previous = null
        const endnotes = editor.findNodesByType(ENDNOTE_TYPE)
        for (const endnote of endnotes) {
            if (endnote.id === endnoteId) {
                break
            }
            previous = endnote
        }
        return previous
    }

    /**
     *  Synchronizes endnotes.
     *
     * It receives a list of endnotes.
     *  - Endnotes that are in the editor but not in the list are deleted
     *  - Endnotes of the endnotes that are in the list are updated.
     *
     * Each endnote is identified by `id` attribute in the node.
     *
     * @param {Array} endnotesToKeep is a list of endnotes objects that have an attribute `id`.
     */
    editor.syncEndnotes = (endnotesToKeep) => {
        editor.syncExternalNodes(ENDNOTE_TYPE, endnotesToKeep, false)
    }

    return editor
}

export default withEndnotes
