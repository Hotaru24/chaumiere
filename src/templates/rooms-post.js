import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout/Layout";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { orange } from '@mui/material/colors';
import './rooms.css';
import Button from '@mui/material/Button';

// eslint-disable-next-line
export const RoomsPostTemplate = ({
  content,
  contentComponent,
  description,
  price,
  title,
  images,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const [locale, setLocale] = useState('FR');
  const slideImages = [];

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  const [slideCount, setSlideCount] = useState(0);

  const handleCountUp = () => {
    slideCount < images.length - 1 ? setSlideCount(slideCount + 1) : setSlideCount(0);
  }

  const handleCountDown = () => {
    slideCount > 0 ? setSlideCount(slideCount - 1) : setSlideCount(images.length - 1);
  }

  return (
    <section>
      {helmet || ""}
      <div className="page-body room-detail">
        <h1>
          {title}
        </h1>
        <div className="header-container">
          <div className="rooms-slider">
            { images &&
              images.map((img, index) => {
                return (
                  <GatsbyImage
                    image={getImage(img.roomimage)}
                    style={{display: slideCount === index ? 'block' : 'none'}}
                    alt={""}
                  />
                )
              })
            }
            <div className="rooms-slider-buttons">
              <IconButton onClick={handleCountDown} aria-label="right">
                <ArrowBackIosIcon sx={{ color: orange[500] }} fontSize="large"/>
              </IconButton>
              <IconButton onClick={handleCountUp} aria-label="right">
                <ArrowForwardIosIcon sx={{ color: orange[500] }} fontSize="large"/>
              </IconButton>
            </div>
          </div>
          <div className="room-detail-price">
            <p>{ locale === 'FR' ? 'A partir de' : 'From' }</p>
            <p>{price}</p>
            <Button variant="outlined" className="booking-button">{ locale === 'FR' ? 'Réserver' : 'Booking' }</Button>
          </div>
        </div>

        <h2>{description}</h2>
        <p>
          <PostContent content={content} />          
        </p>
      </div>
    </section>
  );
};

RoomsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.array,
  helmet: PropTypes.object,
};

const RoomsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RoomsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        price={post.frontmatter.price}
        helmet={
          <Helmet titleTemplate="%s | Rooms">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        images={post.frontmatter.images}
      />
    </Layout>
  );
};

RoomsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default RoomsPost;

export const pageQuery = graphql`
  query RoomsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        price
        images {
          roomimage {
            childImageSharp {
              gatsbyImageData(
                width: 9800
                quality: 100
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`;
