import {DEFAULT_STYLES} from '../../constants';
import {parse} from '../../core/parse';
import {toInlineStyles} from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const createCol = function({col, index, width}) {
  return (
    `<div class="table__column" data-type="resizable" data-col="${index}" style="width: ${width}">
    ${col}
    <div class="table__col-resize" data-resize='col'></div>
    </div>`
  );
};

const createCell = function(row, colState, dataState, stylesState) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const text = getText(dataState, col, row);
    const width = getWidth(colState, col);
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...stylesState[id],
    });
    return (
      `<div class="table__cell" contenteditable data-type="cell" data-value="${text}" data-col="${col}" data-id="${row}:${col}" style="${styles}; width: ${width}">${parse(text)}</div>`
    );
  };
};

const createRow = function(index, content, rowState) {
  const height = getHeight(rowState, index);
  const resizer = index ? (`<div class="table__row-resize"
   data-resize='row'></div>`) : ``;
  return (
    `<div class="table__row" data-type="resizable" data-row="${index}" style="height: ${height}">
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

const getWidth = (colState, index) => {
  return (colState[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (rowState, index) => {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px';
};

const getText = (dataState, col, row) => {
  return dataState[`${row}:${col}`] ? dataState[`${row}:${col}`] : '';
};

const withWidthFrom = (state) => {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
};

const createTable = function(rowsCount = 15, state) {
  const {colState, rowState, dataState, stylesState} = state;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill()
      .map(toChar)
      .map(withWidthFrom(colState))
      .map(createCol)
      .join('');

  rows.push(createRow(null, cols, {}));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill()
        .map(toChar)
        .map(createCell(i, colState, dataState, stylesState))
        .join('');

    rows.push(createRow(i + 1, cells, rowState));
  }

  return rows.join('');
};

export {createTable};
