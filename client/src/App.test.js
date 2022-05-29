import { fireEvent, render, screen } from '@testing-library/react';
import SimpsonsRulecode from './code/SimpsonsRulecode';
import { singleSimpson, compositeSimpson } from './utils/SimpsonsRule';
import { fetchDataIntegrate } from './api/integrate';
import axios from 'axios'
jest.mock('axios');

test('click button clear', () => {
  render(<SimpsonsRulecode />)

  const button = screen.getByText(/CLEAR/i)
  const expr = screen.getByLabelText(/Expression/i)
  const inputA = screen.getByPlaceholderText(/lower bound \(a\)/i)
  const inputB = screen.getByPlaceholderText(/upper bound \(b\)/i)

  fireEvent.click(button)

  expect(expr.value).toBe("");
  expect(inputA.value).toBe("0");
  expect(inputB.value).toBe("0");
});

test('function 1', () => {
  expect(singleSimpson(2, 8, '4x^5 - 3x^4 + x^3 - 6x + 2')).toBe(162216)
});

test('function 2', () => {
  expect(compositeSimpson(-1, 2, 'x^7 + 2x^3 - 1', 6)).toBe(37.390625)
});

test('api', async () => {
  const url = 'http://localhost:3500/integrate'
  const config = { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcHNpIiwiaWF0IjoxNjUzNTQxOTQzLCJleHAiOjE2ODUwNzc5NDN9.t_ENYPHSnkLj18auCs_2UV9hauWyvMGcMBRAh7-Eqbg` }
  const data = [
    {
      "_id": "628e60365649f7e4fc7fe2df",
      "expr": "4x^5 - 3x^4 + x^3 - 6x + 2",
      "a": 2,
      "b": 8
    },
    {
      "_id": "628e60555649f7e4fc7fe2e1",
      "expr": "x^7 + 2x^3 - 12",
      "a": -1,
      "b": 2
    }
  ];

  const payload =  { data }
  axios.get = jest.fn().mockResolvedValue(payload)
  const response = await fetchDataIntegrate()
  expect(response).toEqual(data)

  expect(axios.get).toBeCalledWith(url, {headers: config})
  expect(axios.get).toHaveBeenCalled()
});