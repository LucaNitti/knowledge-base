import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <dl>
                {documents.map(x => (
                    <>
                        <dt>
                            <Link key={x._id} to={`/document/${x._id}`}>
                                {x.title}
                            </Link>
                        </dt>
                        <dd dangerouslySetInnerHTML={{ __html: x.content }}></dd>
                    </>
                ))}
            </dl>
        );
    }
}
