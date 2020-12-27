import {DEFAULT_STYLES} from '../constants';
import {storage} from '../core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
  headerText: 'Новая таблица',
};

const initialState = storage('excel-state') ? storage('excel-state') : defaultState;

export {initialState};
