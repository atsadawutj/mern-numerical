import React, { useState } from 'react'
import MatrixInputItem from '../components/MatrixInputItem';
import MatrixInputSize from '../components/MatrixInputSize';

function MatrixInput() {
    const [matrixSize, setMatrixSize] = useState({rows: 2, columns: 2})
    const [matrix, setMatrix] = useState([[0, 0], [0, 0]])
    const [matrixY, setMatrixY] = useState([0, 0])
    return (
    <>
        <MatrixInputSize setMatrixSize={setMatrixSize} />
        <MatrixInputItem matrixSize={matrixSize} setMatrix={setMatrix} setMatrixY={setMatrixY}/>
        {console.log(matrix)}
        {console.log(matrixY)}
    </>
  )
}

export default MatrixInput