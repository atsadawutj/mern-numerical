import React, { useCallback, useEffect, useRef, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Typography, Box } from '@mui/material';
import MatrixInputItem from '../components/MatrixInputItem';
import cramerRule from '../utils/cramerRule';

function CramerRulecode() {
    const multiple = true
    const [matrixSize, setMatrixSize] = useState({rows: 2, columns: 2})
    const [matrix, setMatrix] = useState([0, 0])
    const [matrixY, setMatrixY] = useState([0, 0])
    const [result, setResult] = useState([])
    const [showResult, setShowResult] = useState(false)
  
    const calculate = useCallback(() => {
      console.log(matrix)
      console.log(matrixY)
      const x  = cramerRule(matrix, matrixY)
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
        result.map((x, i) => {
                return <Typography key={i} fontSize={30} color={"#ed4b82"}>{`x${i+1} = ${x}`}</Typography>
            })
      }
    </>
    )
}

export default CramerRulecode