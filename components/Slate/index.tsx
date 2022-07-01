// slate package overwrites
import GraspEditor from './GraspEditor'
import CreateGraspEditor from './createGraspEditor'

//plugins
import withComments from './plugins/withComments'
import withEndnotes from './plugins/withEndnotes'
import withCounter from './plugins/withCounter'
import withLinks from './plugins/withLinks'

// slate-react package overwrites
import GraspSlate from './slate-react/GraspSlate'
import GraspEditable from './slate-react/GraspEditable'
import defaultRenderElement from './slate-react/defaultRenderElement'
import defaultRenderLeaf from './slate-react/defaultRenderLeaf'
import defaultHotkeys from './slate-react/defaultHotkeys'

//Toolbar and base button components
import HoveringToolbar from './components/Toolbars/HoveringToolbar'
import ToolbarButton from './components/Buttons/ToolbarButton'
import ButtonSeparator from './components/Buttons/ButtonSeparator'
//Block and mark Buttons
import BoldButton from './components/Buttons/BoldButton'
import ItalicButton from './components/Buttons/ItalicButton'
import StrikethroughButton from './components/Buttons/StrikethroughButton'
import CodeButton from './components/Buttons/CodeButton'
import UnderlineButton from './components/Buttons/UnderlineButton'
import BulletedListButton from './components/Buttons/BulletedListButton'
import NumberedListButton from './components/Buttons/NumberedListButton'

//menu
import { BiParagraph } from 'react-icons/bi'
import { MdFormatListBulleted, MdFormatListNumbered, MdFormatQuote, MdTitle } from 'react-icons/md'
import React from 'react'
import { Heading1, Heading2, Heading3 } from './icons/headings'

export type GraspSlateElement = Element & { type: string }

export const SlateMenus = [
    {
        name: 'Paragraph',
        type: 'paragraph',
        icon: <BiParagraph />,
        divider: true,
    },
    {
        name: 'Heading Title',
        type: 'heading-0',
        icon: <MdTitle size="20px" />,
        divider: false,
    },
    {
        name: 'Heading 1',
        type: 'heading-1',
        icon: <Heading1 />,
        divider: false,
    },
    {
        name: 'Heading 2',
        type: 'heading-2',
        icon: <Heading2 />,
        divider: false,
    },
    {
        name: 'Heading 3',
        type: 'heading-3',
        icon: <Heading3 />,
        divider: true,
    },
    {
        name: 'Bulleted List',
        type: 'bulleted-list',
        icon: <MdFormatListBulleted />,
        divider: false,
    },
    {
        name: 'Numbered List',
        type: 'numbered-list',
        icon: <MdFormatListNumbered />,
        divider: true,
    },
    {
        name: 'Quote Block',
        type: 'block-quote',
        icon: <MdFormatQuote />,
        divider: false,
    },
]

export {
    GraspEditor,
    GraspSlate,
    GraspEditable,
    CreateGraspEditor as createGraspEditor,
    withComments,
    withEndnotes,
    defaultRenderElement,
    defaultRenderLeaf,
    HoveringToolbar,
    ToolbarButton,
    ButtonSeparator,
    BoldButton,
    ItalicButton,
    StrikethroughButton,
    CodeButton,
    UnderlineButton as UnderlinedButton,
    BulletedListButton,
    NumberedListButton,
    withCounter,
    withLinks,
    defaultHotkeys,
}
