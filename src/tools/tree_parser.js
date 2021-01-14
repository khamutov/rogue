import rd3 from 'react-d3-library';

import * as d3 from "d3";
import {useEffect, useState} from "react";

import './tree_parser.css';

const RD3Component = rd3.Component;

function gen_data(treeData) {
  console.log("runned!");

  const margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

  const root = d3.hierarchy(treeData);
  // var width = 400, height = 420;

  const treeLayout = d3.cluster();
  treeLayout.size([400, 200]);
  treeLayout(root);

  var rootNode = document.createElement('div');
  const svg = d3.select(rootNode).append("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const links = g.append("g").attr("class", "links");
  const nodes = g.append("g").attr("class", "nodes");

  // Nodes
  var node = nodes
    .selectAll('circle.node')
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", function(d) {
      if (d.data.name === "null") {
        return "node-invisible"
      }

      return "node";
    })
    .attr("visibility", function(d) {
    if (d.data.name === "null") {
      return "hidden"
    }

    return "visible";
  });
    // .classed('node', true);

  node.append('circle')
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .attr('r', 10);


  // adds the text to the node
  node
    .append("text")
    .attr("dx", function(d) {return d.x - 3;})
    .attr("dy", function(d) {return d.y + 3;})
    // .style("text-anchor", "middle")
    .text(function(d) {
      console.log(d);
      return d.data.name;
    });

  // Links
  links
    .selectAll('line.link')
    .data(root.links())
    .enter()
    .append('line')
    .classed('link', true)
    .attr('x1', function(d) {return d.source.x;})
    .attr('y1', function(d) {return d.source.y;})
    .attr('x2', function(d) {return d.target.x;})
    .attr('y2', function(d) {return d.target.y;})
    .attr("visibility", function(d) {
      if (d.target.data.name === "null") {
        return "hidden"
      }

      return "visible";
    });

  return rootNode;
}

function buildTree(tree, idx, nodes_array) {
  const left_idx = idx * 2 + 1;

  if (left_idx < nodes_array.length) {
    var subtree = {};
    subtree.name = nodes_array[left_idx];
    if (subtree.name !== "null") {
      buildTree(subtree, left_idx, nodes_array);
    }
    if (!tree.children) {
      tree.children = [];
    }
    tree.children.push(subtree);
  }

  const right_idx = idx * 2 + 2;
  if (right_idx < nodes_array.length) {
    var subtree = {};
    subtree.name = nodes_array[right_idx];
    if (subtree.name !== "null") {
      buildTree(subtree, right_idx, nodes_array);
    }
    if (!tree.children) {
      tree.children = [];
    }
    tree.children.push(subtree);
  }
}

function parseStr(str) {
  const nodes = str.split(",");

  var treeData = {}

  if (nodes.length === 0) {
    return treeData;
  }

  treeData.name = nodes[0];
  treeData.children = [];

  console.log(treeData);

  buildTree(treeData, 0, nodes);

  return treeData;
}

export function TreeParserPage() {
  const [d3node, setD3node] = useState('');
  const [treeStr, setTreeStr] = useState('1,2,3,4,5,null,7,8,9,0,11,12,13,14,15');

  const initial_tree = parseStr(treeStr);

  useEffect(() => {
    setD3node(gen_data(initial_tree));
  }, []);

  function handleTreeChange(e) {
    const treeData = parseStr(e.target.value);
    setTreeStr(e.target.value);
    // setTreeStr(JSON.stringify(treeData));

    setD3node(gen_data(treeData));
  }

  return (
    <div>
      <h1>Tree parser and visualizer</h1>
      <textarea cols="60" value={treeStr} placeholder="Heap tree repr" onChange={handleTreeChange} />
      <div>
        <p>Current tree</p>
        <p>{treeStr}</p>
      </div>
      <div>
        <RD3Component data={d3node} />
      </div>
    </div>

  )
}