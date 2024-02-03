import Component from "../core/Component.js";

export default class Filter extends Component {
  template() {
    return `
      <button class="button--filter" data-is-filter="1">전체 보기</button>
      <button class="button--filter" data-is-filter="2">활성 보기</button>
      <button class="button--filter" data-is-filter="3">비활성 보기</button>
    `;
  }

  setEvent() {
    const { filterItem } = this.props;

    this.addEvent("click", ".button--filter", ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}
