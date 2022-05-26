import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material';
import MatrixInputItem from '../components/MatrixInputItem';
import polynomialRegression from '../utils/polynomial-Regression';

function PolynomialRegressioncode() {
  const multiple = false
  const [matrixSize, setMatrixSize] = useState({rows: 1, columns: 2})
  const [matrix, setMatrix] = useState([0, 0])
  const [matrixY, setMatrixY] = useState([0, 0])
  const [m, setM] = useState(2)
  const [answer, setAnswer] = useState([])
  const [showResult, setShowResult] = useState(false)

  const calculate = useCallback(() => {
      console.log("first")
      console.log(matrix)
      console.log(matrixY)
      console.log(m)
      const { _data }  = polynomialRegression(matrix, matrixY, parseInt(m))
      console.log(_data)
      setAnswer(_data)
      setShowResult(true)
  }, [matrix, matrixY, m])
  
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
            label="number of points"
            type="number"
            variant="outlined"
            defaultValue={2}
            required
            onChange={e => {
              const columns = parseInt(e.target.value)
                if(columns > 0) {
                  setMatrixSize(prevSize => ({
                    ...prevSize,
                    columns: columns,
                  }))
                }
              }}
      />
      <TextField
            label="m"
            type="number"
            variant="outlined"
            defaultValue={2}
            required
            onChange={e => {
              const ma =  parseInt(e.target.value)
              console.log(ma)
                if(ma > 0) {
                  setM(ma)
                }
              }}
      />
    </Box>
      <MatrixInputItem matrixSize={matrixSize} setMatrix={setMatrix} setMatrixY={setMatrixY} multiple={multiple} calculate={calculate}/>
      {/* <Button onClick={calculate}>
            Submit
      </Button> */}
      {showResult && answer.map((item, index) => <Typography key={index}>{`X${index} = ${item}`}</Typography>)}
  </>
)
}

export default PolynomialRegressioncode