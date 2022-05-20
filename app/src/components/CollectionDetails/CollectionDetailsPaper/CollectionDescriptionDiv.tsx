import React from 'react'
import { ShowMoreLink } from '../../../shared/components/ShowMoreLink/ShowMoreLink'
import {
  DescriptionDiv,
  DescriptionTextDiv,
} from './CollectionDescriptionDiv.styles'

const DESCRIPTION_DIV_ID = 'collection-description'

interface CollectionDescriptionDivProps {
  description: string
}

export const CollectionDescriptionDiv: React.FC<
  CollectionDescriptionDivProps
> = ({ description }) => {
  const [showMore, setShowMore] = React.useState<boolean>(false)
  const [showLink, setShowLink] = React.useState<boolean>(false)

  React.useLayoutEffect(() => {
    const element = document.getElementById(DESCRIPTION_DIV_ID)
    setShowLink(element?.clientWidth !== element?.scrollWidth)
  }, [description])

  return (
    <DescriptionTextDiv>
      <DescriptionDiv id={DESCRIPTION_DIV_ID} showMore={showMore}>
        {description}
      </DescriptionDiv>
      {showLink && (
        <ShowMoreLink showMore={showMore} setShowMore={setShowMore} />
      )}
    </DescriptionTextDiv>
  )
}
