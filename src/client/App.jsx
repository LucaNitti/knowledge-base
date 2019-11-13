import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './component/main';
import Document from './component/document';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
class App extends Component {
    state = {
        documents: [],
    };
    notificationSystem = React.createRef();

    componentDidUpdate() {
        console.log('componentDidUpdate');
        let errors = this.state.errors;
        const notification = this.notificationSystem.current;
        for (let error in errors) {
            notification.addNotification(error);
        }
    }

    render() {
        return (
            <>
                <NotificationSystem ref={this.notificationSystem} />
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
    return { errors: state.errors };
};

export default connect(
    mapStateToProps,
    null,
)(App);
