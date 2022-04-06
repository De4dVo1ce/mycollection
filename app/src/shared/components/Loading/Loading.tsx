import { CircularProgress } from '@mui/material'
import React from 'react'
import { LoadingDiv } from './Loading.styles'

interface LoadingPropd {}
export const Loading: React.FC<LoadingPropd> = () => {
  return (
    <LoadingDiv>
      <CircularProgress />
    </LoadingDiv>
  )
}

export default Loading
