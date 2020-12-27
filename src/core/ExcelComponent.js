import DomListener from './DomListener';

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this._name = options.name || null;
    this._emitter = options.emitter;
    this._store = options.store;
    this._unsubscribers = [];
    this._subscribe = options.subscribe || [];

    this.prepare();
  }

  prepare() {}

  getHtmlTemplate() {
    return '';
  }

  $emit(event, ...args) {
    this._emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsab = this._emitter.subscribe(event, fn);
    this._unsubscribers.push(unsab);
  }

  $dispatch(action) {
    this._store.dispatch(action);
  }

  storeChanged(changes) {

  }

  isWatching(key) {
    return this._subscribe.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this._unsubscribers.forEach((unsab) => {
      unsab();
    });
  }
}

export default ExcelComponent;
