import React from 'react'
import {
  Table as MuiTable,
  TableContainer as MuiTableContainer,
} from '@mui/material'
import {
  CollectionTableColumn,
  CollectionTableItem,
} from './CollectionTable.types'
import { Pagination } from '../Pagination'
import CollectionTableHeader from './CollectionTableHeader'
import CollectionTableBody from './CollectionTableBody'
import { CollectionColumn, CollectionItem, ColumnType } from '../../resources'
import { Loading } from '../Loading'
import {
  NumberCollectionDataProvider,
  StringCollectionDataProvider,
} from './CollectionDataProvider'
import { useWindowSize } from '../../../components/AppBase/WindowSizeProvider'
import { SortOrder } from '../../utils'
export interface CollectionTableProps {
  rowsPerPage: number
  columns: Array<CollectionColumn>
  items: Array<CollectionTableItem>
  itemsCount: number
  orderBy: string
  setOrderBy: (orderBy: string) => void
  setOrderType: (orderType: ColumnType | undefined) => void
  order: SortOrder
  setOrder: (order: SortOrder) => void
}

export const CollectionTable: React.FC<CollectionTableProps> = ({
  rowsPerPage,
  columns,
  items,
  itemsCount,
  orderBy,
  setOrderBy,
  setOrderType,
  order,
  setOrder,
}) => {
  const { isMobileView } = useWindowSize()
  const [page, setPage] = React.useState<number>(0)

  const [tableColumns, setTableColumns] = React.useState<
    Array<CollectionTableColumn>
  >([])

  React.useEffect(
    () => {
      setTableColumns(
        columns
          ? columns.map((column) => ({
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
                index: number
              ) => {
                if (
                  column.type === 'number' ||
                  (column.type === 'enum' && column.enum_type === 'number')
                ) {
                  return (
                    <NumberCollectionDataProvider
                      key={`${index}-${id}`}
                      column={column}
                      id={id}
                      entity={entity}
                      index={index}
                    />
                  )
                } else {
                  return (
                    <StringCollectionDataProvider
                      key={`${index}-${id}`}
                      column={column}
                      id={id}
                      entity={entity}
                      index={index}
                    />
                  )
                }
              },
            }))
          : []
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  )

  React.useEffect(
    () => {
      if (page !== 0) {
        setPage(0)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowsPerPage]
  )

  React.useEffect(
    () => {
      setPage(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderBy, order]
  )

  const visibleTableColumns =
    tableColumns?.filter((column) =>
      isMobileView ? column.show_in_mobile : column.show_in_desktop
    ) ?? []

  const tableItems = items.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return !columns || !items ? (
    <Loading />
  ) : (
    <>
      <MuiTableContainer>
        <MuiTable>
          <CollectionTableHeader
            columns={visibleTableColumns}
            orderBy={orderBy}
            order={order}
          />
          <CollectionTableBody
            columns={visibleTableColumns}
            rows={tableItems}
          />
        </MuiTable>
      </MuiTableContainer>
      <Pagination
        page={page + 1}
        rowsPerPage={rowsPerPage}
        count={itemsCount}
        onPageChange={setPage}
      />
    </>
  )
}
