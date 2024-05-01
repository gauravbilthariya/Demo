import { TreeNode } from "../../models";
import DOMPurify from 'dompurify';

export class DetailsComponent {
  static detailsContainer = <HTMLDivElement>document.querySelector("#details-container");
  private static showDetails(data: TreeNode): void {
    const detailBoxHtml = ` <div class="card">
                              <div class="card-header">${data.name}</div>
                              <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <p class="card-text"> ${data.description}.</p>
                                <a href="#" class="close-card btn btn-primary">Close</a>
                              </div>
                            </div>`;
    this.detailsContainer.innerHTML = DOMPurify.sanitize(detailBoxHtml);
    document.querySelector(".close-card")?.addEventListener("click", () => this.detailsContainer.innerHTML = "");
  }

  static connector = (data: TreeNode) => {
    this.showDetails(data);
  }
}