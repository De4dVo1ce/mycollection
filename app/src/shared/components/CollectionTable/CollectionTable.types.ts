import React from 'react'
import {
  CollectionColumn,
  CollectionItem,
} from '../../resources/datastores.types'
import { SortOrder } from '../../utils'

export type CollectionTableColumn = CollectionColumn & {
  dataProvider: (
    column: CollectionTableColumn,
    id: string,
    entity: CollectionItem,
    index: number
  ) => React.ReactNode
  setOrderBy: () => void
  setOrder: (newOrder: SortOrder) => void
}

export type CollectionTableItem = CollectionItem & {
  more: React.ReactNode
}
