import { D3Helper } from "../../helpers/d3-helper";
import { GraphData, TreeNode } from "../../models";
import { detailsHandler } from "../details/details";
import { config } from '../../config/configuration'

export class Visualiser {

  data: TreeNode[] = [];

  async load() {
    const response = await fetch(config.API_URL);
    const responseData: GraphData = await response.json();
    this.data = responseData.data;
  }

  async render() {
    await D3Helper.renderTreeView(this.data, { click: detailsHandler.connector })
  }

  async init() {
    await this.load();
    await this.render();
  }
}