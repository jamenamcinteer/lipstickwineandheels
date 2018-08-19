import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Link from 'gatsby-link'

import heroStyles from '../components/hero.module.css'
import styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlog')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log(post)

    return (
      <div style={{ background: '#fff' }} className={styles.blogPostContainer}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          {post.tags && (
            <p className={styles.blogPostTags}>
              {post.tags.map(tag => (
                <Link to={`/tag/${tag.slug}`} key={tag.slug}>
                  {tag.title}
                </Link>
              ))}
            </p>
          )}
          <p style={{ display: 'block' }} className={styles.blogPostDate}>
            {post.date}
          </p>
        </div>
        <div className={heroStyles.hero}>
          {post.postImage && (
            <Img
              className={heroStyles.postImage}
              alt={post.title}
              sizes={post.postImage.sizes}
            />
          )}
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: post.postContent.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM Do, YYYY")
      postContent {
        childMarkdownRemark {
          html
        }
      }
      postImage {
        sizes(maxWidth: 660, resizingBehavior: SCALE) {
          ...GatsbyContentfulSizes
        }
      }
      tags {
        title
        slug
      }
    }
  }
`

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     contentfulBlogPost(slug: { eq: $slug }) {
//       title
//       date(formatString: "MMMM Do, YYYY")
//       heroImage {
//         sizes(maxWidth: 1180, background: "rgb:000000") {
//           ...GatsbyContentfulSizes_tracedSVG
//         }
//       }
//       body {
//         childMarkdownRemark {
//           html
//         }
//       }
//     }
//   }
// `
