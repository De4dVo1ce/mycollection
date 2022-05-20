import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import {
  Divider as MuiDivider,
  IconButton as MuiIconButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
} from '@mui/material'
import React from 'react'

export type MoreActionOption =
  | {
      type: 'item'
      label: string
      icon?: React.ReactNode
      disabled?: boolean
      onClick: () => void
    }
  | {
      type: 'divider'
    }

export interface MoreActionsButtonProps {
  options: Array<MoreActionOption>
}

export const MoreActionsButton: React.FC<MoreActionsButtonProps> = ({
  options,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const onClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <MuiIconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MoreVertIcon />
      </MuiIconButton>
      <MuiMenu anchorEl={anchorEl} open={open} onClose={onClose}>
        {options.map((option, index) =>
          option.type === 'divider' ? (
            <MuiDivider key={index} sx={{ my: 0.5 }} />
          ) : (
            <MuiMenuItem
              key={index}
              disabled={option.disabled}
              onClick={() => {
                onClose()
                option.onClick()
              }}
            >
              <MuiListItemIcon>{option.icon}</MuiListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MuiMenuItem>
          )
        )}
      </MuiMenu>
    </>
  )
}

export default MoreActionsButton
