import Excel from './components/excel/excel';
import Formula from './components/formula/Formula';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import './scss/index.scss';

const container = document.querySelector('#app');

const excel = new Excel(container, {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
