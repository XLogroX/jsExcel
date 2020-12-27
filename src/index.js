import Excel from './components/excel/excel';
import Formula from './components/formula/Formula';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import {createStore} from './core/createStore';
import {debounce, storage} from './core/utils';
import {initialState} from './redux/initialState';
import {rootReducer} from './redux/rootReducer';


import './scss/index.scss';

const store = createStore(rootReducer, initialState);

const writeStorage = (state) => {
  storage('excel-state', state);
};

store.subscribe(debounce(writeStorage, 300));

const container = document.querySelector('#app');

const excel = new Excel(container, {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
