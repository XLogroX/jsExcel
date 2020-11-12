import ExcelComponent from '../../core/ExcelComponent';
import {shouldResize} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template';

class Table extends ExcelComponent {
  static className = ['excel__table', 'table'];

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  getHtmlTemplate() {
    return createTable();
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(evt, this._$root);
    }
  }
}

export default Table;
