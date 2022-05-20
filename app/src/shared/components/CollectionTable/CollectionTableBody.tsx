import {
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from '@mui/material'
import React from 'react'
import { messages } from '../../resources'
import { CollectionTableItem } from './CollectionTable.types'
import { CollectionTableColumn } from './CollectionTable.types'

export interface CollectionTableBodyProps {
  columns: Array<CollectionTableColumn>
  rows: Array<CollectionTableItem>
}

const CollectionTableBody: React.FC<CollectionTableBodyProps> = ({
  columns,
  rows,
}) => {
  return (
    <MuiTableBody>
      {rows.length > 0 ? (
        rows.map((row, index) => (
          <MuiTableRow
            key={`${index}-${row.name}`}
            hover
            role="checkbox"
            tabIndex={-1}
          >
            {columns.map((column, index) =>
              column.dataProvider(column, column.name, row, index)
            )}
          </MuiTableRow>
        ))
      ) : (
        <MuiTableRow>
          <MuiTableCell colSpan={columns.length} align="center">
            {messages.NO_DATA}
          </MuiTableCell>
        </MuiTableRow>
      )}
    </MuiTableBody>
  )
}

export default CollectionTableBody
