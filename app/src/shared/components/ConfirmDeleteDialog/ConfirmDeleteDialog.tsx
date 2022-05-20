import {
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText as MuiDialogContentText,
  DialogTitle as MuiDialogTitle,
} from '@mui/material'
import React from 'react'
import { labels } from '../../resources'
import { Button } from '../Button'

interface ConfirmDeleteDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
}) => {
  return (
    <MuiDialog open onClose={onClose}>
      <MuiDialogTitle>{title}</MuiDialogTitle>
      <MuiDialogContent>
        <MuiDialogContentText>{message}</MuiDialogContentText>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={onConfirm}>{labels.BUTTON_DELETE}</Button>
        <Button onClick={onCancel}>{labels.BUTTON_CANCEL}</Button>
      </MuiDialogActions>
    </MuiDialog>
  )
}
