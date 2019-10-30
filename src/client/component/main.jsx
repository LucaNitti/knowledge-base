import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Main extends Component {
    state = {
        documents: [],
    };

    componentDidMount() {
        axios.get('/api/getAll').then(res => {
            //todo handle error
            this.setState({ documents: res.data.documents });
        });
    }

    render() {
        const { documents } = this.state;

        return (
            <ul>
                {documents.map(x => (
                    <Link key={x._id} to={`/document/${x._id}`}>
                        {x.title}
                    </Link>
                ))}
            </ul>
        );
    }
}
