import React, { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";

import './gallery.css'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Layout from "../components/Layout/Layout";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85vw',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

// eslint-disable-next-line
export const GalleryPageTemplate = ({
  title,
  galleryimages
}) => {
  const [openModale, setOpenModale] = useState(false);
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [locale, setLocale] = useState('FR');

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  const sliderUp = () => {
    currentPictureIndex < (galleryimages.length - 1) ?
      setCurrentPictureIndex(currentPictureIndex + 1) :
      setCurrentPictureIndex(0);
  };

  const sliderDown = () => {
    currentPictureIndex > 0 ?
      setCurrentPictureIndex(currentPictureIndex - 1) :
      setCurrentPictureIndex(galleryimages.length -1);
  };

  return (
    <section className="gallery">
      {galleryimages.map((img, index) => {
            return (
              <div className="gallery-container" onClick={() => {setCurrentPictureIndex(index); setOpenModale(true)}}>
                  <div className="gallery-item">
                    <GatsbyImage
                      image={getImage(img.galleryimage)}                      
                      alt={""}
                      key={index}
                    />
                    <div className="text">+</div>
                  </div>
              </div>
            )
          })}
      <Modal
        open={openModale}
        onClose={ () => {setOpenModale(false)} }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {galleryimages &&
            <div className="gallery-zoom">
              <GatsbyImage
                image={getImage(galleryimages[currentPictureIndex]?.galleryimage)}
                style={{maxHeight: "87vh"}}
                alt={""}
              />
            </div>
          }
          {openModale && 
            <div className="gallery-slider-buttons">
              <div className="slider-button">
                <IconButton onClick={sliderDown} aria-label="right">
                  <ArrowBackIosIcon sx={{ color: orange[500] }} fontSize="large"/>
                </IconButton>
              </div>
              <div className="slider-button">
                <IconButton onClick={sliderUp} aria-label="right">
                  <ArrowForwardIosIcon sx={{ color: orange[500] }} fontSize="large"/>
                </IconButton>
              </div>
            </div>
          }
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

GalleryPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  galleryimages: PropTypes.array,
};

const GalleryPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>      
      <GalleryPageTemplate
        title={post.frontmatter.title}
        galleryimages={post.frontmatter.galleryimages}
      />
    </Layout>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GalleryPage;

export const galleryQuery = graphql`
  query GalleryPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        galleryimages {
          galleryimage {
            childImageSharp {
              gatsbyImageData(
                width: 9800
                quality: 100,
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  }
`;





