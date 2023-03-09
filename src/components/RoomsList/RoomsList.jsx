import React, { useEffect, useState } from "react";
import { Link, graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import './roomsList.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

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
            <article  className="room-card-container"key={post.id}>
              <Card>
                <div className="room-card-content">
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
                  <div className="room-card-text">
                    <div className="room-card-header">
                      <h2>{ post.frontmatter.title }</h2>
                    </div>
                    <div className="room-card-price">
                      <span>{ locale === 'FR' ? 'A partir de' : 'From' }</span>
                      <span> { post.frontmatter.price } </span>
                      <Link className="button" to={ post.fields.slug }>
                        <Button variant="outlined">{ locale === 'FR' ? 'En voir plus' : 'See more' }</Button>
                      </Link>
                    </div> 
                  </div> 
                </div>               
              </Card>
            </article>
          ))
      }
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
                        width: 300
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
