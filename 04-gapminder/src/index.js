import * as d3 from 'd3'
import dataIncome from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import dataLifeExpectancy from '../data/life_expectancy_years.csv'
import dataPopulation from '../data/population_total.csv'

/*
for (var i = 0; i < dataIncome.length; i++) {
        console.log(dataIncome[i].country);
}
for (var i = 0; i < dataLifeExpectancy.length; i++) {
    console.log(dataLifeExpectancy[i].country);
}
*/

const margin = {
    top: 50,
    right: 10,
    bottom: 0,
    left: 100
},
width = window.innerWidth * 0.7 - margin.left - margin.right,
height = window.innerHeight * 0.9 - margin.top - margin.bottom;

// The svg
const svg = d3.select("body").append("svg").attr('id', 'svg').attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Map and projection

const projection = d3.geoMercator()
  .scale(120)
  .center([0,20])

// Data and color scale
const data = new Map();
const colorScale = d3.scaleThreshold()
  .domain([30, 40, 50, 60, 70, 80, 90])
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
function(dataLifeExpectancy) {
    data.set(dataLifeExpectancy.country, +dataLifeExpectancy['2021'])
}]).then(function(loadData){
    let topo = loadData[0]
    let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

function expectancy(country){
    const c = dataLifeExpectancy.find((e) => e.country === country.name);
    return c
}

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        const data = expectancy(d["properties"]);
        console.log(data)
        if (data) {
            return colorScale(data['2021']);
        }
        return "darkgrey";
    })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )

})

//Clean Data
function cleanData(data) {
    if (isNaN(data)) {
        if (data.includes("k")) {
            const n = data.split("k")[0];
            return Number.parseFloat(n) * 1000;
        } else if (data.includes("M")) {
            const n = data.split("M")[0];
            return Number.parseFloat(n) * 1000000;

        } else if (data.includes("B")) {
            const n = data.split("B")[0];
            return Number.parseFloat(n) * 1000000000;
        }
    }
    return data;
}

//CIRCLES//

//Scale
// const maxGDP = d3.max(dataIncome, function(d) { return cleanData(d[2021]); });
// const minGDP = d3.min(dataIncome, function(d) { return cleanData(d[2021]); });
// const maxExpectancy = d3.max(dataLifeExpectancy, function(d) { return cleanData(d[2021]); })
// const minExpectancy = d3.min(dataLifeExpectancy, function(d){return cleanData(d[2021]); })
// const maxPop = d3.max(dataPopulation, function(d) { return cleanData(d[2021]); })
// const minPop = d3.min(dataPopulation, function(d){return cleanData(d[2021]); })

// const svgGraph = d3.select('body').append('svg').attr('class', 'graph');

// svgGraph.attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// const x = d3.scaleLinear()
//     .domain([minGDP, maxGDP])
//     .range([10, width]);

// svgGraph.append('g')
//     .attr("transform", "translate(5," + height + ")")
//     .call(d3.axisTop(x).ticks(35).tickSize(10)).selectAll("text")
//     .style("text-anchor", "end")
//     .attr("dx", "-0.6em")
//     .attr("dy", "2.4em")
//     .attr("transform", "rotate(-65)");

// //Pow pour avoir une échelle exponentielle qui se concentre vers 0
// const y = d3.scalePow()
//     .domain([0, maxExpectancy])
//     .range([height, 0])
//     .exponent(7);

// svgGraph.append('g')
//     .call(d3.axisRight(y).ticks(10)); 
    
// //Sqrt pour équilibrer les tailles des cercles 
// const r = d3.scaleSqrt()
//     .domain([minPop, maxPop])
//     .range([0, 30]);

// //Circles
// for (var i = 0; i < dataPopulation.length; i++) {
//     if (dataIncome[i]['2021'] && dataLifeExpectancy[i]['2021'] && dataPopulation[i]['2021'] && dataLifeExpectancy[i]['2021']>0) {
//         svgGraph.append("circle")
//         .attr("cx", x(cleanData(dataIncome[i]["2021"]))).attr("cy", y(dataLifeExpectancy[i]["2021"])).attr("r", r(cleanData(dataPopulation[i]["2021"]))).attr('data-life', dataLifeExpectancy[i]['2021']).attr('data-country', dataLifeExpectancy[i]['country']).style("fill", "blue");   
//     }
// }