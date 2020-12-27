import {DEFAULT_STYLES} from '../../constants';
import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';
import {parse} from '../../core/parse';
import * as actions from '../../redux/actions';
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
    return createTable(15, this._store.getState());
  }

  init() {
    super.init();
    const selectedCell = this._$root.find('[data-id="0:0"]');
    this.selectCell(selectedCell);

    this.$on('formula:input', (value) => {
      this._selection._currentCell
          .attr('data-value', value)
          .text(parse(value));

      this.updateTextInStore(value);
    });

    this.$on('formula:enterPress', () => {
      this._selection._currentCell.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this._selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this._selection.selectedIds,
      }));
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
    const styles = cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles(styles));
  }

  async _resizeTable(evt) {
    try {
      const data = await resizeHandler(evt, this._$root);
      this.$dispatch(actions.tableResize(data));
    } catch (err) {
      console.warn(err);
    }
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      this._resizeTable(evt);
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

  updateTextInStore(value) {
    const data = {
      id: this._selection._currentCell.id(),
      value,
    };
    this.$dispatch(actions.changeText(data));
  }

  onInput(evt) {
    // this.$emit('table:input', $(evt.target));
    const text = $(evt.target).text();
    this.updateTextInStore(text);
  }
}


export default Table;
