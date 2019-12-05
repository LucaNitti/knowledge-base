import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

export default class Document extends Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.state = {
            editorState: EditorState.createEmpty(),
            title: '',
            tags: [],
            availableTags: [],
            id,
        };
    }

    componentDidMount() {
        let { id } = this.state;
        if (!id) return;
        axios.get(`/api/document/${id}`).then(res => {
            if (res.data.document) {
                const contentBlock = htmlToDraft(res.data.document.content);
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                let newState = {
                    title: res.data.document.title,
                    editorState,
                    tags: res.data.document.tags,
                };
                this.setState(newState);
            }
        });
        axios.get(`/api/tag/`).then(res => {
            if (res.data.tags) {
                let newState = {
                    availableTags: res.data.tags,
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
        let { id, title, tags } = this.state;
        let content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        const data = { content, id, title, tags };
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

    handleChangeSelect = tags => {
        this.setState({ tags });
    };

    onCreateOption = value => {
        axios.post('/api/tag/save/', { name: value, type: value }).then(res => {
            let { status, data } = res;
            if (status !== 200 || data.error) {
                console.log('err ' + status, data.error);
                return;
            }
            let updateState = { ...this.state };
            if (data.tags && data.tags.length != 0) {
                updateState.availableTags = data.tags;
            }
            if (data.tag) {
                updateState.tags.push(data.tag);
            }
            this.setState(updateState);
        });
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
                <div className="tags row">
                    <div className="col-6">
                        <CreatableSelect
                            isClearable
                            isMulti
                            isCreatable
                            classNamePrefix=" "
                            className="react-select"
                            onChange={this.handleChangeSelect}
                            options={this.state.availableTags}
                            onCreateOption={this.onCreateOption}
                            value={this.state.tags}
                            getNewOptionData={(inputValue, optionLabel) => ({
                                _id: inputValue,
                                name: inputValue,
                                __isNew__: true,
                            })}
                            getOptionValue={option => option['name']}
                            getOptionLabel={option => option['name']}
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
