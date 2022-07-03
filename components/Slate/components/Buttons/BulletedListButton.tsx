import React from 'react'
import { MdFormatListBulleted } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for underlined text mark
 *
 * @see ToolbarButton
 *
 */
const BulletedListButton = React.forwardRef((props, ref) => (
    <ToolbarButton
        icon={<MdFormatListBulleted />}
        type="block"
        format="bulleted-list"
        ref={ref}
        {...props}
    />
))

BulletedListButton.displayName = 'BulletedListButton'

export default BulletedListButton
