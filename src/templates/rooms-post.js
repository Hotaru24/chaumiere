import React, { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import './rooms.css';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Content, { HTMLContent } from "../components/Content";
import Layout from "../components/Layout/Layout";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [openModale, setOpenModale] = useState(false);

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

  const sliderTemplate = () => {
    return (
      <div className="rooms-slider">
        <div
          onClick={() => {setOpenModale(true)}}
          style={{
            cursor: openModale ? 'auto' : 'zoom-in',
            maxHeight: openModale ? 'auto' : '50vh'
          }}
        >
          { images &&
            images.map((img, index) => {
              return (
                <GatsbyImage
                  image={getImage(img.roomimage)}
                  style={{ display: slideCount === index ? 'block' : 'none', maxHeight: openModale ? '80vh' : '50vh'}}
                  alt={""}
                  key={index}
                />
              )
            })
          }
        </div>
        <div className="rooms-slider-buttons">
          <div className="slider-button">
            <IconButton onClick={handleCountDown} aria-label="right">
              <ArrowBackIosIcon sx={{ color: orange[500] }} fontSize="large"/>
            </IconButton>
          </div>
          <div className="slider-button">
            <IconButton onClick={handleCountUp} aria-label="right">
              <ArrowForwardIosIcon sx={{ color: orange[500] }} fontSize="large"/>
            </IconButton>
          </div>
        </div>
      </div>
    )
  }


  return (
    <section>
      {helmet || ""}
      <div className="page-body room-detail">
        <h1>
          {title}
        </h1>
        <div className="header-container">
          { sliderTemplate() }
          <div className="room-detail-price">
            <p>{ locale === 'FR' ? 'A partir de' : 'From' }</p>
            <p>{price}</p>
            <a 
                href="https://reservation.elloha.com/?IdPublication=046be7c8-8f62-4f49-81bc-893c382d67ea&culture=fr-FR&idoi=f6289d3b-e380-4b54-9675-b9db9b7d0c32&searchFirstAvailableDates=1"
                target="_blank"
              >
                <Button variant="outlined" className="booking-button">{ locale === 'FR' ? 'Disponibilités et Réservation' : 'Booking' }</Button>
              </a>
            </div>
        </div>

        <h2>{ description}</h2>
        <p>
          <PostContent content={content} />
        </p>
      </div>
      <Modal
        open={openModale}
        onClose={ () => {setOpenModale(false)} }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          { sliderTemplate() }
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={ () => {setOpenModale(false)} }
          >
            { locale === 'FR' ? 'Fermer' : 'Close' }
          </Button>
         </Box>        
      </Modal>
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
