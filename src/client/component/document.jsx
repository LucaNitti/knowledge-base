import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

export default class Document extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        title: '',
    };

    componentDidMount() {
        console.log(this.props);
        console.log(this.props.match.params.id);
    }

    onEditorStateChange = editorState => {
        this.setState({
            editorState,
        });
    };

    save = () => {
        let { id, title } = this.state;
        let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        const data = { content, id, title };
        if (id) this.update(data);
        else this.create(data);
    };
    update = data => {
        axios.put('/api/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.error) {
                console.log('err ' + status, data.error);
                return;
            }
        });
    };

    create = data => {
        console.log('create', data);
        axios.post('/api/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.error) {
                console.log('err ' + status, data.error);
                return;
            }
            this.setState({ id: data.document._id });
        });
    };

    handleChange = e => {
        this.setState({ title: e.target.value });
    };

    render() {
        const { editorState, title } = this.state;
        return (
            <>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 form-group">
                        <input type="text" className="form-control document title" placeholder="title" value={title} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
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
            </>
        );
    }
}
