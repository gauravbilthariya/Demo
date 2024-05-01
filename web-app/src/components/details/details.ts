import { TreeNode } from "../../models";

class DetailsComponent {

  detailsContainer: HTMLDivElement;

  constructor() {
    this.detailsContainer = document.querySelector("#details-container") as HTMLDivElement;
  }

  private showDetails(data: TreeNode): void {
    const detailBoxHtml = ` <div class="modal">
                              <div class="modal-content">
                              <div class="close">x</div>
                              <div class="name">${data.name}</div>
                              <div class="desc">${data.description}</div>
                              </div>
                            </div>`;
    this.detailsContainer.innerHTML = detailBoxHtml;
    document.querySelector(".close")?.addEventListener("click", () => this.detailsContainer.innerHTML = "");
  }

  connector = (data: TreeNode) => {
    this.showDetails(data);
  }
}

export const detailsHandler = new DetailsComponent();

