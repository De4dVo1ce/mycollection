import {
  TableBody as MUITableBody,
  TableCell as MUITableCell,
  TableRow as MUITableRow,
} from '@mui/material'
import React from 'react'
import { CollectionItem } from '../../resources/datastores.types'
import { CollectionTableColumn } from './CollectionTable.types'

export interface CollectionTableBodyProps {
  columns: Array<CollectionTableColumn>
  rows: Array<CollectionItem>
  rowsPerPage: number
  page: number
}

const CollectionTableBody: React.FC<CollectionTableBodyProps> = ({
  columns,
  rows,
  rowsPerPage,
  page,
}) => {
  return (
    <MUITableBody>
      {rows.length > 0 ? (
        rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <MUITableRow
              key={`${index}-${row.name}`}
              hover
              role="checkbox"
              tabIndex={-1}
            >
              {columns.map((column, index) =>
                column.dataProvider(column, column.name, row, index, '40px')
              )}
            </MUITableRow>
          ))
      ) : (
        <MUITableRow>
          <MUITableCell colSpan={columns.length} align="center">
            {'No Data Found'}
          </MUITableCell>
        </MUITableRow>
      )}
    </MUITableBody>
  )
}

export default CollectionTableBody
