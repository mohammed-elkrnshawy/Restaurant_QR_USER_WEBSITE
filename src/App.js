import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Nav } from './Components/Nav';
import Routes from './Routes';
import i18n from './translation/i18n';
import 'antd/dist/antd.css';
import './css/dist/css/bootstrap.css';
import './css/select2.css';
import './css/App.css';
const App = () => {
  useEffect(() => {
    localStorage.getItem('i18nextLng') &&
    localStorage.getItem('i18nextLng').search('en') > -1
      ? changeLang('en')
      : changeLang('ar');
  }, []);
  function changeLang(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    document.body.dir = i18n.dir();
  }
  return <Routes />;
};

export default App;
