import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class App extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState,
        });
    };
    save = () => {
        let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        console.log(content);
        fetch('/api/save', {
            method: 'put',
            body: content,
        }).then(function(response) {
            console.log(response);
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
