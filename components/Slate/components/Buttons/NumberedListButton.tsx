import React from 'react'
import { MdFormatListNumbered } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for numbered list block
 *
 * @see ToolbarButton
 */

const NumberedListButton = React.forwardRef((props, ref) => (
    <ToolbarButton
        icon={<MdFormatListNumbered />}
        type="block"
        format="numbered-list"
        ref={ref}
        {...props}
    />
))

NumberedListButton.displayName = 'NumberedListButton'

export default NumberedListButton
