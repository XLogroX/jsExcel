import ExcelComponent from '../../core/ExcelComponent';

class Header extends ExcelComponent {
  static className = ['excel__header', 'header'];

  getHtmlTemplate() {
    return (
      `<input class="header__input" type="text" value="Новая таблица">

        <div>
          <button type="button" class="header__button">
            <i class="material-icons">delete</i>
          </button>

          <button type="button" class="header__button">
            <i class="material-icons">exit_to_app</i>
          </button>
      </div>`
    );
  }
}

export default Header;
