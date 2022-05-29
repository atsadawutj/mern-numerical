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
import axios from "axios"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const math = require('mathjs')

function Onepointcode() {
  const [xInitial, setXInitial] = useState(0);
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [data, setData] = useState([])
  
  useEffect(() => {
    const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }
    const fetchData = async () => {
      try{
        await axios.get('http://localhost:3500/onepoint', {headers: config})
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

  const handleChange = (e) => {
    const selected = data.filter(item => item.expr === e.target.value)
    console.log(selected)
    if(selected.length !== 0){
      setExpr(selected[0].expr)
      setXInitial(selected[0].x)
    } else {
      handleReset()
    }
  }

  const f = (x) => math.evaluate(expr, x);

  const onepoint = (xInitial) => {
    const ES = 0.000001;
    let e = 1;
    let answer = [];
    let x_old;
    let x_new = f({ x: xInitial });
    let i = 1;
    answer.push({ i, x_new, x_old, e });
    x_old = x_new;
    i++;
    while (e > ES && i < 2000) {
      x_new = f({ x: x_old });
      e = Math.abs((x_new - x_old) / x_new);
      answer.push({ i, x_new, x_old, e });
      x_old = x_new;
      i++;
    }
    setResult(answer);
    setShowAnswer(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onepoint(xInitial);

  };

  const handleReset = () => {
    setExpr("");
    setXInitial(0);
  };

  return (
    <div>
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
          <Grid item xs={12}>
            <TextField
              value={xInitial}
              onChange={(e) => setXInitial(e.target.value)}
              id="outlined-basic"
              type="number"
              label="X_Initial"
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
      <div id="graph"></div>
      {showAnswer && (
        <div>
          <Typography variant="h4" my={2}>
            {`Anwser = ${parseFloat(result[result.length - 1].x_new).toFixed(
              10
            )}`}
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#64d8cb" }}>
                <TableRow
                  sx={{
                    "& th": {
                      fontSize: "1.25rem",
                    },
                  }}
                >
                  <TableCell>Iteration</TableCell>
                  <TableCell>X1_New</TableCell>
                  <TableCell>X1_Old</TableCell>
                  <TableCell>ERROR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((item) => (
                  <TableRow
                    key={item.i}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "& td": { fontSize: "1rem" },
                    }}
                  >
                    <TableCell component="td">{item.i}</TableCell>
                    <TableCell component="td">{parseFloat(item.x_new).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.x_old).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.e).toFixed(10)}</TableCell>
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

export default Onepointcode;
