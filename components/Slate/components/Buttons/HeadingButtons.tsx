import React from 'react'
import { Heading1, Heading2, Heading3 } from '../../icons/headings'
import ToolbarButton from './ToolbarButton'

/**
 * Toolbar button for underline text mark
 *
 * @see ToolbarButton
 *
 */
const HeadingButtons = React.forwardRef((props, ref) => (
    <>
        <ToolbarButton icon={<Heading1 />} type="block" format="heading-one" ref={ref} {...props} />
        <ToolbarButton icon={<Heading2 />} type="block" format="heading-two" ref={ref} {...props} />
        <ToolbarButton
            icon={<Heading3 />}
            type="block"
            format="heading-three"
            ref={ref}
            {...props}
        />
    </>
))

HeadingButtons.displayName = 'HeadingButtons'

export default HeadingButtons
