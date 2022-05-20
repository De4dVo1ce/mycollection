import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import {
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from '@mui/material'
import React from 'react'
import {
  CollectionColumn,
  CollectionItem,
  Header,
  labels,
  MoreActionOption,
  Paper,
  TextField,
  useKeyShortcut,
} from '../../shared'
import { Page, TEXT_REGEX } from '../AppBase'

interface ItemDetailsFormProps {
  item: CollectionItem
  columns: Array<CollectionColumn>

  isNew: boolean

  dialog: React.ReactNode
  setDialog: (dialog: React.ReactNode) => void

  changeProperty: (propName: string, newVlaue: string) => void
  onSave: () => void
  onClose: () => void
  onSaveAndClose: () => void
  onDelete: () => void
}

export const ItemDetailsForm: React.FC<ItemDetailsFormProps> = ({
  item,
  columns,
  isNew,
  dialog,
  setDialog,
  changeProperty,
  onSave,
  onClose,
  onSaveAndClose,
  onDelete,
}) => {
  const moreActionOptions: Array<MoreActionOption> = [
    {
      type: 'item',
      label: labels.BUTTON_SAVE_AND_CLOSE,
      onClick: onSaveAndClose,
      icon: <SaveIcon />,
    },
    {
      type: 'item',
      label: labels.BUTTON_CLOSE,
      onClick: onClose,
      icon: <CloseIcon />,
    },
  ]

  if (!isNew) {
    moreActionOptions.push(
      { type: 'divider' },
      {
        type: 'item',
        label: labels.BUTTON_DELETE,
        onClick: onDelete,
        icon: <DeleteIcon />,
      }
    )
  }

  const handleSaveKeyShortcut = (event: KeyboardEvent) => {
    event.preventDefault()
    onSave()
  }

  useKeyShortcut('ctrl+s, command+s', (event) => {
    handleSaveKeyShortcut(event)
  })

  return (
    <Page>
      <Header
        text={isNew ? labels.HEADER_ELEMENT_NEW : labels.HEADER_ELEMENT_EDIT}
        variant="h4"
        primary={{
          type: 'button',
          props: {
            text: labels.BUTTON_SAVE,
            startIcon: <SaveIcon />,
            onClick: onSave,
            disabled: !item || !columns,
          },
        }}
        secondary={{
          type: 'more_action',
          props: {
            options: moreActionOptions,
          },
        }}
      />
      <Paper>
        {columns.map((column, index) =>
          column.type === 'enum' ? (
            <MuiFormControl key={index} fullWidth margin="normal">
              <MuiInputLabel>{column.title}</MuiInputLabel>
              <MuiSelect
                label={column.title}
                value={item[column.name] ?? ''}
                onChange={(event) => {
                  changeProperty(column.name, `${event.target.value}`)
                }}
              >
                {column.enum.map((value, index) => (
                  <MuiMenuItem key={index} value={value}>
                    {value}
                  </MuiMenuItem>
                ))}
              </MuiSelect>
            </MuiFormControl>
          ) : column.type === 'string' || column.type === 'number' ? (
            <TextField
              key={index}
              label={column.title}
              value={item[column.name]?.toString() ?? ''}
              setValue={(newValue) => {
                changeProperty(
                  column.name,
                  newValue.match(TEXT_REGEX)?.join('') ?? ''
                )
              }}
            />
          ) : null
        )}
      </Paper>
      {dialog}
    </Page>
  )
}

export default ItemDetailsForm
