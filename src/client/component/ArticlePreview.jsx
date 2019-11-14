import React from 'react';
import { Link } from 'react-router-dom';
const ArticlePreview = props => {
    let article = props.article;
    let date = article.lastModified || article.created;
    let formattedDate = new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        second: 'numeric',
        minute: 'numeric',
        hour: 'numeric',
    }).format(new Date(date));
    return (
        <>
            <div className="col-12 article-preview">
                <Link to={`/document/${article._id}`}>
                    <h1>{article.title}</h1>
                </Link>
                <p className="body" dangerouslySetInnerHTML={{ __html: article.content }}></p>
                <div className="d-flex justify-content-between">
                    <span className="text-muted">Last Edit: {formattedDate}</span>
                    {/* <div>
                        <span className="badge badge-secondary">alice</span>
                        <span className="badge badge-primary">story</span>
                        <span className="badge badge-success">blog</span>
                        <span className="badge badge-info">personal</span>
                        <span className="badge badge-warning">Warning</span>
                        <span className="badge badge-danger">Danger</span>
                    </div> */}
                </div>
            </div>
            <hr />
        </>
    );
};
export default ArticlePreview;