export type DatastoreType = {
  _id: string
  created: number
  modified: number
}

export type User = DatastoreType & {
  name: string
}

export type User_PW = DatastoreType & {
  user_id: string
  password: string
}

export type Collection = DatastoreType & {
  user_id: string
  name: string
  description: string
  count: number
}

export type ValueType = 'string' | 'number'
export type ColumnType = 'string' | 'number' | 'enum' | 'flag'

export type CollectionColumn = DatastoreType & {
  collection_id: string
  index: number
  name: string
  title: string
  default_order_by: boolean
  show_in_desktop: boolean
  show_in_mobile: boolean
  sortable: boolean
  searchable: boolean
} & (
    | {
        type: ValueType
      }
    | {
        type: 'enum'
        enum_type: ValueType
        enum: Array<string>
      }
    | {
        type: 'flag'
        flag_type: ValueType
        flag: Array<string>
      }
  )

export type Share = DatastoreType & {
  user_id: string
  collection_id: string
}

export type CollectionItem = DatastoreType & {
  collection_id: string
  [key: string]: string | Array<string>
}
