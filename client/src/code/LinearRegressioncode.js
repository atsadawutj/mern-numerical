import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Typography, Box, Grid, Button } from '@mui/material';
import MatrixInputItem from '../components/MatrixInputItem';
import linearRegression from '../utils/linear-regression';
import FunctionPlot from '../components/FunctionPlot';

function LinearRegressioncode() {
  const border = 10
  const multiple = false
  const [matrixSize, setMatrixSize] = useState({rows: 1, columns: 2})
  const [matrix, setMatrix] = useState([0, 0])
  const [matrixY, setMatrixY] = useState([0, 0])
  const [a0, setA0] = useState(0)
  const [a1, setA1] = useState(0)
  const [points, setPoints] = useState([])
  const [inputX, setInputX] = useState('')
  const [result, setResult] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [showGraph, setShowGraph] = useState(false)

  const calculate = useCallback(() => {
    console.log(matrix)
    console.log(matrixY)
    const a = matrix.map((value, index) => [value, matrixY[index]])
    setPoints(prev => prev.concat(a))
    console.log(a)
    const [a0, a1]  = linearRegression(matrix, matrixY)
    setA0(a0)
    setA1(a1)
    console.log(a0, a1)
    setShowGraph(true)
  }, [matrix, matrixY])

  const handleSubmitX = (e) => {
    e.preventDefault()
    const result = a0 + a1 * parseFloat(inputX)
    console.log(result)
    setResult(result)
    setShowResult(true)
  }
  
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
    </Box>
    <MatrixInputItem matrixSize={matrixSize} setMatrix={setMatrix} setMatrixY={setMatrixY} multiple={multiple} calculate={calculate}/>
    {showGraph && 
        <Box>
            <form onSubmit={handleSubmitX}>
                <Grid container m={5} width={600} rowGap={2} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <TextField
                    value={inputX}
                    onChange={(e) => setInputX(e.target.value)}
                    label="INPUT X"
                    variant="outlined"
                    color="secondary"
                    sx={{width: 300}}
                    required
                />
                <Button 
                    type="submit"
                    color='success'
                    variant='contained'
                >
                CALCULATE
                </Button>
                </Grid>
            </form>
            <Typography fontSize={20}>
                a0 = {a0}
            </Typography>
            <Typography fontSize={20} sx={{mb: 5}}>
                a1 = {a1}
            </Typography>
            <FunctionPlot
                title={`f(x) = ${a0.toFixed(5)} + ${a1.toFixed(5)}x`}
                data={[
                    {
                        fn: `${a0} + ${a1}x`,
                    },
                    {
                    points: points,
                    fnType: 'points',
                    graphType: 'scatter'
                    }
                ]}
                yAxis= {{ domain: [points[0][1] - border, points[points.length - 1][1] + border]}}
                xAxis= {{ domain: [points[0][0] - border, points[points.length - 1][0] + border]}}
            />
        </Box>
    }
    {showResult &&
        <Typography fontSize={30} color={"#ed4b82"}>
            result = {result}
        </Typography>
    }
  </>
  )
}

export default LinearRegressioncode