import { MenuList, MenuItem, MenuDivider, useColorModeValue, Box } from '@chakra-ui/react'
import React from 'react'
import { SlateMenus } from '../..'

const SlateMenuList = ({ editor, editorRef, ref = null }) => {
    const menuListBorderColor = useColorModeValue('1px solid #ddd', '1px solid #444')
    const menuListBGColor = useColorModeValue('white', 'gray.800')
    const menuListColor = useColorModeValue('black', 'white')

    const menuItemBorderColor = useColorModeValue('blue.500', 'blue.400')
    const menuItemBorderColor2 = useColorModeValue('white', 'gray.800')
    const menuItemBGColor = useColorModeValue('blue.100', 'blue.600')
    return (
        <MenuList
            ref={ref}
            key="SlateSideMenuList"
            minWidth="185px"
            height="300px"
            overflow="auto"
            border={menuListBorderColor}
            css={{
                '&::-webkit-scrollbar': {
                    height: '8px',
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    height: '6px',
                    width: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#d1d1d1',
                    // borderRadius: '24px',
                },
            }}
            // boxShadow="0 2px 2px rgba(0, 0, 0, 0.4)"
            // boxShadow="0 1px 4px 0 rgb(0 0 0 / 50%)"
            boxShadow="base"
            bg={menuListBGColor}
            color={menuListColor}
            // p="0"
            // my="3px"
            borderRadius="0"
            _hover={{}}
        >
            {SlateMenus.map((x, idx) => {
                const isMenuItemActive = editor.isBlockActive(x.type)
                return (
                    <Box key={x.type + '-Box-' + idx}>
                        <MenuItem
                            key={x.type + '-MenuHandler-' + idx}
                            onClick={() => {
                                editor.toggleBlock(x.type)
                                editorRef.focus()
                            }}
                            px="4"
                            borderRadius="0"
                            boxSizing="border-box"
                            borderLeftWidth="3px"
                            // {editor.isBlockActive(x.type)&&
                            backgroundColor={isMenuItemActive && menuItemBGColor}
                            borderColor={
                                isMenuItemActive ? menuItemBorderColor : menuItemBorderColor2
                            }
                            _hover={{
                                backgroundColor: menuItemBGColor,
                                borderLeftWidth: '3px',
                                borderColor: menuItemBorderColor,
                            }}
                            icon={x.icon}
                        >
                            {x.name}
                        </MenuItem>
                        {x.divider && <MenuDivider key={x.type + 'Divider-' + idx} />}
                    </Box>
                )
            })}
        </MenuList>
    )
}

export default SlateMenuList
