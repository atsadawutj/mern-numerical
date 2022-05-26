import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Typography, Box, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, List } from '@mui/material';
import MatrixInputItem from '../components/MatrixInputItem';
import conjugateGradient from '../utils/conjugateGradient';

function ConjugateGradientcode() {
  const multiple = true
  const [matrixSize, setMatrixSize] = useState({rows: 2, columns: 2})
  const [matrix, setMatrix] = useState([0, 0])
  const [matrixY, setMatrixY] = useState([0, 0])
  const [result, setResult] = useState([])
  const [showResult, setShowResult] = useState(false)

  const calculate = useCallback(() => {
      console.log(matrix)
      console.log(matrixY)
      const x  = conjugateGradient(matrix, matrixY)
      console.log(x)
      setResult(x)
      setShowResult(true)
  }, [matrix, matrixY])
  
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      calculate() // do something after state has updated
    }
  }, [calculate])

  useEffect(() => { 
      isFirstRender.current = false // toggle flag after first render/mounting
  }, [])

  return (
  <>  
    <Box sx={{ display: 'flex', flexDirection: 'column' }} margin={5} gap={2} width={200}>
      <TextField
            label="n"
            variant="outlined"
            defaultValue={2}
            required
            onChange={e => {
              const rows = parseInt(e.target.value)
                if(rows > 0) {
                  setMatrixSize({
                      rows: rows,
                      columns: rows,
                  })
                }
              }}
      />
    </Box>
    <MatrixInputItem matrixSize={matrixSize} setMatrix={setMatrix} setMatrixY={setMatrixY} multiple={multiple}/>
      {showResult && 
        <>
          <Box m={5}>
            {result[result.length - 1].x_new.map((x, i) => {
              return <Typography key={i} fontSize={30} color={"#ed4b82"}>{`x${i+1} = ${x}`}</Typography>
            })}
          </Box>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#64d8cb" }}>
              <TableRow sx={{
                  "& th": {
                    fontSize: "1.25rem"
                  }
                }}
              >
                <TableCell component="td">Iteration</TableCell>
                <TableCell component="td">X</TableCell>
                <TableCell component="td">Error</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((item) => (
                <TableRow
                  key={item.i}
                  sx={{ "&:last-child td": { border: 0 }, "& td" : { fontSize: "1rem" }}}
                >
                  <TableCell key= {'i' + item.i} component="td">{item.i}</TableCell>
                  <TableCell key= {'x' + item.i} size="small" component="td">{item.x_new.map((e, j) => {
                    return <List key= {`x${item.i}${j}`}>{`x${j + 1} = ${parseFloat(e).toFixed(10)}`}</List>
                    })}
                  </TableCell>
                  <TableCell key= {'e' + item.i} size="small" component="td">{(item.i === 1) ? '' : parseFloat(item.error).toFixed(10)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </>
      }
  </>
  )
}

export default ConjugateGradientcode