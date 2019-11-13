import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style/global';
import { Provider } from 'react-redux';
import store from './redux/store/index';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
