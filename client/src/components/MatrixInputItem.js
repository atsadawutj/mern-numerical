import React from 'react'
import { Button, Box, TextField, Typography} from '@mui/material';

function MatrixInputItem({matrixSize, setMatrix, setMatrixY, multiple}) {
    let matrixY = Array(matrixSize.columns).fill(0)
    let matrix = Array(matrixSize.rows)
    for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.columns; j++) {
            // If the floating point number cannot be parsed, we set 0 for this value
            matrix[i][j] = !isNaN(parseFloat(e.target[count].value)) ? parseFloat(e.target[count].value) : 0;
            count += 1;
          }
        }
        for (let i = 0; i < matrixSize.columns; i++) {
            matrixY[i] = !isNaN(parseFloat(e.target[count].value)) ? parseFloat(e.target[count].value) : 0;
            count += 1;
        }
        if(multiple) {
            console.log('multiple')
            setMatrix(matrix);
            setMatrixY(matrixY)
        }else {
            console.log('not multiple')
            setMatrix(matrix[0]);
            setMatrixY(matrixY)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        {matrix.map((row, indexRow = 1) => {
        return (
            <Box key={indexRow} flexDirection={"column"} mb={1}>
                <Typography>{"X" + (indexRow + 1)}</Typography>
                {row.map((item, indexColumn) => {
                    return (
                        <TextField
                            key={indexRow + " " + indexColumn}
                            type="text"
                            size="small"
                            variant='filled'
                            sx={{ width: '10%' , m: 0.5, input: { color: 'red' }}}
                            defaultValue={0}
                            required
                        />
                    )
                })}
            </Box>
        )
        })}
        <Box>
            <Typography>{"Y"}</Typography>
            {matrixY.map((item, index) => {
                return (
                    <TextField
                        key={index}
                        type="text"
                        size="small"
                        variant='filled'
                        sx={{ width: '10%' , m: 0.5, input: { color: 'red' }}}
                        defaultValue={0}
                        required   
                    />
                )
            })}
        </Box>
        <Button
            type="submit"
            color='success'
            variant='contained'
            sx={{ width: '30%' , m: 2}}
        >
        SUBMIT
        </Button>
    </form>
  )
}

export default MatrixInputItem