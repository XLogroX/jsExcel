class TableSelection {
  static className = 'table__cell--selected';

  constructor() {
    this.group = [];
    this._currentCell = null;
  }

  select($el) {
    this._clear();
    this.group.push($el);
    this._currentCell = $el;
    $el.addClass(TableSelection.className);
    $el.focus();
  }

  selectGroup(cells) {
    this._clear();
    cells.forEach(($cell) => {
      this.group.push($cell);
      $cell.addClass(TableSelection.className);
    });
  }

  _clear() {
    if (this.group.length !== 0) {
      this.group.forEach((cell) => {
        cell.removeClass(TableSelection.className);
      });
    }

    this.group = [];
  }
}

export default TableSelection;
