// ../../../../../../../../../private/var/folders/8x/z26qdb3x465gmtqr6z4x8hgm0000gn/T/seed-blog-P7r5uV/app.ts
var page = document;
function createElement(tag) {
  const made = page.createElement(tag, { form: "none" });
  return { handle: made };
}
function createText(value) {
  const made = page.createTextNode(value);
  return { handle: made };
}
function listen(node, event2, handler) {
  const made = node.handle;
  const listener = handler;
  made.addEventListener(event2, listener, { form: "none" });
}
function append(parent, child) {
  const made = parent.handle;
  made.appendChild(child.handle);
}
function getValue(node) {
  return node.handle.value;
}
function setValue(node, value) {
  node.handle.value = value;
}
function event(node, name, handler) {
  listen(node, name, handler);
}
function mount(host, build) {
  append(host, build());
}
function makeApp(host) {
  const titleInput = createElement("input");
  const bodyInput = createElement("textarea");
  const posts = createElement("div");
  const addButton = createElement("button");
  append(addButton, createText("Add post"));
  event(addButton, "click", () => {
    const titleText = getValue(titleInput);
    const bodyText = getValue(bodyInput);
    const post = createElement("div");
    const heading = createElement("h2");
    append(heading, createText(titleText));
    append(post, heading);
    const para = createElement("p");
    append(para, createText(bodyText));
    append(post, para);
    append(posts, post);
    setValue(titleInput, "");
    setValue(bodyInput, "");
  });
  const root = createElement("div");
  append(root, titleInput);
  append(root, bodyInput);
  append(root, addButton);
  append(root, posts);
  mount(host, () => root);
}

// ../../../../../../../../../private/var/folders/8x/z26qdb3x465gmtqr6z4x8hgm0000gn/T/seed-blog-P7r5uV/entry.ts
makeApp({ handle: document.body });
