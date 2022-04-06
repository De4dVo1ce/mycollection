import React from 'react'
import { TableCell as MUITableCell } from '@mui/material'
import { CollectionTableColumn } from '../CollectionTable.types'
import { createUrlFor } from '../../../../createUrlFor'
import { CollectionItem } from '../../../resources/datastores.types'
import { StyledA } from './DataProvider.styles'

export interface DataProviderProps {
  column: CollectionTableColumn
  id: string
  entity: CollectionItem
  index: number
  cellHeight: string
  minWidth?: string
  width?: string
  maxWidth?: string
}

const DataProvider: React.FC<
  DataProviderProps & {
    align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
  }
> = ({
  column,
  id,
  entity,
  index,
  cellHeight,
  align,
  minWidth,
  width,
  maxWidth,
}) => {
  return (
    <MUITableCell
      title={`${entity[column.name]}`}
      key={`${index}-${id}`}
      component={index < 1 ? 'th' : undefined}
      align={align}
      style={{
        padding: '0px 10px',
        height: cellHeight,
        minWidth: minWidth ?? 'auto',
        width: width ?? 'auto',
        maxWidth: maxWidth ?? 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      variant="body"
    >
      {
        entity[column.name]
        /*index === 0 ? (
        <StyledA
          href={createUrlFor()
            .collections.withId(entity.collection_id)
            .element(entity._id)}
        >
          {entity[column.name]}
        </StyledA>
      ) : (
        entity[column.name]
      )
      */
      }
    </MUITableCell>
  )
}

export interface StringDataProviderProps extends DataProviderProps {}

export const StringDataProvider: React.FC<StringDataProviderProps> = (
  props
) => {
  return <DataProvider {...props} align="left" maxWidth="175px" />
}

export interface NumberDataProviderProps extends DataProviderProps {}

export const NumberDataProvider: React.FC<NumberDataProviderProps> = (
  props
) => {
  return <DataProvider {...props} align="right" width="25px" />
}
