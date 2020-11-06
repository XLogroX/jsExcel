import {capitalize} from './utils';

const getMethodName = function(eventName) {
  return `on${capitalize(eventName)}`;
};

class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this._$root = $root;
    this._listeners = listeners;
  }

  initDOMListeners() {
    this._listeners.forEach((listener) =>{
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}`);
      }
      this[method] = this[method].bind(this);
      this._$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this._listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}`);
      }
      this._$root.off(listener, this[method]);
    });
  }
}


export default DomListener;
