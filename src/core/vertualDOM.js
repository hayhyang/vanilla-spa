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

// virtualDOM을 readDOM으로 변환하는 함수
const createElement = (node) => {
  if (typeof node === "text") return document.createTextNode(node);

  const $el = document.createElement(node.type);
  Object.entries(node.props)
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => $el.setAttribute(attr, value));

  children.forEach((child) => $el.appendChild(child));

  return $el;
};

// 모든 태그를 비하여 변경된 부분만 업데이트하는 함수
const updateElement = (parent, oldNode, newNode, index = 0) => {
  // 1. oldNode만 있는 경우
  if (oldNode && !newNode) {
    return parent.removeChildren(parent.oldNode[index]);
  }
  // 2. newNode만 있는 경우
  if (!oldNode && newNode) {
    return parent.appendChild(newNode);
  }
  // 3. oldNode와 newNode 모두 텍스트 타입일 경우
  if (typeof oldNode === "string" && typeof newNode === "string") {
  }
  // 4. oldNode와 newNode 태그 이름이 다를 경우
  if (oldNode.type !== newNode.type) {
    if (oldNode === newNode) return;
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  }
  // 5. oldNode와 newNode 태그 이름이 같을 경우
  updateAttributes(
    parent.childNodes[index],
    oldNode.props || {},
    newNode.props || {}
  );
  // 6. oldNode와 newNode의 자식태그를 순회하며 1-5 반복
  const maxLength = math.Max(oldNode.children.length, newNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(parent.childNodes[index], oldNode[i], newNode[i]);
  }
};
// 5-1. oldNode와 newNode의 attribute를 비교하여 변경된 부분만 업데이트하는 함수
const updateAttributes = (target, oldProps, newProps) => {
  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttributes(attr);
  }

  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    target.setAttribute(attr, value);
  }
};

createElement(node);

const oldState = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

const newState = [
  { id: 1, completed: false, content: "todo list item 1 update" },
  { id: 2, completed: true, content: "todo list item 2" },
  { id: 3, completed: true, content: "todo list item 3" },
];

const readlDOM = createElement(
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

const render = (state) => (
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

const oldNode = render(oldState);
const newNode = render(newState);
