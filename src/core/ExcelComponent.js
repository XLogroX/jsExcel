import DomListener from './DomListener';

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this._name = options.name || null;
  }

  getHtmlTemplate() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}

export default ExcelComponent;
