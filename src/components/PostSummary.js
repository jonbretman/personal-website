import React from 'react';
import Link from 'gatsby-link';
import PostDate from './PostDate';

export default function PostSummary({ path, title, date, excerpt }) {
    return (
        <div className={'post-summary'}>
            <h2 className={'post-summary__title'}>
                <Link className={'no-hover-text-decoration'} to={path}>
                    {title}
                </Link>
            </h2>
            <div className={'post-date'}>
                <strong>
                    <small>
                        <PostDate date={date} />
                    </small>
                </strong>
            </div>
            <p>{excerpt}</p>
            <Link to={path}>&raquo; Read more</Link>
        </div>
    );
}
