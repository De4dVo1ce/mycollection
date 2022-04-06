import styled from 'styled-components'

// O R U L

interface LoginLogoutPageDivProps {
  isMobileView: boolean
}
export const LoginlogoutPageDiv = styled.div<LoginLogoutPageDivProps>`
  && {
    padding: ${({ isMobileView }) => (isMobileView ? `20px` : `50px`)};
    width: ${({ isMobileView }) => (isMobileView ? '100%' : '35vw')};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    margin: auto;
  }
`
