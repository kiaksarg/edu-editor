import React from 'react'
import { MdCode } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for adding code mono-spaced text mark
 *
 * @see ToolbarButton
 */

const CodeButton = React.forwardRef((props, ref) => (
    <ToolbarButton icon={<MdCode />} type="mark" format="code" ref={ref} {...props} />
))

CodeButton.displayName = 'CodeButton'

export default CodeButton
