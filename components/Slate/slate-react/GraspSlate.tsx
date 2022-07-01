import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Slate } from 'slate-react'
import { Box } from '@chakra-ui/react'

/**
 * Rich Slate
 *
 * It is the provider of the useSlate hook.
 *
 *
 */
export default function GraspSlate({
    value,
    editor,
    onChange,
    children,
    className,
    focusClassName,
}) {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <Box onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)}>
            <Slate value={value} editor={editor} onChange={(value) => onChange(value)}>
                {children}
            </Slate>
        </Box>
    )
}

GraspSlate.propTypes = {
    /** editor created using createRichEditor() */
    editor: PropTypes.object.isRequired,
    /** content to display in the editor*/
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** Called every time there is a change on the value */
    onChange: PropTypes.func,
    /** class to override and style the slate  */
    className: PropTypes.string,
    /** className to apply when the editor has focus */
    focusClassName: PropTypes.string,
}
