import { KeyboardArrowDown } from '@mui/icons-material'
import {
  ButtonProps as MuiButtonProps,
  IconButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps,
} from '@mui/material'
import React from 'react'
import { Button } from '../Button'

export type MenuEntry = MenuItemProps & {
  text: string
}

export interface MenuProps {
  button: MuiButtonProps & {
    text?: string
    menuType: 'button' | 'iconButton'
  }
  menu: {
    entries: Array<MenuEntry>
  }
  value: string | number
  onChangeValue: (newValue: string | number) => void
}

export const Menu: React.FC<MenuProps> = ({
  button,
  menu,
  value,
  onChangeValue,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const onClick = (newValue: string) => {
    if (newValue && `${newValue}` !== `${value}`) {
      onChangeValue(newValue)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {button.type === 'button' ? (
        <Button onClick={handleClick} endIcon={<KeyboardArrowDown />}>
          {button.text}
        </Button>
      ) : (
        <IconButton onClick={handleClick}>
          <KeyboardArrowDown />
        </IconButton>
      )}

      <MuiMenu
        sx={{ width: 'auto' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
      >
        {menu.entries.map((entry, index) => (
          <MuiMenuItem
            key={index}
            {...entry}
            onClick={() => {
              handleClose()
              console.log(entry.value)
              onClick(`${entry.value}`)
            }}
          >
            {entry.text}
          </MuiMenuItem>
        ))}
      </MuiMenu>
    </>
  )
}

export default Menu
