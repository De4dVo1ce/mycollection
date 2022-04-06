import React from 'react'
import { createUrlFor } from '../../../createUrlFor'
import { Collection, Link } from '../../../shared'
import {
  CollectionTileDiv,
  DescriptionArea,
  DetailsArea,
  NameArea,
  NameAreaDiv,
  NameTypography,
} from './CollectionTile.styles'

interface CollectionTileProps {
  collection: Collection
}

export const CollectionTile: React.FC<CollectionTileProps> = ({
  collection,
}) => {
  return (
    <CollectionTileDiv>
      <NameAreaDiv>
        <NameArea>
          <Link to={createUrlFor().collections.withId(collection._id).page}>
            <NameTypography variant="h6">{collection.name}</NameTypography>
          </Link>
        </NameArea>
      </NameAreaDiv>
      <DescriptionArea>{collection.description}</DescriptionArea>
      <DetailsArea></DetailsArea>
    </CollectionTileDiv>
  )
}

export default CollectionTile
