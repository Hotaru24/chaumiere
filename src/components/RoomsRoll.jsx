import React, { useEffect, useState } from "react";
import { Link, graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import PreviewCompatibleImage from './PreviewCompatibleImage';


const RoomsRollTemplate = (props) => {
  const [locale, setLocale] = useState('FR');
  const { edges: posts } = props.data.allMarkdownRemark;

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  return (
    <div className="rooms-list">
      {posts &&
        posts
          .filter((post) => post?.node?.fields?.slug?.includes(`/${locale}/`))
          .map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {post?.frontmatter?.featuredimage && (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                          width:
                            post.frontmatter.featuredimage.childImageSharp
                              .gatsbyImageData.width,
                          height:
                            post.frontmatter.featuredimage.childImageSharp
                              .gatsbyImageData.height,
                        }}
                      />
                    </div>
                  ) }
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.price}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    { locale === 'FR' ? 'En voir plus' : 'See more' }
                  </Link>
                </p>
              </article>
            </div>
          ))}
    </div>
  )
}

RoomsRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function RoomsRoll() {
  return (
    <StaticQuery
      query={graphql`
        query RoomsRollQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "rooms-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  price
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <RoomsRollTemplate data={data} count={count} />}
    />
  );
}
