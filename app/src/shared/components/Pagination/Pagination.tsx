import React from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import { PaginationDiv } from './Pagination.styled'

export interface PaginationProps {
  page: number
  rowsPerPage: number
  count: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  rowsPerPage,
  count,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1)
  }

  return (
    <PaginationDiv>
      <MuiPagination
        page={page}
        count={Math.ceil(count / rowsPerPage)}
        variant="outlined"
        color="primary"
        onChange={handleChange}
        sx={{ display: 'inline-block', margin: 'auto' }}
      />
    </PaginationDiv>
  )
}

export default Pagination
