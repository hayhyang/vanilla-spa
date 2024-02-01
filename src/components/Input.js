import Component from "../core/Component.js";

export default class Input extends Component {
  template() {
    return `
      <input type="input" class="input" placeholder="아이템을 입력하세요" />
    `;
  }

  setEvent() {
    const { addItem } = this.props;

    this.addEvent("keydown", ".input", ({ key, target }) => {
      if (key !== "Enter") return;
      addItem(target.value);
    });
  }
}
