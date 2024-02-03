import Component from "./core/Component.js";
import Input from "./components/Input.js";
import Items from "./components/Items.js";
import Filter from "./components/Filter.js";
import { setA, setB, setIsFilter, setItems, store } from "./store.js";
import Calculator from "./components/Calculator.js";

export default class App extends Component {
  template() {
    return `
      <div data-component="input"></div>
      <div data-component="items"></div>
      <div data-component="filter"></div>
      <div data-component="calculator"></div>
    `;
  }

  mounted() {
    const {
      addItem,
      deleteItem,
      toggleItem,
      filterItem,
      filteredItems,
      handleChangeInputA,
      handleChangeInputB,
    } = this;
    const { a, b } = store.getState();

    const $input = this.$target.querySelector('[data-component="input"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $filter = this.$target.querySelector('[data-component="filter"]');
    const $calculator = this.$target.querySelector(
      '[data-component="calculator"]'
    );

    new Input($input, {
      addItem: addItem.bind(this),
    });
    new Items($items, {
      items: filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new Filter($filter, {
      filterItem: filterItem.bind(this),
    });
    new Calculator($calculator, {
      handleChangeInputA: handleChangeInputA.bind(this),
      handleChangeInputB: handleChangeInputB.bind(this),
      a,
      b,
    });
  }

  get filteredItems() {
    const { isFilter, items } = store.getState();
    const newItems = items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
    return newItems;
  }

  addItem(contents) {
    const items = [...store.getState().items];
    const id = Math.max(0, ...items.map(({ id }) => id)) + 1;
    const active = false;
    store.dispatch(setItems([...items, { id, contents, active }]));
  }

  deleteItem(id) {
    const items = [...store.getState().items];
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
    store.dispatch(setItems(items));
  }

  toggleItem(id) {
    const items = [...store.getState().items];
    const index = items.findIndex((item) => item.id === id);
    items[index].active = !items[index].active;
    store.dispatch(setItems(items));
  }

  filterItem(isFilter) {
    store.dispatch(setIsFilter(isFilter));
  }

  handleChangeInputA(value) {
    store.dispatch(setA(value));
  }
  handleChangeInputB(value) {
    store.dispatch(setB(value));
  }
}
