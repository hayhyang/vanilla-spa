import Component from "./core/Component.js";
import Input from "./components/Input.js";
import Items from "./components/Items.js";
import Filter from "./components/Filter.js";
import { setA, setB, setIsFilter, setItems, store } from "./store.js";

export default class App extends Component {
  template() {
    const { a, b } = store.getState();
    return `
      <div data-component="input"></div>
      <div data-component="items"></div>
      <div data-component="filter"></div>

      <input id="inputA" type="number" value=${a} />
      <input id="inputB" type="number" value=${b} />
      <div>a+b = ${a + b}</div>
    `;
  }

  setEvent() {
    this.addEvent("change", "#inputA", ({ target }) => {
      store.dispatch(setA(Number(target.value)));
    });
    this.addEvent("change", "#inputB", ({ target }) => {
      store.dispatch(setB(Number(target.value)));
    });
  }

  mounted() {
    const { addItem, deleteItem, toggleItem, filterItem, filteredItems } = this;

    const $input = this.$target.querySelector('[data-component="input"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $filter = this.$target.querySelector('[data-component="filter"]');

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
}
