import { D3Helper } from "../../helpers/d3-helper";
import { GraphData, TreeNode } from "../../models";
import { DetailsComponent } from "../../views/details/details.component";
import { config } from '../../config/configuration'

export class Visualiser {
  private data: TreeNode[] = [];

  private async load(): Promise<void> {
    const response = await fetch(config.API_URL);
    const responseData: GraphData = await response.json();
    this.data = responseData.data;
  }

  private async render(): Promise<void> {
    await D3Helper.renderTreeView(this.data, { click: DetailsComponent.connector })
  }

  async init(): Promise<void> {
    await this.load();
    await this.render();
  }
}