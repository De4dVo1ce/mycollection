import { Typography } from '@mui/material'
import styled from 'styled-components'

export const HeaderDiv = styled.div`
  && {
    display: flex;
    align-items: 'center';
    flex-wrap: 'wrap';
    gap: 10px;
    margin-bottom: 16px;
    width: 100%;
  }
`

export const HeaderTypography = styled(Typography)`
  && {
    width: 100%;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
  }
`
