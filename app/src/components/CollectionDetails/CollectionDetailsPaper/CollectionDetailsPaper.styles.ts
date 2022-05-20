import styled from 'styled-components'
import { COLLECTION_DETAILS_PROP_NAME_WIDTH } from '../../AppBase'

export const CollectionPropsDiv = styled.div`
  && {
    width: 100%;
    display: grid;
    grid-template-areas:
      'desc desc desc desc'
      'count count . .'
      'cols cols cols cols';
    row-gap: 8px;
    text-align: left;
  }
`

interface PropDivProps {
  isMobileView: boolean
  area: string
}
export const PropDiv = styled.div<PropDivProps>`
  && {
    width: 100%;
    grid-area: ${({ area }) => area};
    display: grid;
    grid-template-areas: ${({ isMobileView }) =>
      isMobileView
        ? `'name . . .' 'text text text text'`
        : `'name text text text'`};
    grid-template-columns: ${COLLECTION_DETAILS_PROP_NAME_WIDTH} auto auto auto;
  }
`

export const PropNameDiv = styled.div`
  && {
    grid-area: name;
    font-weight: bold;
  }
`

export const PropTextDiv = styled.div`
  && {
    grid-area: text;
  }
`

export const CountDiv = styled.div`
  && {
    width: 100%;
    grid-area: count;
    display: grid;
    grid-template-areas: 'name text';
    grid-template-columns: ${COLLECTION_DETAILS_PROP_NAME_WIDTH} auto;
  }
`
