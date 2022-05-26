import React, { useState } from "react";
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
import plotGraph from "./plotGraph";

const math = require("mathjs");

function FalsePositioncode() {
  const [xl, setXl] = useState(0);
  const [xr, setXr] = useState(0);
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const f = (x) => math.evaluate(expr, x);

  const f_x1 = (xl, xr) =>
    (xl * f({ x: xr }) - xr * f({ x: xl })) / (f({ x: xr }) - f({ x: xl })); // find x1

  const falsePosition = (xl_in, xr_in) => {
    xl_in = parseFloat(xl_in);
    xr_in = parseFloat(xr_in);
    const ES = 0.000001;
    let answer = [];
    let e = 1;
    let i = 1;
    let x1_new = f_x1(xl_in, xr_in);
    let x1_old;
    if (f({ x: x1_new }) * f({ x: xr_in }) < 0) {
      xl_in = x1_new;
    } else {
      xr_in = x1_new;
    }
    answer.push({ i, x1_new, x1_old, xl_in, xr_in, e });
    x1_old = x1_new;
    i++;
    while (e > ES) {
      x1_new = f_x1(xl_in, xr_in);
      if (f({ x: x1_new }) * f({ x: xr_in }) < 0) {
        xl_in = x1_new;
      } else {
        xr_in = x1_new;
      }
      e = Math.abs((x1_new - x1_old) / x1_new);
      answer.push({ i, x1_new, x1_old, xl_in, xr_in, e });
      x1_old = x1_new;
      i++;
    }
    setResult(answer);
    setShowAnswer(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    plotGraph(expr);
    falsePosition(xl, xr);
  };

  const handleReset = () => {
    setExpr("");
    setXl(0);
    setXr(0);
  };

  return (
    <div>
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
      <div id="graph"></div>
      {showAnswer && (
        <div>
          <Typography variant="h4" my={2}>
            {`Anwser = ${parseFloat(result[result.length - 1].x1_new).toFixed(10)}`}
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
                  <TableCell>XL</TableCell>
                  <TableCell>XR</TableCell>
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
                    <TableCell component="td">{parseFloat(item.x1_new).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.x1_old).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.xl_in).toFixed(10)}</TableCell>
                    <TableCell component="td">{parseFloat(item.xr_in).toFixed(10)}</TableCell>
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

export default FalsePositioncode;
