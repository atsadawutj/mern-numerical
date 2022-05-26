import React from 'react'
import { Box, TextField } from '@mui/material';

function MatrixInputSize({setMatrixSize}) {
  return (
    <Box flexDirection={"row"} margin={5}>
        <TextField
            label="number of X"
            type="number"
            variant="outlined"
            defaultValue={2}
            required
            onChange={e => {
                const rows = parseInt(e.target.value)
                // if we only want matrix of size between 2 and 8
                if (2 <= rows && rows <= 8) {
                    setMatrixSize(prevSize => ({
                    ...prevSize,
                    rows: rows,
                }))
                }
            }}
        />
        <TextField
            label="number of points"
            type="number"
            variant="outlined"
            defaultValue={2}
            required
            onChange={e => {
                const columns = parseInt(e.target.value)
                // if we only want matrix of size between 2 and 8
                if (2 <= columns && columns <= 8) {
                    setMatrixSize(prevSize => ({
                    ...prevSize,
                    columns: columns,
                }))
                }
            }}
        />
    </Box>
  )
}

export default MatrixInputSize