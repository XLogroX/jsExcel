import {ACTION_TYPE} from './types';

const val = (state, field, action) => {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
};
const rootReducer = (state, action) => {
  let field;
  let value;
  switch (action.type) {
    case ACTION_TYPE.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: val(state, field, action)};
    case ACTION_TYPE.CHANGE_TEXT:
      field = 'dataState';
      return {...state, currentText: action.data.value, dataState: val(state, field, action)};
    case ACTION_TYPE.CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case ACTION_TYPE.APPLY_STYLE:
      field = 'stylesState';
      value = state[field] || {};
      action.data.ids.forEach((id) => {
        value[id] = {...value[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: value,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    case ACTION_TYPE.HEADER_TEXT:
      field = 'headerText';
      return {
        ...state,
        [field]: action.data,
      };
    default:
      return state;
  }
};

export {rootReducer};
