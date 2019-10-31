import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './component/main';
import Document from './component/document';

export default class App extends Component {
    state = {
        documents: [],
    };
    render() {
        return (
            <Router>
                <div className="document container">
                    <h1>Knowledge base</h1>

                    <Link replace={true} to="/new">
                        New
                    </Link>
                    <Link to="/">Main</Link>

                    <Switch>
                        <Route key="new-document" path="/new" component={Document} />
                        <Route key="edit-document" path="/document/:id" component={Document} />
                        <Route path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
