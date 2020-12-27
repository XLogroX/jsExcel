import {ACTION_TYPE} from './types';

const tableResize = (data) => {
  return {
    type: ACTION_TYPE.TABLE_RESIZE,
    data,
  };
};

const changeText = (data) => {
  return {
    type: ACTION_TYPE.CHANGE_TEXT,
    data,
  };
};

const changeStyles = (data) => {
  return {
    type: ACTION_TYPE.CHANGE_STYLES,
    data,
  };
};

const applyStyle = (data) => {
  return {
    type: ACTION_TYPE.APPLY_STYLE,
    data,
  };
};

const changeName = (data) => {
  return {
    type: ACTION_TYPE.HEADER_TEXT,
    data,
  };
};


export {tableResize, changeText, changeStyles, applyStyle, changeName};
