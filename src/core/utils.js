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

const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
};

const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
};

const camelToDashCase = (str) => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

const toInlineStyles = (styles = {}) => {
  return Object.keys(styles).map((key) => {
    return `${camelToDashCase(key)}: ${styles[key]}`;
  }).join(';');
};

const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export {capitalize, range, storage, isEqual, camelToDashCase, toInlineStyles, debounce};
