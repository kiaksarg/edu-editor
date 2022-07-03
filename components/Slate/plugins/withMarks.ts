import GraspEditor from '../GraspEditor'

/**
 * Helper functions for managing inline marks
 *
 * @param {Editor} editor
 */
const withMarks = (editor) => {
    /**
     * Checks if the mark is active
     *
     * @param {String} mark Mark to validate For example: 'bold', 'italic'
     */
    editor.isMarkActive = (mark): boolean => {
        const marks = GraspEditor.marks(editor)
        return marks ? marks[mark] === true : false
    }

    /**
     * Toggles on/off the mark. If the mark exists it is removed and vice versa.
     *
     * @param {String} mark Mark to validate For example: 'bold', 'italic'
     */
    editor.toggleMark = (mark: string) => {
        editor.isMarkActive(mark)
            ? GraspEditor.removeMark(editor, mark)
            : GraspEditor.addMark(editor, mark, true)
    }
    return editor
}

export default withMarks
