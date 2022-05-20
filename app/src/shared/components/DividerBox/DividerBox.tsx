import { Box } from '@mui/material'
import React from 'react'

interface DividerBoxProps {}
export const DividerBox: React.FC<DividerBoxProps> = () => {
  return <Box sx={{ height: '10px', width: '100%' }} />
}

export default DividerBox
