import React, { useEffect, useRef } from 'react'
import functionPlot from "function-plot";

function FunctionPlot({data, title, yAxis, xAxis}) {
    const rootEl = useRef(null)
    useEffect(() => {
      try {
        functionPlot({
          target: rootEl.current,
          width: 800,
          height: 550,
          title: title,
          yAxis: yAxis,
          xAxis: xAxis,
          grid: true,
          data: data
      });
      } catch (e) {}
    })
    return (
    <div ref={rootEl}></div>)
}

export default FunctionPlot