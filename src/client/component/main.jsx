import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import ArticlePreview from './ArticlePreview';
import NotificationSystem from 'react-notification-system';

export default class Main extends Component {
    state = {
        documents: [],
        search: '',
    };
    notificationSystem = React.createRef();

    componentDidMount() {
        axios
            .get('/api/get')
            .then(res => {
                this.setState({ documents: res.data.documents });
            })
            .catch(err => this.showError('Unable to get list of Documents'));
    }

    showError = error => {
        const notification = this.notificationSystem.current;
        notification.addNotification({
            message: error,
            level: 'error',
        });
    };

    doSearch = () => {
        let { search } = this.state;
        let url = search.length ? `/api/search/${search}` : '/api/get';
        axios
            .get(url)
            .then(res => {
                console.log(res.data.documents);
                this.setState({ documents: res.data.documents });
            })
            .catch(err => {
                this.showError('Search error.');
            });
    };

    handleSearch = event => {
        this.setState({ search: event.target.value }, this.doSearch);
    };

    render() {
        const { documents, search } = this.state;
        let searchClass = 'form-control';
        if (search.length != 0) searchClass += ' open';
        return (
            <>
                <NotificationSystem ref={this.notificationSystem} />
                <div className="row">
                    <div className="col">
                        <div className="input-group search">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                            <input type="text" className={searchClass} onChange={this.handleSearch} />
                        </div>
                    </div>
                </div>
                {documents.map(x => (
                    <ArticlePreview article={x} key={x._id} />
                ))}
            </>
        );
    }
}
