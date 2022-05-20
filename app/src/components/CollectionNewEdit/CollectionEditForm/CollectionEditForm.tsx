import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import React from 'react'
import {
  CollectionColumn,
  DividerBox,
  Header,
  labels,
  Loading,
  MoreActionOption,
  Paper,
  TextField,
  useKeyShortcut,
} from '../../../shared'
import { documentNames, Page } from '../../AppBase'
import { CollectionEditDiv, PropEditDiv } from './CollectionEditForm.styles'
import { ElementPropertiesPaper } from './ElementPropertiesPaper/ElementPropertiesPaper'

interface CollectionEditFormProps {
  isNew: boolean
  loading: boolean

  name: string
  setName: (name: string) => void

  description: string
  setDescription: (description: string) => void

  columns: Array<CollectionColumn>
  setColumns: (column: Array<CollectionColumn>) => void

  dialog: React.ReactNode
  setDialog: (dialog: React.ReactNode) => void

  onSave: () => void
  onSaveAndClose: () => void
  onClose: () => void
  onDelete: () => void
}

export const CollectionEditForm: React.FC<CollectionEditFormProps> = ({
  isNew,
  loading,
  name,
  setName,
  description,
  setDescription,
  columns,
  setColumns,
  dialog,
  setDialog,
  onSave,
  onSaveAndClose,
  onClose,
  onDelete,
}) => {
  document.title = isNew
    ? documentNames.collection('New').page
    : documentNames.collection(name).edit

  const isName = name.length > 0

  const isMinShowDesktop =
    columns.filter((column) => column.show_in_desktop).length > 0

  const isMinShowMobile =
    columns.filter((column) => column.show_in_mobile).length > 0

  const areColumns =
    columns.length > 0 ? isMinShowDesktop && isMinShowMobile : true

  const canBeSaved = isName && areColumns

  const moreActionsOptions: Array<MoreActionOption> = [
    {
      type: 'item',
      label: labels.BUTTON_SAVE_AND_CLOSE,
      icon: <SaveIcon />,
      onClick: onSaveAndClose,
      disabled: !canBeSaved,
    },
  ]

  if (!isNew) {
    moreActionsOptions.push(
      {
        type: 'item',
        label: labels.BUTTON_CLOSE,
        icon: <CloseIcon />,
        onClick: onClose,
      },
      {
        type: 'divider',
      },
      {
        type: 'item',
        label: labels.BUTTON_DELETE,
        icon: <DeleteIcon />,
        onClick: onDelete,
      }
    )
  }

  const handleSaveKeyShortcut = (event: KeyboardEvent) => {
    event.preventDefault()
    if (canBeSaved && !dialog) {
      onSave()
    }
  }

  useKeyShortcut(
    'ctrl+s, command+s',
    (event) => {
      handleSaveKeyShortcut(event)
    },
    [columns]
  )

  return (
    <Page>
      <Header
        text={name}
        variant="h4"
        primary={{
          type: 'button',
          props: {
            text: labels.BUTTON_SAVE,
            startIcon: <SaveIcon />,
            onClick: onSave,
            disabled: !canBeSaved,
          },
        }}
        secondary={{
          type: 'more_action',
          props: {
            options: moreActionsOptions,
          },
        }}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <Paper>
            <CollectionEditDiv>
              <PropEditDiv>
                <TextField
                  label={labels.LABEL_COLLECTION_NAME}
                  value={name}
                  setValue={(newName) => {
                    setName(newName)
                  }}
                />
              </PropEditDiv>
            </CollectionEditDiv>
            <DividerBox />
            <DividerBox />
            <CollectionEditDiv>
              <PropEditDiv>
                <TextField
                  label={labels.LABEL_COLLECTION_DESCRIPTION}
                  value={description}
                  multiline
                  setValue={(newDescription) => {
                    setDescription(newDescription)
                  }}
                />
              </PropEditDiv>
            </CollectionEditDiv>
          </Paper>
          {!isNew && (
            <ElementPropertiesPaper
              columns={columns}
              setColumns={setColumns}
              setEditDialog={setDialog}
            />
          )}
          {dialog}
        </>
      )}
    </Page>
  )
}
