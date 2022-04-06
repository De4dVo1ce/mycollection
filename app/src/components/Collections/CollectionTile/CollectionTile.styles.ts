import { Typography } from '@mui/material'
import styled from 'styled-components'

export const CollectionTileDiv = styled.div`
  && {
    display: grid;
    grid-template-areas: 'name' 'description' 'details';
  }
`

export const NameAreaDiv = styled.div`
  && {
    grid-area: name;
    margin-bottom: 10px;
    display: grid;
    grid-template-areas: 'name action';
    grid-template-columns: 100% auto;
  }
`

export const NameArea = styled.div`
  && {
    grid-area: name;
  }
`

export const NameTypography = styled(Typography)`
  && {
  }
`

export const ActionArea = styled.div`
  && {
    grid-area: action;
  }
`

export const DescriptionArea = styled.div`
  && {
    grid-area: description;
  }
`

export const DetailsArea = styled.div`
  && {
    grid-area: details;
  }
`
