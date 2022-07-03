import React from 'react'
import { MdFormatUnderlined } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for underlined text mark
 *
 * @see ToolbarButton
 */
const UnderlineButton = React.forwardRef((props, ref) => (
    <ToolbarButton
        icon={<MdFormatUnderlined />}
        type="mark"
        format="underline"
        ref={ref}
        {...props}
    />
))

UnderlineButton.displayName = 'UnderlineButton'

export default UnderlineButton
