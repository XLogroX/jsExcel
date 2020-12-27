import ExcelComponent from '../../core/ExcelComponent';
import {createHeaderTemplate} from './header.template';
import * as actions from '../../redux/actions';

class Header extends ExcelComponent {
  static className = ['excel__header', 'header'];

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input'],
      subscribe: ['headerText'],
    });
  }

  getHtmlTemplate() {
    return createHeaderTemplate(this._store.getState());
  }

  onInput(evt) {
    this.$dispatch(actions.changeName(evt.target.value));
  }
}

export default Header;
