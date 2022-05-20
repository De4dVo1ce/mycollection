import React from 'react'
import { TableCell as MUITableCell, Tooltip as MuiTooltip } from '@mui/material'
import { CollectionTableColumn } from '../CollectionTable.types'
import { CollectionItem } from '../../../resources/datastores.types'
import { COLLECTION_TABLE_CELL_HEIGHT } from '../../../../components/AppBase'

export interface CollectionDataProviderProps {
  column: CollectionTableColumn
  id: string
  entity: CollectionItem
  index: number
  cellHeight?: string
  minWidth?: string
  width?: string
  maxWidth?: string
}

const CollecionDataProvider: React.FC<
  CollectionDataProviderProps & {
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
  let value = entity[column.name]

  return (
    <MUITableCell
      key={`${index}-${id}`}
      component={index < 1 ? 'th' : undefined}
      align={align}
      style={{
        padding: '0px 10px',
        height: cellHeight ?? COLLECTION_TABLE_CELL_HEIGHT,
        minWidth: minWidth ?? 'auto',
        width: width ?? minWidth ?? maxWidth ?? 'auto',
        maxWidth: maxWidth ?? 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      variant="body"
    >
      {column.name !== 'more' ? (
        <MuiTooltip title={value} arrow placement="top">
          <span>{value}</span>
        </MuiTooltip>
      ) : (
        value
      )}
    </MUITableCell>
  )
}

export interface StringCollectionDataProviderProps
  extends CollectionDataProviderProps {}

export const StringCollectionDataProvider: React.FC<
  StringCollectionDataProviderProps
> = (props) => {
  return (
    <CollecionDataProvider
      {...props}
      align="left"
      width="200px"
      maxWidth="250px"
    />
  )
}

export interface NumberCollectionDataProviderProps
  extends CollectionDataProviderProps {}

export const NumberCollectionDataProvider: React.FC<
  NumberCollectionDataProviderProps
> = (props) => {
  return (
    <CollecionDataProvider
      {...props}
      align="right"
      width="150px"
      maxWidth="175px"
    />
  )
}
