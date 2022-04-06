import React from 'react'
import { Table as MUITable, TableContainer } from '@mui/material'
import { CollectionTableColumn, SortOrder } from './CollectionTable.types'
import { Pagination } from '../Pagination'
import CollectionTableHeader from './CollectionTableHeader'
import CollectionTableBody from './CollectionTableBody'
import {
  CollectionColumn,
  CollectionItem,
} from '../../resources/datastores.types'
import { Loading } from '../Loading'
import { NumberDataProvider, StringDataProvider } from './DataProvider'
import { itemsOrderBy } from '../../resources/orderBy'

export interface CollectionTableProps {
  rowsPerPage: number
  columns: Array<CollectionColumn>
  items: Array<CollectionItem>
  orderBy: string
  setOrderBy: (orderBy: string) => void
  orderType: 'string' | 'number' | 'enum' | undefined
  setOrderType: (orderType: 'string' | 'number' | 'enum' | undefined) => void
}

export const CollectionTable: React.FC<CollectionTableProps> = ({
  rowsPerPage,
  columns,
  items,
  orderBy,
  setOrderBy,
  orderType,
  setOrderType,
}) => {
  const [order, setOrder] = React.useState<SortOrder>('asc')

  const [page, setPage] = React.useState<number>(0)

  const tableColumns: Array<CollectionTableColumn> = columns
    ? columns.map((column) => {
        return {
          ...column,
          setOrderBy: () => {
            setOrderBy(column.name)
            setOrderType(column.type)
          },
          setOrder: setOrder,
          dataProvider: (
            column: CollectionTableColumn,
            id: string,
            entity: CollectionItem,
            index: number,
            cellHeight: string
          ) => {
            if (
              column.type === 'string' ||
              (column.type === 'enum' && column.enum_type === 'string')
            ) {
              return (
                <StringDataProvider
                  key={`${index}-${id}`}
                  column={column}
                  id={id}
                  entity={entity}
                  index={index}
                  cellHeight={cellHeight}
                />
              )
            } else {
              return (
                <NumberDataProvider
                  key={`${index}-${id}`}
                  column={column}
                  id={id}
                  entity={entity}
                  index={index}
                  cellHeight={cellHeight}
                />
              )
            }
          },
        }
      })
    : []

  React.useEffect(() => {
    setPage(0)
  }, [orderBy, order])

  React.useEffect(() => {
    if (page !== 0) {
      setPage(0)
    }
  }, [rowsPerPage])

  const visibleTableColumns =
    tableColumns?.filter((column) => column.show_in_list) ?? []

  const defaultOrderBy = columns?.find((column) => column.default_order_by)

  const tableItems = items
    ? itemsOrderBy(items, orderBy, orderType, order, defaultOrderBy)
    : []

  return !columns || !items ? (
    <Loading />
  ) : (
    <>
      <TableContainer>
        <MUITable stickyHeader aria-label="sticky table">
          <CollectionTableHeader
            columns={visibleTableColumns}
            orderBy={orderBy}
            order={order}
          />
          <CollectionTableBody
            columns={visibleTableColumns}
            rowsPerPage={rowsPerPage}
            rows={tableItems}
            page={page}
          />
        </MUITable>
      </TableContainer>
      {items.length > rowsPerPage && (
        <Pagination
          page={page + 1}
          rowsPerPage={rowsPerPage}
          count={items.length}
          onPageChange={setPage}
        />
      )}
    </>
  )
}
