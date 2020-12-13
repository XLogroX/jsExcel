import $ from '../../core/dom';
import ExcelComponent from '../../core/ExcelComponent';

class Formula extends ExcelComponent {
  static className = ['excel__formula', 'formula'];

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  getHtmlTemplate() {
    return (
      `<div class="formula__info">fx</div>
       <div class="formula__input" contenteditable spellcheck="false" data-type="formula-field"></div>`
    );
  }

  init() {
    super.init();

    this._$formula = this._$root.find('[data-type="formula-field"]');

    this.$on('table:select', (cell) => {
      this._$formula.text(cell.text());
    });

    this.$on('table:input', ($cell) => {
      this._$formula.text($cell.text());
    });
  }

  onInput(evt) {
    this.$emit('formula:input', $(evt.target).text());
  }

  onKeydown(evt) {
    if (evt.key === 'Enter' || evt.key === 'Tab') {
      evt.preventDefault();
      this.$emit('formula:enterPress');
    }
  }
}

export default Formula;
