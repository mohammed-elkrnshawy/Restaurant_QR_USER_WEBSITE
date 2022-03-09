import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { Nav } from './Components/Nav';
import Routes from './Routes';
import i18n from './translation/i18n';
import 'antd/dist/antd.css';
// import './css/dist/css/bootstrap.css';
// import './css/select2.css';
// import './css/App.css';
const App = () => {
  useEffect(() => {
    document.body.dir = i18n.dir();
    const style = document.getElementsByClassName('style-direction');
    if (i18n.language.includes('ar')) {
      style[0].href = '/css/AppRTL.css';
      style[1].href = '/css/bootstrapRTL.css';
      style[2].href = '/css/select2RTL.css';
      style[3].href = '/css/styleRTL.css';
    } else {
      style[0].href = '/css/App.css';
      style[1].href = '/css/bootstrap.css';
      style[2].href = '/css/select2.css';
      style[3].href = '/css/style.css';
    }
    // localStorage.getItem('i18nextLng') &&
    // localStorage.getItem('i18nextLng').search('en') > -1
    //   ? changeLang('en')
    //   : changeLang('en');
  }, []);

  return <Routes />;
};

export default App;
