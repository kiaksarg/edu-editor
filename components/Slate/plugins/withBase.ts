import GraspEditor from '../GraspEditor'
import { Element, Range } from 'slate'
import { Transforms } from 'slate'
import { Node } from 'slate'
import { ReactEditor } from 'slate-react'
/**
 *
 * Base plugin for Material Slate.
 *
 * All other plugins assume this plugin exists and has been included.
 *
 * @param {Editor} editor
 */
const withBase = (editor) => {
    /**
     * Is the current editor selection a range, that is the focus and the anchor are different?
     *
     * @returns {boolean} true if the current selection is a range.
     */
    editor.isSelectionExpanded = (): boolean => {
        return editor.selection ? Range.isExpanded(editor.selection) : false
    }

    /**
     * Returns true if current selection is collapsed, that is there is no selection at all
     * (the focus and the anchor are the same).
     *
     * @returns {boolean} true if the selection is collapsed
     */
    editor.isSelectionCollapsed = (): boolean => {
        return !editor.isSelectionExpanded()
    }

    /**
     * Is the editor focused?
     * @returns {boolean} true if the editor has focus. */
    editor.isFocused = () => {
        return ReactEditor.isFocused(editor)
    }

    /**
     * Unwraps any node of `type` within the current selection.
     */
    editor.unwrapNode = (type) => {
        Transforms.unwrapNodes(editor, { match: (n: Element) => n.type === type })
    }

    /**
     *
     * @param {string} type type of node to be checked. Example: `comment`, `numbered-list`
     *
     * @returns {bool} true if within current selection there is a node of type `type`
     */
    editor.isNodeTypeActive = (type: string) => {
        const [node] = GraspEditor.nodes(editor, { match: (n: Element) => n.type === type })
        return !!node
    }

    /**
     * Variable for holding a selection may be forgotten.
     */
    editor.rememberedSelection = {}
    editor.selectedCommand = 0
    /**
     * Gets current selection and stores it in rememberedSelection.
     *
     * This may be useful when you need to open a dialog box and the editor loses the focus
     */
    editor.rememberCurrentSelection = () => {
        editor.rememberedSelection = editor.selection
    }

    /**
     * Is the current selection collapsed?
     */
    editor.isCollapsed = () => {
        const { selection } = editor
        return selection && Range.isCollapsed(selection)
    }

    /**
     * Wraps a selection with an argument. If `wrapSelection` is not passed
     * uses current selection
     *
     * Upon wrapping moves the cursor to the end.
     *
     * @param {Node} node the node to be added
     * @param {Selection} wrapSelection selection of the text that will be wrapped with the node.
     *
     */
    editor.wrapNode = (node, wrapSelection = null) => {
        //if wrapSelection is passed => we use it. Use editor selection in other case
        editor.selection = wrapSelection ? wrapSelection : editor.selection

        // if the node is already wrapped with current node we unwrap it first.
        if (editor.isNodeTypeActive(node.type)) {
            editor.unwrapNode(node.type)
        }
        // if there is no text selected => insert the node.
        //console.log('isLocation', Location.isLocation(editor.selection))
        if (editor.isCollapsed()) {
            //console.log('is collapsed insertNodes')
            Transforms.insertNodes(editor, node)
        } else {
            //text is selected => add the node
            Transforms.wrapNodes(editor, node, { split: true })
            //console.log('editor', editor.children)
            Transforms.collapse(editor, { edge: 'end' })
        }
        // Add {isLast} property to the last fragment of the comment.
        // const path = [...GraspEditor.last(editor, editor.selection)[1]]
        // The last Node is a text whose parent is a comment.
        // path.pop() // Removes last item of the path, to point the parent
        // Transforms.setNodes(editor, { isLast: true } as unknown, { at: path }) //add isLast
    }

    /**
     * Unwraps or removes the nodes that are not in the list.
     *
     * It will search for all the nodes of `type` in the editor and will keep only
     * the ones in the nodesToKeep.
     *
     * It assumes each item of nodesToKeep has an attribute `id`. This attribute will be the discriminator.
     *
     */

    /**
     * Removes the nodes that are not in the list of Ids
     *
     * Nodes of type `type` shall have the attribute/property `id`
     *
     * Example:
     * ```
     * {
     *    type: `comment`
     *    id: 30
     *    data: { ... }
     *  }
     * ```
     */

    /**
     * Gets from current editor content the list of items of a particular type
     */
    editor.findNodesByType = (type) => {
        const list = GraspEditor.nodes(editor, {
            match: (n: Element) => n.type === type,
            at: [],
        })
        // List in editor with path and node
        const listWithNodesAndPath = Array.from(list)
        // List with node (element)
        const listWithNodes = listWithNodesAndPath.map((item) => {
            return item[0]
        })
        //console.log('fondNodesByType ', listWithNodes)
        return listWithNodes
    }

    /**
     * Returns the serialized value (plain text)
     */
    editor.serialize = (nodes) => {
        return nodes.map((n) => Node.string(n)).join('\n')
    }

    /**
     * Is to get the selected plain text from the editor.selection
     *
     * @returns {string} selected text
     */
    editor.getSelectedText = () => {
        return GraspEditor.string(editor, editor.rememberedSelection)
    }

    editor.isCommandMenu = false
    editor.getCurrentNodeText = (anchorOffset = 0, focusOffset?): string => {
        const { selection } = editor

        if (selection)
            return GraspEditor.string(editor, {
                anchor: { ...selection?.anchor, offset: anchorOffset },
                focus: focusOffset
                    ? { ...selection?.anchor, offset: focusOffset }
                    : { ...selection?.anchor },
            })

        return ''
    }

    editor.getCurrentNode = () => {
        const [node] = GraspEditor.parent(editor, editor.selection)
        return node
    }

    editor.getCurrentNodePath = () => {
        const [, path] = GraspEditor.parent(editor, editor.selection)
        return path
    }

    editor.deleteCurrentNodeText = (anchorOffset = 0, focusOffset?) => {
        const { selection } = editor
        Transforms.delete(editor, {
            at: {
                anchor: { ...selection.anchor, offset: anchorOffset },
                focus: focusOffset
                    ? { ...selection.anchor, offset: focusOffset }
                    : { ...selection.anchor },
            },
        })
    }

    return editor
}

export default withBase
