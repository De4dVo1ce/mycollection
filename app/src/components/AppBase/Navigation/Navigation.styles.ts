import styled from 'styled-components'
import {
  COLOR_NAVIGATION_ACTIVE,
  COLOR_NAVIGATION_BACKGROUND,
} from '../resources'

export interface NavigationListDivProps {}
export const NavigationListDiv = styled.div<NavigationListDivProps>`
  && {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 10, 0;
    display: flex;
    flex-direction: row;
    background-color: ${COLOR_NAVIGATION_BACKGROUND};
  }
`

export interface LogoDivProps {
  isMobileView: boolean
}
export const LogoDiv = styled.div<LogoDivProps>`
  && {
    height: 100%;
    color: white;
    display: grid;
    place-items: center;
    ${({ isMobileView }) => (isMobileView ? `width: 110%;` : `width: 150px;`)}
  }
`

export interface NavigationListEntryDivProps {
  active: boolean
  isMobileView: boolean
}
export const NavigationListEntryDiv = styled.div<NavigationListEntryDivProps>`
  && {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: row;
    color: white;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    ${({ active }) => active && `background-color: ${COLOR_NAVIGATION_ACTIVE};`}
    ${({ isMobileView }) => (isMobileView ? `width: 100%;` : `width: 150px;`)}

    :hover {
      cursor: pointer;
      background-color: ${COLOR_NAVIGATION_ACTIVE};
    }
  }
`

export interface IconDivProps {
  isMobileView: boolean
}
export const IconDiv = styled.div<IconDivProps>`
  && {
    display: grid;
    place-items: center;
    ${({ isMobileView }) => (isMobileView ? `width: 100%;` : `width: 40%;`)}
  }
`

export interface TitleDivProps {
  isMobileView: boolean
}
export const TitleDiv = styled.div<TitleDivProps>`
  && {
    text-align: left;
    width: 60%;
    ${({ isMobileView }) =>
      isMobileView ? `display: none;` : `display: grid;`}
  }
`
