import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import 'element-theme-default';

import App from './App';
import registerServiceWorker from './registerServiceWorker';



import { HashRouter } from 'react-router-dom'
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

i18n.use(locale);

ReactDOM.render((
<HashRouter >
	<App />
</HashRouter>
), document.getElementById('root'));


registerServiceWorker();
