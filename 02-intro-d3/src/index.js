import * as d3 from 'd3';

d3.select("body").append("div").attr("class", "mon-svg").append("svg");
const svg = d3.select("svg").attr("height", "500").attr("width", "500");

/* ** CREATE CIRCLES ** */
//Circle 1
svg.append("circle").attr("class", "circle first-circle").attr("cx", "50").attr("cy", "50").attr("r", "50");
//Circle 2
svg.append("circle").attr("class", "circle second-circle").attr("cx", "150").attr("cy", "150").attr("r", "50");
//Circle 3
svg.append("circle").attr("class", "circle third-circle").attr("cx", "250").attr("cy", "250").attr("r", "50");

/* **CHANGE CIRCLE COLOR AND PLACEMENT ** */
d3.select(".second-circle").attr("fill", "transparent").attr("stroke", "royalblue").attr("cx", "200");
d3.select(".third-circle").attr("cx", "300")

/* ** ADD TEXT ** */
const circles = d3.selectAll("circle");
svg.append("text").text("Text").attr("x", "35").attr("y", "115");
svg.append("text").text("Text").attr("x", "185").attr("y", "215");
svg.append("text").text("Text").attr("x", "285").attr("y", "315");

/* ** EVENTS ** */
d3.select(".third-circle").on("click", () => {
    circles.attr("cx", "150");
});

/* ** DATA ** */
const data = [20, 5, 25, 8, 15];
svg.selectAll("rect").data(data).enter().append("rect").attr("width", "20").attr("height", d=>d).attr("y", d=>500-d).attr("x", (d,i)=>i*22+30);