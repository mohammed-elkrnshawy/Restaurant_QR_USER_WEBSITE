import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Nav } from './Components/Nav';
import Routes from './Routes';
import i18n from './translation/i18n';
import 'antd/dist/antd.css';

const App = () => {
  useEffect(() => {
    i18n.changeLanguage('en');
    localStorage.setItem('lang', 'en');
    document.body.dir = i18n.dir();
  }, []);
  return <Routes />;
};

export default App;
