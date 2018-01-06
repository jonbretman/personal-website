import React from 'react';
import Helmet from 'react-helmet';
import PostDate from '../components/PostDate';

export default function Template(props) {
    const { markdownRemark: post, site } = props.data;

    return (
        <div>
            <Helmet
                title={`${site.siteMetadata.title} - ${post.frontmatter.title}`}
            />
            <div>
                <h1>{post.frontmatter.title}</h1>
                <PostDate date={post.frontmatter.date} />
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    );
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
        site {
            siteMetadata {
                title
            }
        }
    }
`;
