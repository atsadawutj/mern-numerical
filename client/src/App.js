import './App.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home';

import Bisection from './containers/Bisection';
import FalsePosition from './containers/FalsePosition';
import OnePointIteration from './containers/OnePointIteration';
import NewtonRaphson from './containers/NewtonRaphson';
import Secant from './containers/Secant';

import CramerRule from './containers/CramerRule';
import GaussElimination from './containers/GaussElimination';
import GaussJordan from './containers/GaussJordan';
import LUDecomposition from './containers/LUDecomposition';
import Jacobi from './containers/Jacobi';
import GaussSeidel from './containers/GaussSeidel';
import ConjugateGradient from './containers/ConjugateGradient';

import LinearRegression from './containers/LinearRegression';
import MultiLinearRegression from './containers/MultiLinearRegression';
import PolynomialRegression from './containers/PolynomialRegression';

import TrapezoidalRule from './containers/TrapezoidalRule';
import SimpsonsRule from './containers/SimpsonsRule';

import ForwardDividedDifferences from './containers/ForwardDividedDifferences';
import BackwardDividedDifferences from './containers/BackwardDividedDifferences';
import CentralDividedDifferences from './containers/CentralDividedDifferences';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="bisection" element={<Bisection />} />
          <Route path="false-position" element={<FalsePosition />} />
          <Route path="one-point" element={<OnePointIteration />} />
          <Route path="newton-raphson" element={<NewtonRaphson />} />
          <Route path="secant" element={<Secant />} />
          <Route path='cramer' element={<CramerRule />}/>
          <Route path='gauss-elimination' element={<GaussElimination />}/>
          <Route path='gauss-jordan' element={<GaussJordan />}/>
          <Route path='lu-decomposition' element={<LUDecomposition />}/>
          <Route path='jacobi' element={<Jacobi />}/>
          <Route path='gauss-seidel' element={<GaussSeidel />}/>
          <Route path='conjugate-gradient' element={<ConjugateGradient />}/>
          <Route path="linear-regression" element={<LinearRegression />} />
          <Route path="polynomial-Regression" element={<PolynomialRegression />} />
          <Route path="multiple-linear-regression" element={<MultiLinearRegression />} />
          <Route path="trapezoidal-rule" element={<TrapezoidalRule />} />
          <Route path="simpson-rule" element={<SimpsonsRule />} />
          <Route path="forward-divided-difference" element={<ForwardDividedDifferences />} />
          <Route path="backward-divided-difference" element={<BackwardDividedDifferences />} />
          <Route path="central-divided-difference" element={<CentralDividedDifferences />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
