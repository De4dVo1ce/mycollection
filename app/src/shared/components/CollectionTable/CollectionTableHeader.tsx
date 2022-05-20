import React from 'react'
import {
  TableCell as MUITableCell,
  TableHead as MUITableHead,
  TableRow as MUITableRow,
  TableSortLabel as MUITableSortLabel,
} from '@mui/material'
import { CollectionTableColumn } from './CollectionTable.types'
import { SortOrder } from '../../utils'

export interface CollectionTableHeaderProps {
  columns: Array<CollectionTableColumn>
  orderBy: string
  order: SortOrder
}

const CollectionTableHeader: React.FC<CollectionTableHeaderProps> = ({
  columns,
  orderBy,
  order,
}) => {
  const onSortClick = (column: CollectionTableColumn) => {
    if (column.name === orderBy) {
      column.setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      column.setOrderBy()
      column.setOrder('asc')
    }
  }

  return (
    <MUITableHead>
      <MUITableRow>
        {columns.map((column) => (
          <MUITableCell
            key={column.name}
            style={{
              padding: '0px 10px',
              height: '40px',
              textAlign: 'left',
            }}
            variant="head"
          >
            {column.sortable ? (
              <MUITableSortLabel
                active={column.name === orderBy}
                direction={column.name === orderBy ? order : 'asc'}
                onClick={() => {
                  onSortClick(column)
                }}
                title={
                  column.name === orderBy
                    ? order === 'asc'
                      ? 'sorted ascending'
                      : 'sorted ascending'
                    : 'sort ascending'
                }
              >
                {column.title}
              </MUITableSortLabel>
            ) : (
              column.title
            )}
          </MUITableCell>
        ))}
      </MUITableRow>
    </MUITableHead>
  )
}

export default CollectionTableHeader
