import React from 'react'
import { MdFormatQuote } from 'react-icons/md'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for underline text mark
 *
 * @see ToolbarButton
 *
 */
const BlockquoteButton = React.forwardRef((props, ref) => (
    <ToolbarButton
        icon={<MdFormatQuote />}
        type="block"
        format="block-quote"
        ref={ref}
        {...props}
    />
))

BlockquoteButton.displayName = 'BlockquoteButton'

export default BlockquoteButton
