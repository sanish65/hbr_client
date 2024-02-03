// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// interface ChartProps {
//   data: any[]; 
//   chartType: 'bar' | 'pie';
// }

// const Chart: React.FC<ChartProps> = ({ data, chartType }) => {
//   const chartRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (data.length === 0 || !chartRef.current) return;

//     const width = 400; 
//     const height = 300; 
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(chartRef.current).attr('width', width).attr('height', height);

//     if (chartType === 'bar') {
//       // Bar Chart
//       const xScale = d3.scaleBand()
//         .domain(data.map((d) => d.source))
//         .range([0, width])
//         .padding(0.1);

//       const yScale = d3.scaleLinear()
//         .domain([0, d3.max(data, (d) => d.statuses.length)])
//         .range([height, 0]);

//       svg.selectAll('rect')
//         .data(data)
//         .enter().append('rect')
//         .attr('x', (d) => xScale(d.source) || 0)
//         .attr('y', (d) => yScale(d.statuses.length) || 0)
//         .attr('width', xScale.bandwidth())
//         .attr('height', (d) => height - yScale(d.statuses.length) || 0)
//         .attr('fill', 'steelblue');
//     } else if (chartType === 'pie') {
//       // Pie Chart
//       const arc = d3.arc()
//         .outerRadius(radius - 10)
//         .innerRadius(0);

//       const pie = d3.pie()
//         .value((d) => d.statuses.length);

//       const pieData = pie(data);

//       const pieChart = svg.append('g')
//         .attr('transform', `translate(${width / 2}, ${height / 2})`);

//       pieChart.selectAll('path')
//         .data(pieData)
//         .enter().append('path')
//         .attr('d', arc)
//         .attr('fill', (d, i) => d3.schemeCategory10[i])
//         .attr('stroke', 'white')
//         .style('stroke-width', '2px');
//     }
//   }, [data, chartType]);

//   return <svg ref={chartRef}></svg>;
// };

// export default Chart;
