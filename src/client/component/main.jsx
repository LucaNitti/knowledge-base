import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

import ArticlePreview from './ArticlePreview';

export default class Main extends Component {
    state = {
        documents: [],
    };

    componentDidMount() {
        axios.get('/api/get').then(res => {
            //todo handle error
            this.setState({ documents: res.data.documents });
        });
    }

    render() {
        const { documents } = this.state;

        return (
            <>
                {documents.map(x => (
                    <ArticlePreview article={x} key={x._id} />
                ))}
            </>
        );
    }
}
