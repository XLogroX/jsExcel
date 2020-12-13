const capitalize = function(string) {
  if (!string || typeof string !== 'string') {
    return '';
  }

  return string[0].toUpperCase() + string.slice(1);
};

const range = (start, end) => {
  const min = Math.min(start, end);
  const range = new Array(Math.abs(start - end) + 1).fill();
  return range.map((num, i) => {
    return min + i;
  });
};

export {capitalize, range};
