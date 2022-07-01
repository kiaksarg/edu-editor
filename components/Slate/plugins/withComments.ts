const withComments = (editor) => {
    const { isInline } = editor

    const COMMENT_TYPE = 'comment'

    /**
     * Set comment type not to be an inline element
     */
    editor.isInline = (element) => {
        return element.type === COMMENT_TYPE ? true : isInline(element)
    }

    /**
     * If the editor loses focus upon pressing the `AddCommentButton`, you need to call
     * editor.rememberCurrentSelection() before the editor loses the focus
     *
     * `data` cannot contain the following items: id, type or children.
     */
    editor.addComment = (id, data) => {
        const node = {
            id: id,
            type: COMMENT_TYPE,
            children: [],
            data, //any data of the comment will be an attribute.
        }
        editor.wrapNode(node, editor.selection || editor.rememberedSelection)
    }

    /**
     * Synchronizes comments.
     *
     * It receives a list of comments.
     *  - Comments that are in the editor but not in the list are deleted
     *  - Contents of the comments that are in the list are updated.
     *
     * Each comment is identified by `id` attribute in the node.
     *
     * @param {Array} commentsToKeep is a list of comment objects that have an attribute `id`.
     */
    editor.syncComments = (commentsToKeep) => {
        editor.syncExternalNodes(COMMENT_TYPE, commentsToKeep)
    }

    return editor
}
export default withComments
