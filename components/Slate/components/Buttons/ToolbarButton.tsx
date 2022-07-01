import React from 'react'
import { ReactEditor, useSlate } from 'slate-react'
import PropTypes from 'prop-types'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { Editor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { MdCropSquare } from 'react-icons/md'
import { FC } from 'react'
import { SlateGraspEditor } from '../../slateTypes'

type EditorProps = Editor | ReactEditor | HistoryEditor

/**
 * ToolbarButton is the base button for any button on the toolbars.
 * It requires the `type` of action to perform and the format that will be added.
 *
 * It displays a tooltip text on hover. If tooltip text is not passed as a prop it will use the capitalized text of the format
 */
const ToolbarButton: FC<any> = React.forwardRef(
    (
        {
            tooltip,
            placement,
            icon,
            type,
            disabled,
            disableOnSelection,
            disableOnCollapse,
            format,
            onMouseDown,
            isActive,
            ...rest
        },
        ref
    ) => {
        const editor: SlateGraspEditor = useSlate()

        /**
         * If no tooltip prop is passed it generates a default based on the format string.
         * Converts - into spaces and uppercases the first letter of the first word.
         */
        const defaultTooltip = () => {
            return (format.charAt(0).toUpperCase() + format.substring(1)).replace('-', ' ')
        }

        /**
         * Toggles mark| block and forwards the onMouseDown event
         */
        const handleOnMouseDown = (event) => {
            event.preventDefault()
            switch (type) {
                case 'mark':
                    editor.toggleMark(format)
                    break
                case 'block':
                    editor.toggleBlock(format)
            }
            onMouseDown && onMouseDown({ editor, format, type, event })
        }

        const checkIsActive = () => {
            if (isActive) {
                return isActive()
            }

            switch (type) {
                case 'mark':
                    return editor.isMarkActive(format)
                case 'block':
                    return editor.isBlockActive(format)
                case 'link':
                    return editor.isNodeTypeActive(format)
            }
            return
        }

        /**
         * Conditionally disables the button
         */
        const isDisabled = () => {
            let disabled = false
            disabled = disableOnSelection ? editor.isSelectionExpanded() : false
            disabled = disableOnCollapse ? editor.isSelectionCollapsed() : disabled
            return disabled
        }

        return disabled || isDisabled() ? (
            <IconButton
                aria-label={tooltip ? tooltip : defaultTooltip()}
                variant={checkIsActive() ? 'solid' : 'ghost'}
                ref={ref}
                isActive={checkIsActive()}
                onMouseDown={(event) => handleOnMouseDown(event)}
                disabled={disabled || isDisabled()}
                height="8"
                {...rest}
            >
                {icon}
            </IconButton>
        ) : (
            <Tooltip label={tooltip ? tooltip : defaultTooltip()} placement={placement}>
                <IconButton
                    aria-label={tooltip ? tooltip : defaultTooltip()}
                    variant={checkIsActive() ? 'solid' : 'ghost'}
                    ref={ref}
                    isActive={checkIsActive()}
                    onMouseDown={(event) => handleOnMouseDown(event)}
                    disabled={disabled || isDisabled()}
                    height="8"
                    {...rest}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }
)

export default ToolbarButton

ToolbarButton.defaultProps = {
    placement: 'top',
    icon: <MdCropSquare />,
    disableOnCollapse: false,
    disableOnSelection: false,
}

// PropTypes
ToolbarButton.propTypes = {
    /**
     * Text displayed on the button tooltip. By Default it is the capitalized `format` string.
     * For instance, `bold` is displayed as `Bold`.
     */
    tooltip: PropTypes.string,

    /**
     * Location where the tooltip will appear.
     * It can be `top`, `bottom`, `left`, `right`. Defaults to top.
     */
    placement: PropTypes.string,

    /**
     * Toolbar button has the option of adding to the editor value marks and blocks.
     *
     * `mark` can be added to the editor value when you want to add something like `bold`, `italic`...
     *  Marks are rendered into HTML in `renderLeaf` of `GraspEditable`
     *
     * `block` to be added to the editor `value` when the button is pressed. For example: `header1`, `numbered-list`...
     *  `renderElement` of the `RichEditable` component will need to handle the actual conversion from mark to HTML/Component on render time.
     *
     * If you don't want to add a mark or a block do not set the prop or use whatever string.
     * You can perform the action the button triggers using onMouseDown().
     */
    type: PropTypes.string,

    /**
     *
     * The string that identifies the format of the block or mark to be added. For example: `bold`, `header1`...
     */
    format: PropTypes.string.isRequired,

    /**
     *
     * When a button is active it means the button is highlighted. For example, if in current position of the cursor,
     * the text is bold, the bold button should be active.
     *
     * isActive is a function that returns true/false to indicate the status of the mark/block.
     * Set this function if you need to handle anything other than standard mark or blocks.
     */
    isActive: PropTypes.func,

    /**
     * Unconditionally disables the button
     *
     * Disable a button means that the button cannot be clicked (note it is not the opposite of isActive)
     */
    disabled: PropTypes.bool,
    /**
     * If true, disables the button if there is a text selected on the editor.
     *
     * Disable a button means that the button cannot be clicked.
     *
     * Use either disableOnSelection or disableOnCollapse, but not both.
     */
    disableOnSelection: PropTypes.bool,

    /**
     * If true, disables the button when  there is no text selected or the editor has no focus.
     *
     * Disable a button means that button cannot be clicked.
     *
     * Use either disableOnSelection or disableOnCollapse, but not both.
     */
    disableOnCollapse: PropTypes.bool,

    /**
     * Instance a component. The icon that will be displayed. Typically an icon from @material-ui/icons
     */
    icon: PropTypes.object,

    /**
     * On mouse down event is passed up to the parent with props that can be deconstructed in {editor, event, mark/block}
     */
    onMouseDown: PropTypes.func,
}
