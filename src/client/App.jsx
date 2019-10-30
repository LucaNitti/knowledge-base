import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

export default class App extends Component {
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
            <div className="document container">
                <h1>Knowledge base</h1>
                <ul>
                    {documents.map(x => (
                        <li href="#" key={x._id}>
                            {x.title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
