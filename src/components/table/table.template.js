const CODES = {
  A: 65,
  Z: 90,
};

const createCol = function(colName) {
  return (
    `<div class="table__column">${colName}</div>`
  );
};

const createCell = function() {
  return (
    `<div class="table__cell" contenteditable></div>`
  );
};

const createRow = function(index, content) {
  return (
    `<div class="table__row">
      <div class="table__row-info">${index ? index : ''}</div>
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

  const cells = new Array(colsCount)
      .fill()
      .map(createCell)
      .join('');


  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
};

export {createTable};
{/* <div class="table__row">
      <div class="table__row-info">

      </div>
      <div class="table__data">
        <div class="table__column">A</div>
        <div class="table__column">B</div>
        <div class="table__column">C</div>
      </div>
    </div>

    <div class="table__row">
      <div class="table__row-info">
        1
      </div>
      <div class="table__data">
        <div class="table__cell table__cell--selected">1</div>
        <div class="table__cell">2</div>
        <div class="table__cell">3</div>
      </div>
    </div> */}
