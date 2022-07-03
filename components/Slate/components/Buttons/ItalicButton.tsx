import React from 'react'
import { MdFormatItalic } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for italic text mark
 *
 * @see ToolbarButton
 */

const ItalicButton = React.forwardRef((props, ref) => (
    <ToolbarButton icon={<MdFormatItalic />} type="mark" format="italic" ref={ref} {...props} />
))

ItalicButton.displayName = 'ItalicButton'

export default ItalicButton
