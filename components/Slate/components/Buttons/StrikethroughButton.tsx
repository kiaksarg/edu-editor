import React from 'react'
import { MdStrikethroughS } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for strike through text mark
 *
 * @see ToolbarButton
 */

const StrikethroughButton = React.forwardRef((props, ref) => (
    <ToolbarButton
        icon={<MdStrikethroughS />}
        type="mark"
        format="strikethrough"
        ref={ref}
        {...props}
    />
))

StrikethroughButton.displayName = 'StrikethroughButton'

export default StrikethroughButton
