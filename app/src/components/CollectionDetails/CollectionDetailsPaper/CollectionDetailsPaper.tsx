import React from 'react'
import { useWindowSize } from '../../AppBase/WindowSizeProvider'
import { Collection, CollectionColumn } from '../../../shared/resources'
import { Paper } from '../../../shared/components/Paper'
import { CollectionDescriptionDiv } from './CollectionDescriptionDiv'
import {
  CollectionPropsDiv,
  CountDiv,
  PropDiv,
  PropNameDiv,
  PropTextDiv,
} from './CollectionDetailsPaper.styles'

export interface CollectionDetailsPaperProps {
  collection: Collection
  columns: Array<CollectionColumn>
}

export const CollectionDetailsPaper: React.FC<CollectionDetailsPaperProps> = ({
  collection,
  columns,
}) => {
  const { isMobileView } = useWindowSize()

  const columnsTitle: Array<string> = columns.map((column) => column.title)

  return (
    <Paper>
      <CollectionPropsDiv>
        <PropDiv area="desc" isMobileView={isMobileView}>
          <PropNameDiv>{'Description:'}</PropNameDiv>
          <CollectionDescriptionDiv description={collection.description} />
        </PropDiv>
        <CountDiv>
          <PropNameDiv>{'Number of elements:'}</PropNameDiv>
          <PropTextDiv>{collection.count}</PropTextDiv>
        </CountDiv>
        <PropDiv area="cols" isMobileView={isMobileView}>
          <PropNameDiv>{'Element properties:'}</PropNameDiv>
          <PropTextDiv>{columnsTitle.join(', ')}</PropTextDiv>
        </PropDiv>
      </CollectionPropsDiv>
    </Paper>
  )
}

export default CollectionDetailsPaper
