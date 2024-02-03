import Component from "../core/Component.js";
import { store } from "../store.js";

export default class Calculator extends Component {
  template() {
    const { a, b } = this.props;
    return `
      <input id="inputA" type="number" value=${a} />
      <input id="inputB" type="number" value=${b} />
      <div>a+b = ${a + b}</div>
    `;
  }

  setEvent() {
    const { handleChangeInputA, handleChangeInputB } = this.props;
    this.addEvent("change", "#inputA", ({ target }) => {
      handleChangeInputA(Number(target.value));
    });
    this.addEvent("change", "#inputB", ({ target }) => {
      handleChangeInputB(Number(target.value));
    });
  }
}
