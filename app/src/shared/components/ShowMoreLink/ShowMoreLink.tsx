import React from 'react'
import { useTheme } from '../../../components/AppBase'
import { labels } from '../../resources'
import { ShowMoreLinkDiv } from './ShowMoreLink.styles'

interface ShowMoreLinkProps {
  showMore: boolean
  setShowMore: (showMore: boolean) => void
}

export const ShowMoreLink: React.FC<ShowMoreLinkProps> = ({
  showMore,
  setShowMore,
}) => {
  const { isDark } = useTheme()

  return (
    <ShowMoreLinkDiv
      isDark={isDark}
      onClick={() => {
        setShowMore(!showMore)
      }}
    >
      {showMore ? labels.SHOW_LESS : labels.SHOW_MORE}
    </ShowMoreLinkDiv>
  )
}
