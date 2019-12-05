import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import { fetchDocumentsAction } from '../redux/middleware/index';
class Main extends Component {
    state = {
        search: '',
    };

    componentDidMount() {
        this.props.fetchDocuments({});
    }

    doSearch = () => {
        let { search } = this.state;
        this.props.fetchDocuments({ search });
    };

    handleSearch = event => {
        this.setState({ search: event.target.value }, this.doSearch);
    };
    shouldComponentUpdate(nextProps) {
        let shouldUpdate = shouldUpdate || JSON.stringify(nextProps.documents) != JSON.stringify(this.props.documents);
        return shouldUpdate;
    }

    render() {
        const { search } = this.state;
        const { documents } = this.props;
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
                <hr />
                {(documents || []).map(x => (
                    <ArticlePreview article={x} key={x._id} />
                ))}
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDocuments: parameter => dispatch(fetchDocumentsAction(parameter)),
    };
};

const mapStateToProps = state => {
    return { documents: state.documentsReducer.documents };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
