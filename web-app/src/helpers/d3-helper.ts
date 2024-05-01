import * as d3 from "d3";
import { TreeNode } from "../models";
import { D3Connector } from "../models/d3-connector.model";

export class D3Helper {

  private static getChildren(parentId: string, data: TreeNode[]): TreeNode[] {
    const nodes: TreeNode[] = [];
    data.filter(item => item.parent === parentId)
      .forEach(item => {
        const children = D3Helper.getChildren(item.name, data);
        children.length > 0
          ? nodes.push({ "name": item.name, "children": children, description: item.description })
          : nodes.push({ "name": item.name, description: item.description });
      });

    return nodes;
  }

  static async renderTreeView(data: TreeNode[], connector: D3Connector) {

    const treeData: TreeNode = {
      name: data[0].name,
      description: data[0].description,
      children: D3Helper.getChildren(data[0].name, data)
    };

    var margin = { top: 20, right: 90, bottom: 30, left: 90 };
    var containerWidth = document.getElementById('tree-container')?.offsetWidth as number;
    var containerHeight = document.getElementById('tree-container')?.offsetHeight as number;
    var width = containerWidth - margin.left - margin.right;
    var height = containerHeight - margin.top - margin.bottom;

    var treeLayout = d3.tree<TreeNode>()
      .size([height, width]);

    var svg = d3.select("#svg-tree")
      .attr("viewBox", `0 0 ${containerWidth + 50} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    svg.append("g")
      .attr("transform", "translate(" + (margin.left + 100) + "," + margin.top + ")");

    const root = d3.hierarchy<TreeNode>(treeData);
    const treeNodes = treeLayout(root);

    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        const linkGenerator = d3
          .linkHorizontal<d3.HierarchyPointLink<Node>, [number, number]>()
          .source((d) => [d.source.y, d.source.x])
          .target((d) => [d.target.y, d.target.x]);
        return linkGenerator(d as any);
      });

    const nodes = svg.selectAll(".node")
      .data(treeNodes.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any, i = 0) => {
        if (i == 0) {
          i++;
          return `translate(${d.y},${d.x - 40})`
        }
        return `translate(${d.y - 40},${d.x - 40})`
      }).on('click', click)

    nodes.append("rect")
      .attr("width", "5vw")
      .attr("height", "8vh")
      .attr("rx", 15)
      .attr("class", "node-box");

    nodes.append("text")
      .attr("dy", 3)
      .attr("x", "2vw")
      .attr("y", "4vh")
      .attr("class", "node-text")
      .text((d: any) => d.data.name);

    function click(d: any) {
      if (d.target.nodeName === "rect") {
        const nodeData: any[] = d3.select(d.target).data();
        d3.selectAll(".node-box").classed("highlight", false);
        d3.select(d.target).classed("highlight", true);
        connector.click(nodeData[0].data as any);
      }
    }
  }
}



