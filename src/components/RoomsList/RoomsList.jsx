import React, { useEffect, useState } from "react";
import { Link, graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import './roomsList.css';

import PreviewCompatibleImage from '../PreviewCompatibleImage';


const RoomsListTemplate = (props) => {
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
            <article className="room-card" key={post.id}>
              <header>
                { post?.frontmatter?.featuredimage && (
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
                )}
                <p>
                  <Link to={ post.fields.slug }>
                    { post.frontmatter.title }
                  </Link>
                  <span> &bull; </span>
                  <span> { post.frontmatter.price } </span>
                </p>
              </header>
              <p>
                { post.excerpt }
                <br/>
                <br/>
                <Link className="button" to={ post.fields.slug }>
                  { locale === 'FR' ? 'En voir plus' : 'See more' }
                </Link>
              </p>
            </article>
          ))}
    </div>
  )
}

RoomsList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function RoomsList() {
  return (
    <StaticQuery
      query={graphql`
        query RoomsListQuery {
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
      render={(data, count) => <RoomsListTemplate data={data} count={count} />}
    />
  );
}
