// ../../../../../../../../../private/var/folders/8x/z26qdb3x465gmtqr6z4x8hgm0000gn/T/seed-web-s7Atrc/dom.ts
var createElement = (tag) => document.createElement(tag);
var createTextNode = (value) => document.createTextNode(value);

// ../../../../../../../../../private/var/folders/8x/z26qdb3x465gmtqr6z4x8hgm0000gn/T/seed-web-s7Atrc/app.ts
function listIsEmpty(self) {
  return self.length == 0;
}
function listPush(self, item) {
  return self.push(item);
}
function listPop(self) {
  return self.pop();
}
function listGet(self, index) {
  return self.at(index);
}
function createElement2(tag) {
  return { handle: createElement(tag) };
}
function createText(value) {
  return { handle: createTextNode(value) };
}
function setText(node, value) {
  node.handle.textContent = value;
}
function listen(node, event2, handler) {
  node.handle.addEventListener(event2, handler);
}
function append(parent, child) {
  parent.handle.appendChild(child.handle);
}
var running = [];
function makeSignal(value) {
  return { value, observers: [] };
}
function readSignal(self) {
  track(self);
  return self.value;
}
function writeSignal(self, value) {
  self.value = value;
  const subscribers = self.observers;
  self.observers = [];
  for (const observer of subscribers) {
    runEffect(observer);
  }
}
function makeEffect(run) {
  const own = { run };
  runEffect(own);
  return own;
}
function runEffect(effect) {
  listPush(running, effect);
  effect.run();
  listPop(running);
}
function track(signal) {
  if (listIsEmpty(running)) {
    const skip = 0;
  } else {
    const index = running.length - 1;
    const current = listGet(running, index);
    listPush(signal.observers, current);
  }
}
function event(node, name, handler) {
  listen(node, name, handler);
}
function dynamic(source) {
  const host = createText("");
  makeEffect(() => {
    setText(host, source());
  });
  return host;
}
function mount(host, build) {
  append(host, build());
}
function mountApp(host) {
  const label = makeSignal("ready");
  const root = createElement2("div");
  const button = createElement2("button");
  event(button, "click", () => {
    writeSignal(label, "clicked");
  });
  append(button, createText("click me"));
  append(root, button);
  append(root, dynamic(() => readSignal(label)));
  mount(host, () => root);
}

// ../../../../../../../../../private/var/folders/8x/z26qdb3x465gmtqr6z4x8hgm0000gn/T/seed-web-s7Atrc/entry.ts
mountApp({ handle: document.body });
