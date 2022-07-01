const withLinks = (editor) => {
    const { isInline } = editor
    const LINK_TYPE = 'link'

    /**
     * Set link type not to be an inline element
     */
    editor.isInline = (element) => {
        return element.type === LINK_TYPE ? true : isInline(element)
    }

    /**
     * If the editor loses focus upon pressing the `LinkButton`, you need to call
     * editor.rememberCurrentSelection() before the editor loses the focus
     */
    editor.insertLink = (url) => {
        if (editor.isNodeTypeActive(LINK_TYPE)) {
            editor.unwrapNode(LINK_TYPE)
        }
        // editor selection on link button click
        const wrapSelection = editor.selection || editor.rememberedSelection
        editor.selection = wrapSelection ? wrapSelection : editor.selection
        const node = {
            type: LINK_TYPE,
            url,
            children: editor.isCollapsed() ? [{ text: url }] : [],
        }
        editor.wrapNode(node, wrapSelection)
    }

    return editor
}

export default withLinks
