import React from 'react'
import {
  CollectionColumn,
  CollectionItem,
} from '../../resources/datastores.types'

export type SortOrder = 'asc' | 'desc'

export type CollectionTableColumn = CollectionColumn & {
  dataProvider: (
    column: CollectionTableColumn,
    id: string,
    entity: CollectionItem,
    index: number,
    cellHeight: string
  ) => React.ReactNode
  setOrderBy: () => void
  setOrder: (newOrder: SortOrder) => void
}
