import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { singleTrapezoidal, compositeTrapezoidal } from '../utils/trapezoidalRule';
import axios from "axios"
import Plot from 'react-plotly.js';
const math = require('mathjs')

function TrapezoidalRulecode() {
  const [alignment, setAlignment] = useState('single')
  const [expr, setExpr] = useState('');
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [n, setN] = useState(0);
  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }
    const fetchData = async () => {
      try{
        await axios.get('http://localhost:3500/integrate', {headers: config})
          .then(response => {
            setData(response.data)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(alignment === 'single') {
      const result = singleTrapezoidal(parseFloat(a), parseFloat(b), expr)
      setResult(result)
    }
    else {
      const result = compositeTrapezoidal(parseFloat(a), parseFloat(b), expr, parseFloat(n))
      setResult(result)
    }
    console.log(result)
    setShowResult(true)
  }
  const handleChange = (e) => {
    const selected = data.filter(item => item.expr === e.target.value)
    console.log(selected)
    if(selected.length !== 0){
      setExpr(selected[0].expr)
      setA(selected[0].a)
      setB(selected[0].b)  
    } else {
      handleReset()
    }
  }
  const handleReset = () => {
    setExpr("");
    setA(0);
    setB(0);
    setN(0);
    setShowResult(false)
  }

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <Grid container rowSpacing={2} columnSpacing={8} sx={{ width: "50%" }}>
          <Grid item xs={12}>
            <ToggleButtonGroup
              color='warning'
              value={alignment}
              exclusive
              onChange={handleAlignment}
            >
              <ToggleButton value="single">Single</ToggleButton>
              <ToggleButton value="composite">Composite</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
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
              value={a}
              onChange={(e) => setA(e.target.value)}
              label="lower bound (a)"
              variant="outlined"
              color="secondary"
              fullWidth
              required 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={b}
              onChange={(e) => setB(e.target.value)}
              label="upper bound (b)"
              variant="outlined"
              color="secondary"
              fullWidth
              required 
            />
          </Grid>
          {alignment === "composite" &&
          <Grid item xs={12}>
            <TextField
              value={n}
              onChange={(e) => setN(e.target.value)}
              label="n"
              variant="outlined"
              color="secondary"
              required 
            />
          </Grid>
          }
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
      <Box m={10}>
        <Typography fontSize={30} color={"#ed4b82"} mb={5}>
          {`Result = ${result}`}
        </Typography>
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
      </Box>}
    </>
  )
}

export default TrapezoidalRulecode