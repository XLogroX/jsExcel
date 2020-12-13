const CODES = {
  A: 65,
  Z: 90,
};

const createCol = function(colName, index) {
  return (
    `<div class="table__column" data-type="resizable" data-col="${index}">
    ${colName}
    <div class="table__col-resize" data-resize='col'></div>
    </div>`
  );
};

const createCell = function(row) {
  return function(_, col) {
    return (
      `<div class="table__cell" contenteditable data-type="cell" data-col="${col}" data-id="${row}:${col}"></div>`
    );
  };
};

const createRow = function(index, content) {
  const resizer = index ? (`<div class="table__row-resize"
   data-resize='row'></div>`) : ``;
  return (
    `<div class="table__row" data-type="resizable">
      <div class="table__row-info">
      ${index ? index : ''}
      ${resizer}
      </div>
      <div class="table__data">${content}</div>
    </div>`
  );
};

const toChar = function(_, index) {
  return String.fromCharCode(CODES.A + index);
};

const createTable = function(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill()
      .map(toChar)
      .map(createCol)
      .join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill()
        .map(toChar)
        .map(createCell(i))
        .join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};

export {createTable};
