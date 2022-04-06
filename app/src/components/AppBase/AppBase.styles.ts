import styled from 'styled-components'
import { COLOR_NAVIGATION_BACKGROUND } from './resources'

export interface StyledAppDivProps {}
export const AppProviderDiv = styled.div<StyledAppDivProps>`
  && {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-areas:
      'nav'
      'content';
    grid-template-rows: 50px auto;
    grid-template-columns: auto;
  }
`

export interface ContentDivProps {
  backgroudColor: string
}
export const ContentDiv = styled.div<ContentDivProps>`
  && {
    grid-area: content;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({ backgroudColor }) => `${backgroudColor}`};
    overflow-y: auto;
  }
`

export interface NavigationDivProps {}
export const NavigationDiv = styled.div<NavigationDivProps>`
  && {
    grid-area: nav;
    height: 100%;
    width: auto;
    background-color: ${COLOR_NAVIGATION_BACKGROUND};
  }
`
