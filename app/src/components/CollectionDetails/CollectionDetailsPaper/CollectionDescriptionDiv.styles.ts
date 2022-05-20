import styled from 'styled-components'
import {
  THEME_DARK_SHOW_MORE_LINK,
  THEME_LIGHT_SHOW_MORE_LINK,
} from '../../AppBase'

export const DescriptionTextDiv = styled.div`
  && {
    grid-area: text;
    display: grid;
    grid-template-areas: 'text' 'showmore';
  }
`

interface DescriptionDivProps {
  showMore: boolean
}

export const DescriptionDiv = styled.div<DescriptionDivProps>`
  && {
    grid-area: text;
    ${({ showMore }) =>
      !showMore
        ? 'overflow-x: hidden; text-overflow: ellipsis; white-space: nowrap;'
        : ''}
  }
`

interface ShowMoreLinkProps {
  isDark: boolean
}
export const ShowMoreLink = styled.span<ShowMoreLinkProps>`
  && {
    grid-area: showmore;
    color: ${({ isDark }) =>
      !isDark ? THEME_LIGHT_SHOW_MORE_LINK : THEME_DARK_SHOW_MORE_LINK};
    display: inline-block;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
