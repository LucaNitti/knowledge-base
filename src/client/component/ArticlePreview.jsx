import React from 'react';
import { Link } from 'react-router-dom';
const ArticlePreview = props => {
    let article = props.article;
    let date = article.lastModified || article.created;
    let tags = article.tags || [];
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
                    <h1 className="title">{article.title}</h1>
                </Link>
                <div className="tag">
                    tag:{' '}
                    {tags.map(x => (
                        <span className="badge" id={x._id}>
                            {x.name}
                        </span>
                    ))}
                </div>
                <p className="body" dangerouslySetInnerHTML={{ __html: article.content }}></p>

                <div className="d-flex justify-content-between">
                    <span className="text-muted">Last Edit: {formattedDate}</span>
                </div>
            </div>
            <hr />
        </>
    );
};
export default ArticlePreview;
