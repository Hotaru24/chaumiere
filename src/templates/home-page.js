import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import Carrousel from '../components/Carrousel/Carrousel';
import { getImage } from "gatsby-plugin-image";
import FullWidthImage from "../components/FullWidthImage";
import instagram from "../img/social/instagram.svg";
import facebook from "../img/social/facebook.svg";

import './home.css'

// eslint-disable-next-line
export const HomePageTemplate = ({
  title,
  subheading,
  image,
  about,
  rooms,
  presentation
}) => {
  const [locale, setLocale] = useState('FR');

  const mobileBackground = getImage(image) || image;
  const articles = [presentation, rooms, about]

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section home">
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
              <div id="about-content">
                {articles.map((article) => {
                  return (
                    <>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>                    
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  about: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  rooms: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  presentation: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  })
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>      
      <HomePageTemplate
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        about={post.frontmatter.about}
        rooms={post.frontmatter.rooms}
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
        about {
          title
          description
        }
        rooms {
          title
          description
        }
        presentation {
          title
          description
        }
      }
    }
  }
`;




