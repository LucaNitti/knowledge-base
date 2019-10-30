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
        editorState: EditorState.createEmpty(),
    };

    componentDidMount() {
        axios.get('/api/getAll').then(res => {
            console.log(res);
        });
    }

    onEditorStateChange = editorState => {
        this.setState({
            editorState,
        });
    };

    save = () => {
        let id = this.state.id;
        let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        const data = { content, id };
        if (id) this.update(data);
        else this.create(data);
    };
    update = data => {
        axios.put('/api/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.err) {
                console.log('err ' + status, data.err);
                return;
            }
        });
    };

    create = data => {
        axios.post('/api/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.err) {
                console.log('err ' + status, data.err);
                return;
            }
            console.log(data);
            this.setState({ id: data.doc._id });
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Container>
                <h1>Knowledge base</h1>
                <div className="row d-flex justify-content-center">
                    <div className="col-8">
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-1">
                    <div className="btn btn-info" onClick={this.save}>
                        Salva
                    </div>
                </div>
            </Container>
        );
    }
}
