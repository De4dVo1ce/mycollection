import React from 'react'
import { Divider as MuiDivider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CollectionTable,
  CollectionColumn,
  CollectionItem,
  Header,
  Loading,
  Paper,
  Menu,
  ChipMenu,
  MenuEntry as ChipMenuEntry,
  Search,
  CollectionTableItem,
  labels,
  ColumnType,
  MoreActionsButton,
  statusCodes,
  ConfirmDeleteDialog,
  messages,
  SortOrder,
  itemsOrderBy,
} from '../../shared'
import { Page, documentNames } from '../AppBase'
import { TableSettingDiv } from './CollectionDetails.styles'
import { useWindowSize } from '../AppBase/WindowSizeProvider'
import { CollectionDetailsPaper } from './CollectionDetailsPaper/CollectionDetailsPaper'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { createUrlFor } from '../../createUrlFor'
import {
  useGetCollection,
  useGetColumns,
  useGetItems,
} from '../../connection/api'
import { PageNotFound } from '../AppBase/PageNotFound'
import { useSnackbar } from '../AppBase/SnackbarProvider'
import { deleteCollection } from '../../connection/api.collection'

interface CollectionDetailsProps {}

const CollectionDetails: React.FC<CollectionDetailsProps> = () => {
  const { collectionId } = useParams()
  const { isMobileView } = useWindowSize()

  const [dialog, setDialog] = React.useState<React.ReactNode>(null)
  const [order, setOrder] = React.useState<SortOrder>('asc')

  const [error, setError] = React.useState<Error | undefined>(undefined)

  const [orderBy, setOrderBy] = React.useState<string>('')
  const [orderType, setOrderType] = React.useState<ColumnType | undefined>(
    undefined
  )
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    isMobileView ? 10 : 25
  )
  const [searchProp, setSearchProp] = React.useState<string | undefined>(
    undefined
  )
  const [search, setSearch] = React.useState<string>('')

  const navigate = useNavigate()
  const { setSnackbar } = useSnackbar()

  const { loading: loadingCollection, collection } = useGetCollection(
    document.location.pathname,
    collectionId ?? '',
    error === undefined,
    (status) => {
      switch (status) {
        case statusCodes.NOT_FOUND:
          setError(new Error())
          break
      }
    }
  )

  const deleteCollectionData = React.useCallback(
    () => {
      if (collection) {
        deleteCollection(collection._id, (status) => {
          switch (status) {
            case statusCodes.OK:
              setSnackbar(
                messages.COLLECTION_DELETED(collection?.name ?? ''),
                'success'
              )
              break

            default:
              break
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collection]
  )

  const { loading: loadingColumns, columns } = useGetColumns(
    document.location.pathname,
    collection?._id ?? '',
    setOrderBy,
    setOrderType,
    searchProp,
    setSearchProp,
    error === undefined,
    (status) => {}
  )

  const {
    loading: loadingItems,
    items,
    count: itemsCount,
  } = useGetItems(
    document.location.pathname,
    collection?._id ?? '',
    columns,
    searchProp,
    search,
    error === undefined,
    (status) => {}
  )

  React.useEffect(
    () => {
      document.title = documentNames.collection(
        collection?.name ?? collectionId ?? ''
      ).page
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, collection]
  )

  const onEditCollectionClick = () => {
    navigate(createUrlFor().collections.withId(collectionId ?? '').edit, {
      replace: false,
    })
  }

  const onDeleteCollectionClick = () => {
    const onCloseDialog = () => {
      setDialog(null)
    }
    const onCancelDelete = () => {
      setDialog(null)
    }
    const onConfirmDelete = () => {
      deleteCollectionData()
      setDialog(null)
      navigate(createUrlFor().collections.page, { replace: true })
    }

    setDialog(
      <ConfirmDeleteDialog
        title={labels.HEADER_COLLECTION_DELETE}
        message={messages.COLLECTION_DELETE_CONFIRM(collection?.name ?? '')}
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        onClose={onCloseDialog}
      />
    )
  }

  const onEditItemClick = (item: CollectionItem) => {
    navigate(
      createUrlFor()
        .collections.withId(item.collection_id)
        .items.withId(item._id),
      { replace: false }
    )
  }

  const onDeleteItemClick = (item: CollectionItem) => {}

  const onAddElementClick = () => {
    navigate(createUrlFor().collections.withId(collectionId ?? '').items.new, {
      replace: false,
      state: { isNew: true },
    })
  }

  const rowsPerPageOptions = [10, 25, 50]

  const numberSearchableColumns =
    columns?.filter((column) => column.searchable).length ?? 0

  const searchPropTitle =
    numberSearchableColumns > 0 && columns
      ? columns.find((column) => {
          return searchProp ? column.name === searchProp : column.searchable
        })?.title ?? ''
      : ''

  const tableColumns: Array<CollectionColumn> = [
    ...(columns ?? []),
    {
      name: 'more',
      title: '',
      index: (columns ?? []).length,
      type: 'number',
      show_in_desktop: true,
      show_in_mobile: true,
    } as CollectionColumn,
  ]

  const tableItems: Array<CollectionTableItem> = [
    ...itemsOrderBy(
      items ?? [],
      orderBy,
      orderType,
      order,
      columns?.find((column) => column.default_order_by)
    ).map(
      (item) =>
        ({
          ...item,
          more: (
            <MoreActionsButton
              options={[
                {
                  type: 'item',
                  label: labels.BUTTON_EDIT,
                  icon: <EditIcon />,
                  onClick: () => onEditItemClick(item),
                },
                { type: 'divider' },
                {
                  type: 'item',
                  label: labels.BUTTON_DELETE,
                  icon: <DeleteIcon />,
                  onClick: () => onDeleteItemClick(item),
                },
              ]}
            />
          ),
        } as CollectionTableItem)
    ),
  ]

  return error ? (
    <PageNotFound />
  ) : (
    <Page>
      <Header
        text={collection ? collection.name : `${collectionId}`}
        variant="h4"
        primary={{
          type: 'button',
          props: {
            text: labels.BUTTON_EDIT,
            startIcon: <EditIcon />,
            onClick: onEditCollectionClick,
          },
        }}
        secondary={{
          type: 'button',
          props: {
            text: labels.BUTTON_DELETE,
            startIcon: <DeleteIcon />,
            onClick: onDeleteCollectionClick,
          },
        }}
      />

      {loadingCollection ||
      !collection ||
      loadingColumns ||
      !columns ||
      loadingItems ||
      !items ? (
        <Loading />
      ) : (
        <>
          <CollectionDetailsPaper collection={collection} columns={columns} />
          {columns.length > 0 && (
            <Paper>
              <Header
                text={labels.HEADER_ELEMENTS}
                variant="h5"
                primary={{
                  type: 'button',
                  props: {
                    text: 'Add',
                    startIcon: <AddIcon />,
                    onClick: onAddElementClick,
                  },
                }}
              />
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
                  chip={{ text: labels.ROWS_PER_PAGE(rowsPerPage) }}
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
                order={order}
                setOrder={setOrder}
                rowsPerPage={rowsPerPage}
                columns={tableColumns}
                items={tableItems}
                itemsCount={itemsCount ?? 0}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                setOrderType={setOrderType}
              />
            </Paper>
          )}
          {dialog}
        </>
      )}
    </Page>
  )
}

export default CollectionDetails
