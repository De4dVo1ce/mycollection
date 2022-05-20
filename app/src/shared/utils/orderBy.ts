import { CollectionColumn, CollectionItem, ColumnType } from '../resources'

export type SortOrder = 'asc' | 'desc'

const orderByString = (
  orderBy: string,
  itemA: CollectionItem,
  itemB: CollectionItem,
  defaultOrderBy?: CollectionColumn
): number => {
  const value = (itemA[orderBy] as string).localeCompare(
    itemB[orderBy] as string
  )

  return value !== 0
    ? value
    : defaultOrderBy
    ? defaultOrderBy.type === 'string'
      ? orderByString(defaultOrderBy.name, itemA, itemB)
      : defaultOrderBy.type === 'number'
      ? orderByNumber(defaultOrderBy.name, itemA, itemB)
      : orderByEnum(defaultOrderBy.name, itemA, itemB)
    : 0
}

const orderByNumber = (
  orderBy: string,
  itemA: CollectionItem,
  itemB: CollectionItem,
  defaultOrderBy?: CollectionColumn
): number => {
  const value = (+itemA[orderBy] as number) - (+itemB[orderBy] as number)
  return value !== 0
    ? value
    : defaultOrderBy
    ? defaultOrderBy.type === 'string'
      ? orderByString(defaultOrderBy.name, itemA, itemB)
      : defaultOrderBy.type === 'number'
      ? orderByNumber(defaultOrderBy.name, itemA, itemB)
      : orderByEnum(defaultOrderBy.name, itemA, itemB)
    : 0
}

const orderByEnum = (
  orderBy: string,
  itemA: CollectionItem,
  itemB: CollectionItem,
  defaultOrderBy?: CollectionColumn
): number => {
  const valueA = itemA[orderBy]
  const valueB = itemB[orderBy]

  const typeA = isNaN(+valueA) ? 'string' : 'number'
  const typeB = isNaN(+valueB) ? 'string' : 'number'

  let value
  if (typeA === 'string') {
    if (typeB === 'string') {
      value = (valueA as string).localeCompare(valueB as string)
    } else {
      value = -1
    }
  } else {
    if (typeB === 'string') {
      value = 1
    } else {
      value = +valueA - +valueB
    }
  }

  return value !== 0
    ? value
    : defaultOrderBy
    ? defaultOrderBy.type === 'string'
      ? orderByString(defaultOrderBy.name, itemA, itemB)
      : defaultOrderBy.type === 'number'
      ? orderByNumber(defaultOrderBy.name, itemA, itemB)
      : orderByEnum(defaultOrderBy.name, itemA, itemB)
    : 0
}

export const itemsOrderBy = (
  items: Array<CollectionItem>,
  orderBy: string,
  orderByType: ColumnType | undefined,
  order: SortOrder,
  defaultOrderBy?: CollectionColumn
) => {
  if (orderByType === 'string') {
    items.sort((a, b) => orderByString(orderBy, a, b, defaultOrderBy))
  } else if (orderByType === 'number') {
    items.sort((a, b) => orderByNumber(orderBy, a, b, defaultOrderBy))
  } else if (orderByType === 'enum') {
    items.sort((a, b) => orderByEnum(orderBy, a, b, defaultOrderBy))
  }

  if (order === 'desc') {
    items.reverse()
  }

  return items
}
