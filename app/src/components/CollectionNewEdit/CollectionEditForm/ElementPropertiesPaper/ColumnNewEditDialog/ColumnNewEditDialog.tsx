import { Add as AddIcoon, Delete as DeleteIcon } from '@mui/icons-material'
import {
  Button as MuiButton,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  FormControl as MuiFormControl,
  IconButton as MuiIconButton,
  InputLabel as MuiInputLabel,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from '@mui/material'
import React from 'react'
import {
  Button,
  CollectionColumn,
  ColumnType,
  DividerBox,
  labels,
  TextField,
  ValueType,
} from '../../../../../shared'
import {
  AddButtonDiv,
  AddEnumValueDiv,
  EnumValueTextField,
} from './ColumnNewEditDialog.styles'
import EnumValuesTable, { EnumValueRow } from './EnumValuesTable'

interface ColumnNewEditDialogProps {
  column: CollectionColumn
  onClose: (save: boolean, column?: CollectionColumn) => void
  isNew?: boolean
}

export const ColumnNewEditDialog: React.FC<ColumnNewEditDialogProps> = ({
  column,
  onClose,
  isNew = false,
}) => {
  const [title, setTitle] = React.useState<string>(column.title ?? '')
  const [type, setType] = React.useState<ColumnType | undefined>(column.type)
  const [enumType, setEnumType] = React.useState<ValueType | undefined>(
    column.type === 'enum' ? column.enum_type : undefined
  )
  const [enumValues, setEnumValues] = React.useState<Array<string>>(
    column.type === 'enum' ? column.enum : []
  )
  const [newValue, setNewValue] = React.useState<string>('')

  const onChangeType = (newType: string) => {
    switch (newType) {
      case 'string':
        setType('string')
        break
      case 'number':
        setType('number')
        break
      case 'enum':
        setType('enum')
        break

      default:
        setType(undefined)
        break
    }

    setEnumType(undefined)
    setEnumValues([])
  }

  const onChangeEnumType = (newType: string) => {
    switch (newType) {
      case 'string':
        setEnumType('string')
        break
      case 'number':
        setEnumType('number')
        break

      default:
        setEnumType(undefined)
        break
    }
  }

  const onAddEnumValueClick = () => {
    const temp = [...enumValues]
    temp.push(newValue)
    setEnumValues([...temp])
    setNewValue('')
  }

  const onDeleteEnumValue = (index: number) => {
    const temp: Array<string> = []
    enumValues.forEach((value, indexB) => {
      if (indexB !== index) {
        temp.push(value)
      }
    })

    setEnumValues([...temp])
  }

  const onSaveClick = () => {
    const newColumn = {
      ...column,
      title: title,
      name: title.replaceAll(' ', '_').toLowerCase(),
      type: type,
    }
    onClose(
      true,
      (type === 'enum'
        ? {
            ...newColumn,
            enum_type: enumType,
            enum: enumValues,
          }
        : newColumn) as CollectionColumn
    )
  }

  const canBeSaved =
    title &&
    title.length > 0 &&
    type &&
    (type !== 'enum' || (type === 'enum' && enumType && enumValues.length > 0))

  const enumValuesRows: Array<EnumValueRow> = enumValues.map(
    (value, indexA) => ({
      value: value,
      delete: (
        <MuiIconButton
          style={{ padding: 0 }}
          onClick={() => onDeleteEnumValue(indexA)}
        >
          <DeleteIcon color="error" />
        </MuiIconButton>
      ),
    })
  )

  return (
    <MuiDialog
      open
      onClose={() => {
        onClose(false)
      }}
      fullWidth
    >
      <MuiDialogTitle>
        {isNew ? labels.HEADER_COLUMN_CREATE : labels.HEADER_COLUMN_EDIT}
      </MuiDialogTitle>
      <MuiDialogContent>
        <TextField
          label={labels.LABEL_NAME}
          value={title}
          setValue={(newTitle) => {
            setTitle(newTitle)
          }}
        />
        <DividerBox />
        <MuiFormControl fullWidth>
          <MuiInputLabel id="type-select-label">{'Type'}</MuiInputLabel>
          <MuiSelect
            labelId="type-select-label"
            value={type ?? ''}
            label={labels.LABEL_TYPE}
            onChange={(event) => {
              onChangeType(event.target.value)
            }}
          >
            <MuiMenuItem value={'string'}>{'Text'}</MuiMenuItem>
            <MuiMenuItem value={'number'}>{'Number'}</MuiMenuItem>
            <MuiMenuItem value={'enum'}>{'Custom'}</MuiMenuItem>
            {/*<MuiMenuItem value={'flag'}>{'Flag'}</MuiMenuItem>*/}
          </MuiSelect>
        </MuiFormControl>
        {type && (type === 'enum' || type === 'flag') && (
          <>
            <DividerBox />
            <MuiFormControl fullWidth>
              <MuiInputLabel id="enum-type-select-label">
                {labels.LABEL_CUSTOM_TYPE}
              </MuiInputLabel>
              <MuiSelect
                labelId="enum-type-select-label"
                value={enumType ?? ''}
                label={labels.LABEL_CUSTOM_TYPE}
                onChange={(event) => {
                  onChangeEnumType(event.target.value ?? '')
                }}
              >
                <MuiMenuItem value={'string'}>{'Text'}</MuiMenuItem>
                <MuiMenuItem value={'number'}>{'Number'}</MuiMenuItem>
              </MuiSelect>
            </MuiFormControl>
            {enumType && (
              <>
                <DividerBox />
                <AddEnumValueDiv>
                  <EnumValueTextField
                    value={newValue}
                    onChange={(event) => {
                      setNewValue(event.target.value)
                    }}
                  />
                  <AddButtonDiv>
                    <Button
                      placement="right"
                      startIcon={<AddIcoon />}
                      variant="contained"
                      onClick={onAddEnumValueClick}
                      disabled={newValue.length === 0}
                    >
                      {labels.BUTTON_ADD}
                    </Button>
                  </AddButtonDiv>
                </AddEnumValueDiv>
                <DividerBox />
                <EnumValuesTable rows={enumValuesRows} />
              </>
            )}
          </>
        )}
      </MuiDialogContent>
      <MuiDialogActions>
        <MuiButton
          variant="contained"
          disabled={!canBeSaved}
          onClick={onSaveClick}
        >
          {labels.BUTTON_SAVE}
        </MuiButton>
        <MuiButton variant="contained" onClick={() => onClose(false)}>
          {labels.BUTTON_CANCEL}
        </MuiButton>
      </MuiDialogActions>
    </MuiDialog>
  )
}
