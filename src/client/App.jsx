import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './component/main';
import Document from './component/document';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
class App extends Component {
    state = {
        documents: [],
    };

    componentDidUpdate() {
        let errors = this.state.errors;

        console.log('componentDidUpdate', errors);
    }

    render() {
        return (
            <>
                <Notifications notifications={this.props.notifications} />
                <Router>
                    <div className="document container">
                        <Link to="/">
                            <h1 className="text-center">Knowledge base</h1>{' '}
                        </Link>

                        <Link replace={true} to="/new" className="addArticle">
                            <i className="fas fa-plus fa-5x"></i>
                        </Link>
                        <Switch>
                            <Route key="new-document" path="/new" component={Document} />
                            <Route key="edit-document" path="/document/:id" component={Document} />
                            <Route path="/" component={Main} />
                        </Switch>
                    </div>
                </Router>
            </>
        );
    }
}

const mapStateToProps = state => {
    return { notifications: state.notifications };
};

export default connect(
    mapStateToProps,
    null,
)(App);
