import React from 'react'
import { Divider as MuiDivider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../../connection/api.collection'
import { getCollectionColumns } from '../../../connection/api.columns'
import { getCollectionItems } from '../../../connection/api.items'
import {
  Collection,
  CollectionTable,
  CollectionColumn,
  CollectionItem,
  Header,
  Loading,
  Paper,
  statusCodes,
  Menu,
  ChipMenu,
  MenuEntry as ChipMenuEntry,
  Search,
} from '../../../shared'
import {
  Page,
  documentNames,
  REQUEST_INTERVAL_MS_COLLECTIONDATA,
} from '../../AppBase'
import { TableSettingDiv } from './CollectionDetails.styles'
import { useWindowSize } from '../../AppBase/WindowSizeProvider'

const getDefaultOrderBy = (columns: Array<CollectionColumn>) => {
  const defaultSortColumn = (columns ?? [])?.find(
    (column) => column.default_order_by
  )
  if (defaultSortColumn?.type === 'enum') {
    return { type: defaultSortColumn.enum_type, name: defaultSortColumn.name }
  } else {
    return { type: defaultSortColumn?.type, name: defaultSortColumn?.name }
  }
}

interface CollectionDetailsProps {}

const CollectionDetails: React.FC<CollectionDetailsProps> = () => {
  const { collectionId } = useParams()
  const { isMobileView } = useWindowSize()

  const [collection, setCollection] = React.useState<Collection | undefined>(
    undefined
  )
  const [columns, setColumns] = React.useState<
    Array<CollectionColumn> | undefined
  >(undefined)
  const [items, setItems] = React.useState<Array<CollectionItem> | undefined>(
    undefined
  )
  const [orderBy, setOrderBy] = React.useState<string>('')
  const [orderType, setOrderType] = React.useState<
    'string' | 'number' | 'enum' | undefined
  >(undefined)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    isMobileView ? 10 : 25
  )
  const [searchProp, setSearchProp] = React.useState<string | undefined>(
    undefined
  )
  const [search, setSearch] = React.useState<string | undefined>(undefined)

  document.title = documentNames.collection(
    collection?.name ?? collectionId ?? ''
  )

  const getCollectionColumnsData = React.useCallback(
    async (collectionId: string) => {
      await getCollectionColumns(collectionId, (status, columns) => {
        switch (status) {
          case statusCodes.OK:
            setColumns(columns)
            const { type, name } = getDefaultOrderBy(columns)
            setOrderBy(name ?? '')
            setOrderType(type ?? undefined)
            if (columns.filter((column) => column.searchable).length > 0) {
              setSearchProp(columns.find((column) => column.searchable)!.name)
            }

            break

          default:
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const getCollectionItemsData = React.useCallback(
    async (
      collectionId: string,
      searchProp: string | undefined,
      search: string | undefined
    ) => {
      await getCollectionItems(
        collectionId,
        searchProp,
        search,
        (status, items) => {
          switch (status) {
            case statusCodes.OK:
              setItems(items)
              break

            default:
              break
          }
        }
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const getCollectionData = React.useCallback(
    async () => {
      await getCollection(collectionId ?? '', (status, collection) => {
        switch (status) {
          case statusCodes.OK:
            setCollection(collection)
            break

          case statusCodes.NOT_FOUND:
            break
          default:
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      getCollectionData()
      setInterval(() => {
        getCollectionData()
      }, REQUEST_INTERVAL_MS_COLLECTIONDATA)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId]
  )

  React.useEffect(
    () => {
      if (collection) {
        getCollectionColumnsData(collection._id)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection]
  )

  React.useEffect(
    () => {
      if (collection) {
        getCollectionItemsData(collection._id, searchProp, search)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection, search]
  )

  const rowsPerPageOptions = [10, 25, 50, 100]

  const rowsPerPageText = `Rows per page`

  const numberSearchableColumns =
    columns?.filter((column) => column.searchable).length ?? 0

  const searchPropTitle =
    numberSearchableColumns > 0 && columns
      ? columns.find((column) => {
          return searchProp ? column.name === searchProp : column.searchable
        })?.title ?? ''
      : ''

  return (
    <Page>
      <Header
        text={collection ? collection.name : `${collectionId}`}
        variant="h4"
      />
      <Paper>
        {!collection || !columns || !items ? (
          <Loading />
        ) : (
          <>
            <TableSettingDiv>
              {numberSearchableColumns > 0 && (
                <Search
                  searchFor={searchPropTitle}
                  setSearch={setSearch}
                  searchForSelector={
                    numberSearchableColumns > 1 && (
                      <>
                        <MuiDivider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <Menu
                          button={{ menuType: 'iconButton' }}
                          menu={{
                            entries: columns
                              .filter((column) => column.searchable)
                              .map((column) => ({
                                text: column.title,
                                value: column.name,
                              })),
                          }}
                          value={searchProp ?? ''}
                          onChangeValue={(newValue) => {
                            setSearchProp(`${newValue}`)
                          }}
                        />
                      </>
                    )
                  }
                />
              )}
            </TableSettingDiv>
            <TableSettingDiv>
              <ChipMenu
                chip={{ text: `${rowsPerPageText}: ${rowsPerPage}` }}
                menu={{
                  entries: rowsPerPageOptions.map(
                    (option) =>
                      ({
                        value: option,
                        text: option,
                      } as unknown as ChipMenuEntry)
                  ),
                }}
                value={rowsPerPage}
                onChangeValue={(rowsPerPage) => {
                  setRowsPerPage(+rowsPerPage)
                }}
              />
            </TableSettingDiv>
            <CollectionTable
              rowsPerPage={rowsPerPage}
              columns={columns}
              items={items}
              orderBy={orderBy}
              orderType={orderType}
              setOrderBy={setOrderBy}
              setOrderType={setOrderType}
            />
          </>
        )}
      </Paper>
    </Page>
  )
}

export default CollectionDetails
