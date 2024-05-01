import * as d3 from "d3";
import { TreeNode, TreeNodeData } from "../models";
import { D3Connecotr } from "../models/d3-connector.model";

export class D3Helper {

  private static getChildren(parentId: string, data: TreeNodeData[]): TreeNode[] {
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

  static async renderTreeView(data: TreeNodeData[], connector: D3Connecotr) {

    const treeData: TreeNode = {
      "name": data[0].name,
      "description": data[0].description,
      "children": D3Helper.getChildren(data[0].name, data)
    };

    const svg = d3.select("#tree-container")
      .append("svg")
      .attr("width", "60vw")
      .attr("height", "80vh")
      .append("g")
      .attr("transform", "translate(50,450)");

    const treeLayout = d3.tree<TreeNode>().nodeSize([150, 200]);

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
      .attr("transform", (d: any) => `translate(${d.y - 40},${d.x - 40})`);

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

    //bind events here using connector
    d3.selectAll("g.node").on("click", (event) => connector.click(event.target["__data__"].data));
  }
}



