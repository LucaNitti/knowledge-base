import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import { error } from 'react-notification-system-redux';
class Main extends Component {
    state = {
        documents: [],
        search: '',
    };

    componentDidMount() {
        axios
            .get('/api/get')
            .then(res => {
                this.setState({ documents: res.data.documents });
            })
            .catch(err => this.props.addError({ message: 'Unable to get list of Documents', level: 'error' }));
    }

    doSearch = () => {
        let { search } = this.state;
        let url = search.length ? `/api/searsch/${search}` : '/api/get';
        axios
            .get(url)
            .then(res => {
                this.setState({ documents: res.data.documents });
            })
            .catch(err => this.props.addError({ message: 'Error on search', level: 'error' }));
    };

    handleSearch = event => {
        this.setState({ search: event.target.value }, this.doSearch);
    };
    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = nextProps.errors != this.props.errors;
        shouldUpdate = shouldUpdate || JSON.stringify(nextState) != JSON.stringify(this.state);
        return shouldUpdate;
    }

    render() {
        const { documents, search } = this.state;
        let searchClass = 'form-control';
        if (search.length != 0) searchClass += ' open';
        return (
            <>
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

function mapDispatchToProps(dispatch) {
    return {
        addError: err => dispatch(error(err)),
    };
}

const mapStateToProps = state => {
    return { errors: state.errors };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main);
