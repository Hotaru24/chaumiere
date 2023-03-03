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
  featuredimage,
  featuredimage2,
  featuredimage3,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  const slideImages = [];

  useEffect(() => {
    if (featuredimage) {
      slideImages.push(featuredimage);
    }
    if (featuredimage2) {
      slideImages.push(featuredimage3);
    }
    if (featuredimage3) {
      slideImages.push(featuredimage3);
    }
    
  }, []);

  const [slideCount, setSlideCount] = useState(0);

  const handleCountUp = () => {
    slideCount < 2 ? setSlideCount(slideCount + 1) : setSlideCount(0);
  }

  const handleCountDown = () => {
    slideCount > 0 ? setSlideCount(slideCount - 1) : setSlideCount(2);
  }

  return (
    <section>
      {helmet || ""}
      <div className="page-body">
        <h1>
          {title} {slideCount}
        </h1>
        <div className="header-container">
          <div className="rooms-slider">
            <GatsbyImage
              image={getImage(featuredimage)}
              style={{display: slideCount === 1 ? 'block' : 'none'}}
              alt={""}
            />
            <GatsbyImage
              image={getImage(featuredimage2)}
              style={{display: slideCount === 0 ? 'block' : 'none'}}
              alt={""}
            />
            <GatsbyImage
              image={getImage(featuredimage3)}
              style={{display: slideCount === 2 ? 'block' : 'none'}}
              alt={""}
            />
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
            <p>A partir de</p>
            <p>{price}</p>
            <Button variant="outlined" className="booking-button">réserver</Button>
          </div>
        </div>

        <p>{description}</p>
        <PostContent content={content} />
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
  featuredimage: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
  }),
  featuredimage2: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
  }),
  featuredimage3: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
  }),
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
        featuredimage={post.frontmatter.featuredimage}
        featuredimage2={post.frontmatter.featuredimage2}
        featuredimage3={post.frontmatter.featuredimage3}
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
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              width: 800
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
        featuredimage2 {
          childImageSharp {
            gatsbyImageData(
              width: 800
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
        featuredimage3 {
          childImageSharp {
            gatsbyImageData(
              width: 800
              quality: 100
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;
