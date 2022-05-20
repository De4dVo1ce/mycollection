import React from 'react'
import { CollectionColumn, labels } from '../../../../shared'
import { Header } from '../../../../shared/components/Header'
import { Paper } from '../../../../shared/components/Paper'
import ColumnTile from './ColumnTile/ColumnTile'
import { Divider as MuiDivider } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { ColumnNewEditDialog } from './ColumnNewEditDialog/ColumnNewEditDialog'

interface ElementPropertiesPaperProps {
  columns: Array<CollectionColumn>
  setColumns: (columns: Array<CollectionColumn>) => void
  setEditDialog: (dialog: React.ReactNode) => void
}

export const ElementPropertiesPaper: React.FC<ElementPropertiesPaperProps> = ({
  columns,
  setColumns,
  setEditDialog,
}) => {
  const onClickSetDefaultSort = (defaultSortColumn: CollectionColumn) => {
    const temp: Array<CollectionColumn> = []
    columns.forEach((column) => {
      column.default_order_by =
        column.sortable && column.index === defaultSortColumn.index
      temp.push(column)
    })

    setColumns([...temp])
  }

  const onClickChangeColumnState = (changedColumn: CollectionColumn) => {
    const temp: Array<CollectionColumn> = []
    columns.forEach((column) => {
      if (column.index === changedColumn.index) {
        column = changedColumn
      }

      temp.push(column)
    })

    setColumns([...temp])
  }

  const onMoveUpward = (movedColumn: CollectionColumn) => {
    const temp: Array<CollectionColumn> = []
    columns.forEach((column) => {
      if (column.index !== movedColumn.index) {
        if (column.index === movedColumn.index - 1) {
          temp.push({ ...movedColumn, index: movedColumn.index - 1 })
          temp.push({ ...column, index: column.index + 1 })
        } else {
          temp.push(column)
        }
      }
    })

    setColumns([...temp])
  }

  const onMoveDownward = (movedColumn: CollectionColumn) => {
    const temp: Array<CollectionColumn> = []
    columns.forEach((column) => {
      if (column.index !== movedColumn.index) {
        if (column.index === movedColumn.index + 1) {
          temp.push({ ...column, index: column.index - 1 })
          temp.push({ ...movedColumn, index: movedColumn.index + 1 })
        } else {
          temp.push(column)
        }
      }
    })

    setColumns([...temp])
  }

  const onDeleteColumnClick = (deleteColumn: CollectionColumn) => {
    const temp: Array<CollectionColumn> = []
    columns
      .filter((column) => column.index !== deleteColumn.index)
      .forEach((column) => {
        if (column.index > deleteColumn.index) {
          column.index -= 1
        }

        temp.push(column)
      })
    setColumns([...temp])
  }

  const onCreateColumnClick = () => {
    setEditDialog(
      <ColumnNewEditDialog
        isNew
        column={
          {
            default_order_by: false,
            show_in_desktop: false,
            show_in_mobile: false,
            sortable: false,
            searchable: false,
          } as CollectionColumn
        }
        onClose={(save, column) => {
          if (save && column) {
            const temp = [...columns]
            temp.push({ ...column, index: temp.length })
            setColumns([...temp])
          }
          setEditDialog(null)
        }}
      />
    )
  }

  const onEditColumnClick = (editColumn: CollectionColumn) => {
    setEditDialog(
      <ColumnNewEditDialog
        column={editColumn}
        onClose={(save, editColumn) => {
          if (save && editColumn) {
            const temp: Array<CollectionColumn> = [...columns]
            temp[editColumn.index] = editColumn

            setColumns([...temp])
          }
          setEditDialog(null)
        }}
      />
    )
  }
  /*
  columns.forEach((column) => {
    if (column.default_order_by && !column.sortable) {
      column.default_order_by = false
    }
  })
  */

  return (
    <Paper>
      <Header
        text={labels.LABEL_ELEMENT_PROPERTIES}
        variant="h5"
        primary={{
          type: 'button',
          props: {
            startIcon: <AddIcon />,
            text: labels.BUTTON_CREATE,
            onClick: onCreateColumnClick,
          },
        }}
      />
      {columns.map((column, index) => (
        <div key={index}>
          <ColumnTile
            length={columns.length}
            index={index}
            column={column}
            clickSetDefaultSort={onClickSetDefaultSort}
            onStateChange={onClickChangeColumnState}
            onMoveUpward={onMoveUpward}
            onMoveDownward={onMoveDownward}
            onEdit={() => {
              onEditColumnClick(column)
            }}
            onDelete={() => {
              onDeleteColumnClick(column)
            }}
          />
          {index < columns.length - 1 && (
            <MuiDivider
              orientation="horizontal"
              variant="middle"
              sx={{ mx: 0, my: 2 }}
            />
          )}
        </div>
      ))}
    </Paper>
  )
}
