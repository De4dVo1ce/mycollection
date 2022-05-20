import styled from 'styled-components'

export const CollectionEditDiv = styled.div`
  && {
    display: grid;
    grid-template-areas: 'name' 'edit';
    align-items: center;
    align-content: center;
    text-align: left;
  }
`

export const PropEditDiv = styled.div`
  && {
    grid-area: edit;
  }
`
