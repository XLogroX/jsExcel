import $ from '../../core/dom';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';

class Toolbar extends ExcelStateComponent {
  static className = ['excel__toolbar', 'toolbar'];

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      ...options,
      listeners: ['click'],
      subscribe: ['currentStyles'],
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  prepare() {
    this.initState(this._store.getState().currentStyles);
  }

  getHtmlTemplate() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(evt) {
    if (evt.target.closest('[data-type="button"]')) {
      const target = $(evt.target.closest('[data-type="button"]'));
      const value = JSON.parse(target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}

export default Toolbar;
