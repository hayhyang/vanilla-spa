// vertualDOM: DOM의 형태를 본딴 객체
const vertualDOM = (type, props, ...children) => {
  return { type, props, children: children.flat() };
};

const node = vertualDOM(
  "div",
  { id: "app" },
  vertualDOM(
    "ul",
    null,
    vertualDOM(
      "li",
      null,
      vertualDOM("input", { type: "checkbox", class: "toggle" }),
      "todo list item 1",
      vertualDOM("button", { class: "remove" }, "삭제")
    ),

    vertualDOM(
      "li",
      null,
      vertualDOM("input", { type: "checkbox", class: "toggle" }),
      "todo list item 2",
      vertualDOM("button", { class: "remove" }, "삭제")
    )
  ),
  vertualDOM(
    "form",
    null,
    vertualDOM("input", { type: "text" }),
    vertualDOM("button", { type: "submit" }, "추가")
  )
);

const createElement = (node) => {};

createElement(node);

const state = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

createElement(
  <div id="app">
    <ul>
      {state.map(({ completed, content }) => (
        <li class={completed ? "completed" : null}>
          <input type="checkbox" class="toggle" />
          {content}
          <button class="remove">삭제</button>
        </li>
      ))}
    </ul>
    <form>
      <input type="text" />
      <button type="submit">추가</button>
    </form>
  </div>
);
