import { KeyboardArrowDown } from '@mui/icons-material'
import {
  Chip,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps,
} from '@mui/material'
import React from 'react'

export type ChipMenuEntry = MenuItemProps & {
  text: string
}

export interface ChipMenuProps {
  chip: {
    text: string
  }
  menu: {
    entries: Array<ChipMenuEntry>
  }
  value: string | number
  onChangeValue: (newvalue: string | number) => void
}

export const ChipMenu: React.FC<ChipMenuProps> = ({
  chip,
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
      <Chip
        label={chip.text}
        onDelete={handleClick}
        deleteIcon={<KeyboardArrowDown />}
        color="primary"
      />
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

export default ChipMenu
