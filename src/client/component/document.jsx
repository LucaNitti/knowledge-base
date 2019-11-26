import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

export default class Document extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        let id = this.props.match.params.id;
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            id,
        };
    }

    componentDidMount() {
        let { id } = this.state;
        if (!id) return;
        axios.get(`/api/document/get/${id}`).then(res => {
            console.log(res.data.document);
            if (res.data.document) {
                const contentBlock = htmlToDraft(res.data.document.content);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                let newState = {
                    title: res.data.document.title,
                    editorState,
                };
                this.setState(newState);
            }
        });
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
        axios.put('/api/document/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.error) {
                console.log('err ' + status, data.error);
                return;
            }
        });
    };

    create = data => {
        console.log('create', data);
        axios.post('/api/document/save', data).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.error) {
                console.log('err ' + status, data.error);
                return;
            }
            this.props.history.push(`/document/${data.document._id}`);
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
                        {editorState && (
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        )}
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
