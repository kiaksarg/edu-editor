import React from 'react'
import { MdFormatBold } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for bold text mark
 *
 * @see ToolbarButton
 */

const BoldButton = React.forwardRef((props, ref) => (
    <ToolbarButton icon={<MdFormatBold />} type="mark" format="bold" ref={ref} {...props} />
))

BoldButton.displayName = 'BoldButton'

export default BoldButton
