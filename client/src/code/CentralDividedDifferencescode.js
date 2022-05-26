import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { firstCentralH2, secondCentralH2, firstCentralH4, secondCentralH4 } from '../utils/centralDividedDifference';
import axios from "axios"
import Plot from 'react-plotly.js';
const math = require('mathjs')

function CentralDividedDifferencescode() {
    const [alignmentOrder, setAlignmentOrder] = useState('first')
    const [alignmentError, setAlignmentError] = useState('h2')
    const [expr, setExpr] = useState('');
    const [x, setX] = useState(0);
    const [h, setH] = useState(0);
    const [result, setResult] = useState({})
    const [showResult, setShowResult] = useState(false)
    const [showGraph, setShowGraph] = useState(false)
    const [data, setData] = useState([])

    const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }

    useEffect(() => {
      async function getData() {
        await axios.get('http://localhost:3500/diff', {headers: config})
          .then(response => {
            setData(response.data)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
      getData()
    }, [])

    const handleChange = (e) => {
      const selected = data.filter(item => item.expr === e.target.value)
      console.log(selected)
      if(selected.length !== 0){
        setExpr(selected[0].expr)
        setX(selected[0].x)
        setH(selected[0].h)  
      } else {
        handleReset()
      }
    }
    const handleSubmit = (e) => {
      e.preventDefault()
        let k = 0
        if(alignmentOrder === 'first') {
            if(alignmentError === 'h2') {
                k = firstCentralH2(expr, parseFloat(x), parseFloat(h))
                console.log('firstCentralH2')
            } else {
                k = firstCentralH4(expr, parseFloat(x), parseFloat(h))
                console.log('firstCentralH4')
            }
        }
        else {
            if(alignmentError === 'h2') {
                k = secondCentralH2(expr, parseFloat(x), parseFloat(h))
                console.log('secondCentralH2')
            } else {
                k = secondCentralH4(expr, parseFloat(x), parseFloat(h))
                console.log('secondCentralH4')
            }
        }
        console.log(k)
        setResult(k)
        setShowResult(true)
        setShowGraph(true)
    }
  
    const handleReset = () => {
      setExpr("");
      setX(0);
      setH(0);
      setShowResult(false)
    }

    const handleAlignmentOrder = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignmentOrder(newAlignment);
        }
    }
    const handleAlignmentError = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignmentError(newAlignment);
        }
    }
    return (
    <>
      <FormControl variant="standard" sx={{ m: 3, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Expression</InputLabel>
            <Select
              value={expr}
              onChange={handleChange}
              label="Expression"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {data.map((element, index) => {
                return <MenuItem key={index} value={element.expr}>{element.expr}</MenuItem>
              })}
            </Select>
        </FormControl>
        <form onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={8} sx={{ width: "50%" }}>
            <Grid item xs={12}>
              <TextField
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                label="Expression"
                variant="outlined"
                color="secondary"
                fullWidth
                required 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={x}
                onChange={(e) => setX(e.target.value)}
                label="X"
                variant="outlined"
                color="secondary"
                fullWidth
                required 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={h}
                onChange={(e) => setH(e.target.value)}
                label="h"
                variant="outlined"
                color="secondary"
                fullWidth
                required 
              />
            </Grid>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    color='warning'
                    value={alignmentOrder}
                    fullWidth
                    exclusive
                    onChange={handleAlignmentOrder}
                >
                    <ToggleButton value="first">first</ToggleButton>
                    <ToggleButton value="second">second</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <ToggleButtonGroup
                    color='secondary'
                    value={alignmentError}
                    fullWidth
                    exclusive
                    onChange={handleAlignmentError}
                >
                    <ToggleButton value="h2">h^2</ToggleButton>
                    <ToggleButton value="h4">h^4</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="success"
                variant="contained"
                style={{ width: "40%" }}
              >
                SUBMIT
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => handleReset()}
                color="error"
                variant="contained"
                style={{ width: "40%" }}
                >
                CLEAR
              </Button>
            </Grid>
          </Grid>
        </form>
        {showResult &&
          <Box m={3}>
            <Typography fontSize={30} color={"#4caf50"}>
                {`Result = ${parseFloat(result.result).toFixed(10)}`}
            </Typography>
            <Typography fontSize={30} color={"#ed4b82"}>
                {`Error = ${parseFloat(result.error).toFixed(10)}`}
            </Typography>
          </Box>
        }
        {showGraph &&
          <Plot
            data={[
              {
                x: math.range(-10, 10, 0.5).toArray(),
                y: math.range(-10, 10, 0.5).toArray().map(function (x){
                    return math.parse(expr).evaluate({ x: x })}), 
                marker: {color: 'red'}
              },
            ]}
            layout={{width: 700, height: 600, title: `f(x) = ${expr}`}}
          />
        }
    </>
    )
}

export default CentralDividedDifferencescode