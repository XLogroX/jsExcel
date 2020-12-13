import $ from '../../core/dom';
import Emitter from '../../core/Emitter';

class Excel {
  constructor(container, options) {
    this._$el = $(container);
    this._components = options.components || [];
    this._createdComponents = null;
    this._emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', ['excel']);

    const componentOptions = {
      emitter: this._emitter,
    };

    this._createdComponents = this._components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.getHtmlTemplate());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this._$el.append(this.getRoot());

    this._createdComponents.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this._components.forEach((component) => {
      component.destroy();
    });
  }
}

export default Excel;
