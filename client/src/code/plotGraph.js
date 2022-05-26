import functionPlot from "function-plot";

export default function plotGraph(expr) {
  return functionPlot({
    target: "#graph",
    title: `y = ${expr}`,
    width: 800,
    height: 550,
    yAxis: { domain: [-2, 8] },
    xAxis: { domain: [-6, 6] },
    grid: true,
    data: [
      {
        fn: expr,
        color: "red",
      },
    ],
  });
}
