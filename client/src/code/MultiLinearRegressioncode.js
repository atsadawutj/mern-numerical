import { Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MatrixInputItem from '../components/MatrixInputItem';
import MatrixInputSize from '../components/MatrixInputSize';
import multipleLinearRegression from '../utils/multi-linear-regression';

function MultiLinearRegressioncode() {
    const multiple = true
    const [matrixSize, setMatrixSize] = useState({rows: 2, columns: 2})
    const [matrix, setMatrix] = useState([[0, 0], [0, 0]])
    const [matrixY, setMatrixY] = useState([0, 0])
    const [answer, setAnswer] = useState([])
    const [showResult, setShowResult] = useState(false)

    const calculate = useCallback(() => {
      const { _data }  = multipleLinearRegression(matrix, matrixY)
      console.log(_data)
      setAnswer(_data)
      setShowResult(true)
    },[matrix, matrixY])
    
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
        <MatrixInputSize setMatrixSize={setMatrixSize} />
        <MatrixInputItem matrixSize={matrixSize} setMatrix={setMatrix} setMatrixY={setMatrixY} multiple={multiple} calculate={calculate}/>
        {showResult && answer.map((item, index) => <Typography key={index}>{`X${index} = ${item}`}</Typography>)}
    </>
  )
}

export default MultiLinearRegressioncode