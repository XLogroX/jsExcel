import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';
import {getNextSelector, isCell, matrix, shouldResize} from './table.functions';
import {resizeHandler} from './table.resize';
import {createTable} from './table.template';
import TableSelection from './TableSelection';

class Table extends ExcelComponent {
  static className = ['excel__table', 'table'];

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this._selection = new TableSelection();
  }

  getHtmlTemplate() {
    return createTable();
  }

  init() {
    super.init();
    const selectedCell = this._$root.find('[data-id="0:0"]');
    this.selectCell(selectedCell);

    this.$on('formula:input', (text) => {
      this._selection._currentCell.text(text);
    });

    this.$on('formula:enterPress', () => {
      this._selection._currentCell.focus();
    });
  }

  onClick(evt) {
    if (isCell(evt)) {
      const selectedCell = $(evt.target);

      if (evt.shiftKey) {
        const $cells = matrix(selectedCell, this._selection._currentCell).map((id) => {
          return this._$root.find(`[data-id="${id}"]`);
        });

        this._selection.selectGroup($cells);
        return;
      }

      this.selectCell(selectedCell);
    }
  }

  selectCell(cell) {
    this._selection.select(cell);
    this.$emit('table:select', cell);
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(evt, this._$root);
    }
  }

  onKeydown(evt) {
    const keys = new Set([
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]);

    const {key} = evt;

    if (keys.has(key) && !evt.shiftKey) {
      evt.preventDefault();
      const id = this._selection._currentCell.id(true);
      const $nextCell = this._$root.find(getNextSelector(key, id));
      this.selectCell($nextCell);
    }
  }

  onInput(evt) {
    this.$emit('table:input', $(evt.target));
  }
}


export default Table;
