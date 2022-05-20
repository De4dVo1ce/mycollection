import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableRow as MuiTableRow,
} from '@mui/material'
import React from 'react'
import { messages } from '../../../../../shared'
import { COLLECTION_TABLE_CELL_HEIGHT } from '../../../../AppBase'

const tableColumns = [
  { label: 'Value', name: 'value', width: 'auto' },
  { label: '', name: 'delete', width: '25px' },
]

export type EnumValueRow = {
  value: string
  delete: React.ReactNode
  [key: string]: any
}

interface EnumValuesTableProps {
  rows: Array<EnumValueRow>
}

export const EnumValuesTable: React.FC<EnumValuesTableProps> = ({ rows }) => {
  return (
    <MuiTableContainer sx={{ maxHeight: '200px' }}>
      <MuiTable>
        <MuiTableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <MuiTableRow key={rowIndex}>
                {tableColumns.map((column, colIndex) => (
                  <MuiTableCell
                    key={`${rowIndex}-${colIndex}`}
                    height={COLLECTION_TABLE_CELL_HEIGHT}
                    width={column.width}
                  >
                    {row[column.name]}
                  </MuiTableCell>
                ))}
              </MuiTableRow>
            ))
          ) : (
            <MuiTableRow>
              <MuiTableCell
                colSpan={tableColumns.length}
                align="center"
                height={COLLECTION_TABLE_CELL_HEIGHT}
              >
                {messages.NO_DATA}
              </MuiTableCell>
            </MuiTableRow>
          )}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  )
}

export default EnumValuesTable
