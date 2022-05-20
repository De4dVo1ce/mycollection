import { TextField as MuiTextField } from '@mui/material'
import styled from 'styled-components'

export const AddEnumValueDiv = styled.div`
  && {
    display: grid;
    grid-template-areas: 'text text . add';
  }
`

export const EnumValueTextField = styled(MuiTextField)`
  && {
    grid-area: text;
  }
`

export const AddButtonDiv = styled.div`
  && {
    grid-area: add;
    align-self: center;
  }
`
