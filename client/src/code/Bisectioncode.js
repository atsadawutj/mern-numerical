import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios"
import bisection from "../utils/bisection";
import Plot from 'react-plotly.js';
const math = require('mathjs')

function BisectionCode() {
  const [xl, setXl] = useState(0);
  const [xr, setXr] = useState(0);
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showGraph, setShowGraph] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }
    function getData() {
      axios.get('http://localhost:3500/bisection', {headers: config})
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = bisection(expr, xl, xr);
    setResult(answer);
    setShowAnswer(true);
    setShowGraph(true)
  };

  const handleChange = (e) => {
    const selected = data.filter(item => item.expr === e.target.value)
    console.log(selected)
    if(selected.length !== 0){
      setExpr(selected[0].expr)
      setXl(selected[0].xl)
      setXr(selected[0].xr)  
    } else {
      handleReset()
    }
  }

  const handleReset = () => {
    setExpr("");
    setXl(0);
    setXr(0);
  };

  return (
    <div>
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
        <Grid container mb={2} width={500} rowGap={2}>
          <Grid item xs={12}>
            <TextField
              value={expr}
              onChange={(e) => setExpr(e.target.value)}
              id="outlined-basic"
              label="Equation"
              variant="outlined"
              color="secondary"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={xl}
              onChange={(e) => setXl(e.target.value)}
              id="outlined-basic"
              type="number"
              label="XL"
              variant="outlined"
              color="secondary"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={xr}
              onChange={(e) => setXr(e.target.value)}
              id="outlined-basic"
              type="number"
              label="XR"
              variant="outlined"
              color="secondary"
              required
            />
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
      {showAnswer && (
        <div>
          <Typography variant="h4" my={2}>
            {`Anwser = ${parseFloat(result[result.length - 1].xm).toFixed(10)}`}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#64d8cb" }}>
                <TableRow sx={{
                    "& th": {
                      fontSize: "1.25rem"
                    }
                  }}
                >
                  <TableCell>Iteration</TableCell>
                  <TableCell>xm</TableCell>
                  <TableCell>fxm</TableCell>
                  <TableCell>xl</TableCell>
                  <TableCell>xr</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((item) => (
                  <TableRow
                    key={item.i}
                    sx={{ "&:last-child td": { border: 0 }, "& td" : { fontSize: "1rem" }}}
                  >
                    <TableCell component="td">{item.i}</TableCell>
                    <TableCell component="td">{parseFloat(item.xm.toFixed(10))}</TableCell>
                    <TableCell component="td">{parseFloat(item.fxm).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.xl).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.xr).toFixed(10)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default BisectionCode;
