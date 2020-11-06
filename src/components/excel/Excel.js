import $ from '../../core/dom';

class Excel {
  constructor(container, options) {
    this._$el = $(container);
    this._components = options.components || [];
    this._createdComponents = null;
  }

  getRoot() {
    const $root = $.create('div', ['excel']);

    this._createdComponents = this._components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      // if (component._name) {
      //   window[component._name] = component;
      // }
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
}

export default Excel;
