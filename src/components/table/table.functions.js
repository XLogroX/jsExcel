import {range} from '../../core/utils';

const shouldResize = (event) => {
  return event.target.dataset.resize;
};

const isCell = (evt) => {
  return evt.target.dataset.type === 'cell';
};

const matrix = ($target, $current) => {
  const target = $target.id(true);
  const current = $current.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((accum, col) => {
    rows.forEach((row) => {
      accum.push(`${row}:${col}`);
    });
    return accum;
  }, []);
};

const getNextSelector = (key, {col, row}) => {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? col : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? row : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
};

export {shouldResize, isCell, matrix, getNextSelector};
