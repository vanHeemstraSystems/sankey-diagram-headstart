import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as d3 from "d3";
import { sankey as d3sankey, sankeyLinkHorizontal } from "d3-sankey";
import DOM from "@observablehq/stdlib/src/dom/index.js";
import data from "./data";

const width = 600;
const height = 500;

const ENABLE_LINKS_GRADIENTS = true;

const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

const { nodes, links } = d3sankey()
  .nodeId((d) => d.name)
  .nodeWidth(5)
  .nodePadding(5)
  .extent([
    [1, 1],
    [width - 1, height - 5]
  ])(data);

function format(d) {
  const format = d3.format(",.0f");
  return data.units ? (d) => `${format(d)} ${data.units}` : format;
}

svg
  .append("g")
  .attr("stroke", "#000")
  .attr("stroke-width", "0")
  .selectAll("rect")
  .data(nodes)
  .join("rect")
  .attr("x", (d) => d.x0)
  .attr("y", (d) => d.y0)
  .attr("height", (d) => d.y1 - d.y0)
  .attr("width", (d) => d.x1 - d.x0)
  .attr("fill", (d) => d.color)
  .append("title")
  .text((d) => `${d.name}\n${format(d.value)}`);

const link = svg
  .append("g")
  .attr("fill", "none")
  .attr("stroke-opacity", 0.5)
  .selectAll("g")
  .data(links)
  .join("g");
//.style("mix-blend-mode", "multiply");

if (ENABLE_LINKS_GRADIENTS) {
  const gradient = link
    .append("linearGradient")
    .attr("id", (d) => (d.uid = DOM.uid("link")).id)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", (d) => d.source.x1)
    .attr("x2", (d) => d.target.x0);

  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", (d) => d.source.color);

  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", (d) => d.target.color);
}
link
  .append("path")
  .attr("d", sankeyLinkHorizontal())
  .attr("stroke", (d) => (!ENABLE_LINKS_GRADIENTS ? "#f00" : d.uid))
  .attr("stroke-width", (d) => Math.max(1, d.width));

// Hide links
//link
//  .append("title")
//  .text((d) => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);

// Make nodes clickable 
// See https://stackoverflow.com/questions/30669147/how-to-make-nodes-in-sankey-diagram-clickable-using-d3-js-library
// Note: d3.behavior.drag was renamed to d3.drag in v4.
svg
  .append("g")
  .attr("font-family", "sans-serif")
  .attr("font-size", 20)
  .selectAll("text")
  .data(nodes)
  .join("text")
  .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
  .attr("y", (d) => (d.y1 + d.y0) / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
  .text((d) => d.name)
  .on("click",function(d){
    if (d3.event.defaultPrevented) return;
    // window.location = d.url; 
    // See also https://www.pluralsight.com/guides/event-listeners-in-react-components
    // Delegate event for performance, and save attaching a million events to each anchor
    // Example: http://jsfiddle.net/JtF39/79/
    // Usage:
    // <a href=":8080/test/blah">Test absolute</a>
    // <a href=":7051./test/blah">Test relative</a>
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const href = d.url.toString();
    if (href.charAt(0) === ':') // a port (with/without path) as href
    {
      const location = protocol + '//' + hostname;
      window.location = location + d.url;
    } else if (href) // a full url or relative path
    {
      window.location = href;
    }
  });

const domNode = svg.node();
const div = document.createElement("div")
div.className = 'App';
//let p = document.createElement("p")
//div.appendChild(domNode)
document.body.appendChild(domNode);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
