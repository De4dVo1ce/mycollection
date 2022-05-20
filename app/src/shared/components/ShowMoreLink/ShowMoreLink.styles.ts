import styled from 'styled-components'

interface ShowMoreLinkDivProps {
  isDark: boolean
}

export const ShowMoreLinkDiv = styled.span<ShowMoreLinkDivProps>`
  && {
    grid-area: showmore;
    color: ${({ isDark }) => (!isDark ? '#0a1929' : '#6573c3')};
    display: inline-block;

    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
