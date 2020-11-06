import ExcelComponent from '../../core/ExcelComponent';

class Formula extends ExcelComponent {
  static className = ['excel__formula', 'formula'];

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  getHtmlTemplate() {
    return (
      `<div class="formula__info">fx</div>
       <div class="formula__input" contenteditable spellcheck="false"></div>`
    );
  }

  onInput() {
    console.log(111);
  }

  removeD() {
    this._$root._$el.removeEventListener('input', this.onInput);
  }
}

export default Formula;
