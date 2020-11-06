import ExcelComponent from '../../core/ExcelComponent';

class Toolbar extends ExcelComponent {
  static className = ['excel__toolbar', 'toolbar'];

  getHtmlTemplate() {
    return (
      `<button type="button" class="toolbar__button">
      <i class="material-icons">format_align_left</i>
    </button>

    <button type="button" class="toolbar__button">
      <i class="material-icons">format_align_center</i>
    </button>

    <button type="button" class="toolbar__button">
      <i class="material-icons">format_align_right</i>
    </button>

    <button type="button" class="toolbar__button">
      <i class="material-icons">format_bold</i>
    </button>

    <button type="button" class="toolbar__button">
      <i class="material-icons">format_italic</i>
    </button>
    
    <button type="button" class="toolbar__button">
      <i class="material-icons">format_underlined</i>
    </button>`
    );
  }
}

export default Toolbar;
