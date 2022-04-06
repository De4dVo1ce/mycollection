import styled from 'styled-components'

// O R U L

interface PageDivProps {
  isMobileView: boolean
}
export const PageDiv = styled.div<PageDivProps>`
  && {
    padding: ${({ isMobileView }) => (isMobileView ? `20px` : `50px`)};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    flex-wrap: wrap;
  }
`
