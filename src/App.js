import Component from "./core/Component.js";
import Input from "./components/Input.js";
import Items from "./components/Items.js";
import Filter from "./components/Filter.js";

export default class App extends Component {
  setup() {
    this.state = {
      isFilter: 0,
      items: [
        {
          id: 1,
          contents: "item1",
          active: false,
        },
        {
          id: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  template() {
    return `
      <div data-component="input"></div>
      <div data-component="items"></div>
      <div data-component="filter"></div>
    `;
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
    const { isFilter, items } = this.state;
    const newItems = items.filter(
      ({ active }) =>
        (isFilter === 1 && !active) ||
        (isFilter === 2 && active) ||
        isFilter === 0
    );
    return newItems;
  }

  addItem(contents) {
    const items = [...this.state.items];
    const id = Math.max(0, ...items.map(({ id }) => id)) + 1;
    const active = false;
    this.setState({
      items: [...items, { id, contents, active }],
    });
  }

  deleteItem(id) {
    const items = [...this.state.items];
    const index = items.findIndex((item) => item.id === id);
    items.splice(index, 1);
    this.setState({ items });
  }

  toggleItem(id) {
    const items = [...this.state.items];
    const index = items.findIndex((item) => item.id === id);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
