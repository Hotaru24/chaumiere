import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { getImage } from "gatsby-plugin-image";
import './home.css'

import Carrousel from '../components/Carrousel/Carrousel';
import FullWidthImage from "../components/FullWidthImage";
import instagram from "../img/social/instagram.svg";
import facebook from "../img/social/facebook.svg";
import Layout from "../components/Layout/Layout";


// eslint-disable-next-line
export const HomePageTemplate = ({
  title,
  subheading,
  image,
  manager,
  accommodation,
  presentation
}) => {
  const [locale, setLocale] = useState('FR');

  const mobileBackground = getImage(image) || image;

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  return (
    <section className="home">
      <header>
        <div className="mobile">
          <FullWidthImage img={mobileBackground} title={title} subheading={subheading} />
        </div>
        <div className="desktop">
          <div className="carrousel">
            <Carrousel />
          </div>
          <div className="caption">
            <div className="text">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <h3>{subheading}</h3>
              <a id="scrollButton" href="#about-content" >{locale === 'FR' ? 'En découvrir plus' : 'Learn More'}</a>
            </div>
            <div className="social">
              <a title="facebook" href="https://facebook.com">
                <img
                  src={facebook}
                  alt="Facebook"
                />
              </a>
              <a title="instagram" href="https://instagram.com">
                <img
                  src={instagram}
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="page-body">
        <article>
          <h3>{presentation.presentationtitle}</h3>
          <p>{presentation.presentationdescription}</p>
        </article>
        <article>
          <h3>{accommodation.roomstitle}</h3>
          <p>{accommodation.roomsdescription}</p>
        </article>
        <article>
          <h3>{manager.abouttitle}</h3>
          <p>{manager.aboutdescription}</p>
        </article>
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  manager: PropTypes.shape({
    abouttitle: PropTypes.string,
    aboutdescription: PropTypes.string,
  }),
  accommodation: PropTypes.shape({
    roomstitle: PropTypes.string,
    roomsdescription: PropTypes.string,
  }),
  presentation: PropTypes.shape({
    presentationtitle: PropTypes.string,
    presentationdescription: PropTypes.string,
  })
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>      
      <HomePageTemplate
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        manager={post.frontmatter.manager}
        accommodation={post.frontmatter.accommodation}
        presentation={post.frontmatter.presentation}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HomePage;

export const homeQuery = graphql`
  query Home($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        subheading
        manager {
          abouttitle
          aboutdescription
        }
        accommodation {
          roomstitle
          roomsdescription
        }
        presentation {
          presentationtitle
          presentationdescription
        }
      }
    }
  }
`;





