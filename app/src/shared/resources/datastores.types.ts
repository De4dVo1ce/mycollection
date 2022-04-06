type DatastoreType = {
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

type EnumType = string | number

export type CollectionColumn = DatastoreType & {
  collection_id: string
  index: number
  name: string
  title: string
  default_order_by: boolean
  show_in_list: boolean
  sortable: boolean
  searchable: boolean
} & (
    | {
        type: 'number' | 'string'
      }
    | {
        type: 'enum'
        enum_type: 'number' | 'string'
        enum: Array<EnumType>
      }
  )

export type Share = DatastoreType & {
  user_id: string
  collection_id: string
}

export type CollectionItem = DatastoreType & {
  collection_id: string
  [key: string]: string | number
}
