import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import PostSummary from '../components/PostSummary';

export default function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark;
    return (
        <div>
            {posts.map(({ node: post }) => {
                return (
                    <div key={post.id}>
                        <PostSummary
                            path={post.frontmatter.path}
                            title={post.frontmatter.title}
                            date={post.frontmatter.date}
                            excerpt={post.excerpt}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                    }
                }
            }
        }
    }
`;
