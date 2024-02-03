let currentObserver = null;

const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  });
  return obj;
};

const calcAdd = () => {
  console.log(`a + b = ${state.a + state.b}`);
};

const calcSquare = () => {
  console.log(`a * b = ${state.a * state.b}`);
};

const state = observable({
  a: 10,
  b: 20,
});

observe(calcAdd);
state.a = 1;
observe(calcSquare);
