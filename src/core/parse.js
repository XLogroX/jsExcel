const parse = (value = '') => {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1)) || '';
    } catch {
      return eval(value.slice(1, value.length - 1));
    }
  }
  return value;
};

export {parse};
