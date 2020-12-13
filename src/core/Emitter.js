class Emitter {
  constructor() {
    this._listners = {};
  }

  emit(eventName, ...args) {
    if (!Array.isArray(this._listners[eventName])) {
      return false;
    }

    this._listners[eventName].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  subscribe(eventName, fn) {
    this._listners[eventName] = this._listners[eventName] || [];
    this._listners[eventName].push(fn);

    return () => {
      this._listners[eventName] = this._listners[eventName].filter((listener) => listener !== fn);
    };
  }
}

export default Emitter;
