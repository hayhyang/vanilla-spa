import Component from "../core/Component.js";

export default class Items extends Component {
  template() {
    const { items } = this.props;

    return `
      <ul>
        ${items
          .map(
            ({ id, contents, active }) => `
            <li data-id=${id}>
              ${contents}
              <button class="button--toggle">
              ${active ? "비활성" : "활성"}
              </button>
              <button class="button--delete">삭제</button>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }

  setEvent() {
    const { toggleItem, deleteItem } = this.props;
    this.addEvent("click", ".button--toggle", ({ target }) => {
      toggleItem(Number(target.closest("[data-id]").dataset.id));
    });

    this.addEvent("click", ".button--delete", ({ target }) => {
      deleteItem(Number(target.closest("[data-id]").dataset.id));
    });
  }
}
