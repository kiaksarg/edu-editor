export const getEditorId = (element) => {
    let editor: HTMLElement = null
    if (element) {
        if (element?.closest) {
            editor = element.closest('[data-editor-name]')
            if (editor) return editor.getAttribute('data-editor-name')
        } else {
            while (
                (element = element.parentElement) &&
                !(element.matches || element.matchesSelector).call(element, '[data-editor-name]')
            );

            if (element) return element.getAttribute('data-editor-name')
        }
    }

    return null
}
