import React from 'react'
import { getCollection, getCollections } from './api.collection'
import { getCollectionColumns } from './api.columns'
import { getCollectionItem, getCollectionItems } from './api.items'
import {
  areEqual,
  Collection,
  CollectionColumn,
  CollectionItem,
  ColumnType,
  statusCodes,
} from '../shared'
import { REQUEST_INTERVAL_MS_DATA } from '../components/AppBase'

/**
 * Gets the list of collections of the current user.
 * @param pageUrl The pathname of the page requesting the collection.
 * @param onDefaultStatus Callback for not OK-status.
 * @param refresh Flag if function shall run in loop.
 * @returns Object with loading and collections list state.
 */
export const useGetCollections = (
  pageUrl: string,
  refresh: boolean,
  onDefaultStatus: (status: number) => void
): {
  loading: boolean
  collections: Array<Collection> | undefined
} => {
  const [collections, setCollections] = React.useState<
    Array<Collection> | undefined
  >(undefined)
  const [listTimer, setListTimer] = React.useState<NodeJS.Timer | undefined>(
    undefined
  )

  const getCollectionsList = React.useCallback(
    async () => {
      await getCollections((status, collections) => {
        switch (status) {
          case statusCodes.OK:
            setCollections((prev) =>
              areEqual(prev, collections) ? prev : collections
            )
            break
          default:
            onDefaultStatus(status)
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      getCollectionsList()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      if (refresh && !listTimer && document.location.pathname === pageUrl) {
        const timer = setTimeout(() => {
          if (document.location.pathname === pageUrl) {
            getCollectionsList()
            setListTimer(undefined)
          }
        }, REQUEST_INTERVAL_MS_DATA)

        setListTimer(timer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listTimer, refresh]
  )

  return { loading: !collections, collections: collections }
}

/**
 * Gets the collection based on the passed ID.
 * @param pageUrl The pathname of the page requesting the collection.
 * @param collectionId The ID to get the collection based on.
 * @param refresh Flag if function shall run in loop.
 * @param onStatus Callback for not OK-status.
 * @returns Object with loading and collection state.
 */
export const useGetCollection = (
  pageUrl: string,
  collectionId: string,
  refresh: boolean,
  onStatus: (status: number) => void
): { loading: boolean; collection: Collection | undefined } => {
  const [collection, setCollection] = React.useState<Collection | undefined>(
    undefined
  )
  const [collectionTimer, setCollectionTimer] = React.useState<
    NodeJS.Timer | undefined
  >(undefined)

  const getCollectionData = React.useCallback(
    async () => {
      await getCollection(collectionId ?? '', (status, collection) => {
        switch (status) {
          case statusCodes.OK:
            setCollection((prev) =>
              areEqual(prev, collection) ? prev : collection
            )
            break

          default:
            onStatus(status)
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, setCollection]
  )

  React.useEffect(
    () => {
      getCollectionData()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(
    () => {
      if (
        refresh &&
        !collectionTimer &&
        document.location.pathname === pageUrl
      ) {
        const timer = setTimeout(() => {
          if (document.location.pathname === pageUrl) {
            getCollectionData()
            setCollectionTimer(undefined)
          }
        }, REQUEST_INTERVAL_MS_DATA)

        setCollectionTimer(timer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionTimer, getCollectionData, pageUrl, refresh]
  )

  return { loading: !collection, collection: collection }
}

/**
 * Gets the default order by configuration of the columns list.
 * @param columns List of columns.
 * @returns Object with default oder by type and name.
 */
const getDefaultOrderBy = (
  columns: Array<CollectionColumn>
): { type: ColumnType | undefined; name: string | undefined } => {
  const defaultSortColumn = (columns ?? [])?.find(
    (column) => column.default_order_by
  )
  if (defaultSortColumn?.type === 'enum') {
    return { type: defaultSortColumn.enum_type, name: defaultSortColumn.name }
  } else {
    return { type: defaultSortColumn?.type, name: defaultSortColumn?.name }
  }
}

/**
 * Gets the list of columns based on the passed collection.
 * @param pageUrl The pathname of the page requesting the collection.
 * @param collectionId The current collection.
 * @param setOrderBy Function to set order by state.
 * @param setOrderType Function to set order type state.
 * @param searchProp The current property name to search by.
 * @param setSearchProp Function to set searchProp state.
 * @param refresh Flag if function shall run in loop.
 * @param onStatus Callback for not OK-status.
 * @returns Object with loading and columns list state.
 */
export const useGetColumns = (
  pageUrl: string,
  collectionId: string | undefined,
  setOrderBy: React.Dispatch<React.SetStateAction<string>>,
  setOrderType: React.Dispatch<React.SetStateAction<ColumnType | undefined>>,
  searchProp: string | undefined,
  setSearchProp: React.Dispatch<React.SetStateAction<string | undefined>>,
  refresh: boolean,
  onStatus: (status: number) => void
): { loading: boolean; columns: Array<CollectionColumn> | undefined } => {
  const [columns, setColumns] = React.useState<
    Array<CollectionColumn> | undefined
  >(undefined)
  const [columnsTimer, setColumnsTimer] = React.useState<
    NodeJS.Timer | undefined
  >(undefined)

  const getColumnsData = React.useCallback(
    async () => {
      if (collectionId) {
        await getCollectionColumns(collectionId, (status, columns) => {
          switch (status) {
            case statusCodes.OK:
              setColumns((prev) => {
                if (areEqual(prev, columns)) {
                  return prev
                }

                const { type, name } = getDefaultOrderBy(columns)
                setOrderBy((prev) => {
                  if (prev !== '') {
                    setOrderType((prev) => prev)
                    return prev
                  }

                  setOrderType(type)
                  return name ?? ''
                })

                const firstSearchableColumn = columns.find(
                  (column) => column.searchable
                )
                if (firstSearchableColumn) {
                  const newSearchProp = searchProp ?? firstSearchableColumn.name
                  setSearchProp((prev) =>
                    prev &&
                    columns.find((column) => areEqual(column.name, prev))
                      ? prev
                      : newSearchProp
                  )
                }
                return columns
              })

              break

            default:
              onStatus(status)
              break
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, setOrderBy, setOrderType, searchProp, setSearchProp]
  )

  React.useEffect(
    () => {
      getColumnsData()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId]
  )

  React.useEffect(
    () => {
      if (
        refresh &&
        collectionId &&
        !columnsTimer &&
        document.location.pathname === pageUrl
      ) {
        const timer = setTimeout(() => {
          if (document.location.pathname === pageUrl) {
            getColumnsData()
            setColumnsTimer(undefined)
          }
        }, REQUEST_INTERVAL_MS_DATA)

        setColumnsTimer(timer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnsTimer, getColumnsData, pageUrl, refresh]
  )

  return { loading: !columns, columns: columns }
}

/**
 * Gets the list of items based on passed collection.
 * @param pageUrl The pathname of the page requesting the collection.
 * @param collection The current collection.
 * @param columns The current list of columns.
 * @param searchProp The current property name to search by.
 * @param search The current value to search by.
 * @param orderBy The current order by state.
 * @param orderType The current order type state.
 * @param refresh Flag if function shall run in loop.
 * @param onStatus Callback for not OK-status.
 * @returns Object with loading and items list state.
 */
export const useGetItems = (
  pageUrl: string,
  collectionId: string | undefined,
  columns: Array<CollectionColumn> | undefined,
  searchProp: string | undefined,
  search: string | undefined,
  refresh: boolean,
  onStatus: (status: number) => void
): {
  loading: boolean
  items: Array<CollectionItem> | undefined
  count: number
} => {
  const [items, setItems] = React.useState<Array<CollectionItem> | undefined>(
    undefined
  )
  const [itemsTimer, setItemsTimer] = React.useState<NodeJS.Timer | undefined>(
    undefined
  )

  const getItemsData = React.useCallback(
    async () => {
      if (collectionId && columns) {
        await getCollectionItems(
          collectionId ?? '',
          searchProp,
          search,
          (status, response) => {
            switch (status) {
              case statusCodes.OK:
                const items = response.items
                setItems((prev) => (areEqual(prev, items) ? prev : items))

                break

              default:
                onStatus(status)
                break
            }
          }
        )
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, setItems, collectionId, searchProp, search]
  )

  React.useEffect(
    () => {
      if (collectionId && columns) {
        if (itemsTimer) {
          setItemsTimer((prev) => {
            if (prev) {
              clearTimeout(prev)
              return undefined
            }

            return prev
          })
        }
        getItemsData()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getItemsData]
  )

  React.useEffect(
    () => {
      if (
        refresh &&
        !itemsTimer &&
        collectionId &&
        columns &&
        document.location.pathname === pageUrl
      ) {
        const timer = setTimeout(() => {
          if (document.location.pathname === pageUrl) {
            getItemsData()
            setItemsTimer(undefined)
          }
        }, REQUEST_INTERVAL_MS_DATA)

        setItemsTimer(timer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, columns, getItemsData, itemsTimer, pageUrl, refresh]
  )

  return { loading: !items, items: items, count: items?.length ?? 0 }
}

/**
 *
 * @param pageUrl
 * @param collectionId
 * @param itemId
 * @param refresh
 * @param onStatus
 * @returns
 */
export const useGetItem = (
  pageUrl: string,
  collectionId: string,
  itemId: string,
  refresh: boolean,
  onStatus: (status: number) => void
): { loading: boolean; item: CollectionItem | undefined } => {
  const [item, setItem] = React.useState<CollectionItem | undefined>(undefined)

  const [itemTimer, setItemTimer] = React.useState<NodeJS.Timer | undefined>(
    undefined
  )

  const getItemData = React.useCallback(
    async () => {
      await getCollectionItem(collectionId, itemId, (status, item) => {
        switch (status) {
          case statusCodes.OK:
            setItem(item)
            break

          default:
            onStatus(status)
            break
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, itemId]
  )

  React.useEffect(
    () => {
      if (collectionId && itemId) {
        getItemData()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, itemId, getItemData]
  )

  React.useEffect(
    () => {
      if (
        refresh &&
        !itemTimer &&
        collectionId &&
        itemId &&
        document.location.pathname === pageUrl
      ) {
        const timer = setTimeout(() => {
          if (document.location.pathname === pageUrl) {
            getItemData()
            setItemTimer(undefined)
          }
        }, REQUEST_INTERVAL_MS_DATA)

        setItemTimer(timer)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, itemId, itemTimer, pageUrl]
  )

  return { loading: !item, item: item }
}
