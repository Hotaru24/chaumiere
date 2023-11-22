import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import { getImage } from "gatsby-plugin-image";
import './home.css'

import Button from '@mui/material/Button';

import PageHeaderImage from "../components/PageHeaderImage";
import Carrousel from '../components/Carrousel/Carrousel';
import Layout from "../components/Layout/Layout";

import instagram from "../img/social/instagram.svg";
import facebook from "../img/social/facebook.svg";


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
  const accommodationBackground = getImage(accommodation.image) || image;

  useEffect(() => {
    if (localStorage.getItem('locale')) {
      setLocale(localStorage.getItem('locale'));
    }
  }, []);

  return (
    <section className="home">
      <header>
        <div className="mobile">
          <PageHeaderImage img={mobileBackground} title={ title }/>
        </div>
        <div className="desktop">
          <div className="carrousel">
            <Carrousel />
          </div>
          <div className="caption">
            <div className="text">
              <h1 className="title">
                { title }
              </h1>
              <h2>{ subheading }</h2>
              <a id="scrollButton" href="#home-body" >
                <div><span></span></div>
                <p>{ locale === 'FR' ? 'Découvrir plus' : 'Learn More' }</p>
              </a>
            </div>
            <div className="social">
              <a
                title="facebook"
                href="https://www.facebook.com/profile.php?id=100091547882089"
                target="_blank"
              >
                <img
                  src={ facebook }
                  alt="Facebook"
                />
              </a>
              <a
                title="instagram"
                href="https://www.instagram.com/la.chaumiere.sainte.alvere/"
                target="_blank"
              >
                <img
                  src={ instagram }
                  alt="Instagram"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div id="home-body">
        { presentation &&
          <article className="page-body first">
            <h3>{ presentation.presentationtitle }</h3>
            <p>{ presentation.presentationdescription }</p>
            <div className="home-link">
              <h4> { locale === 'FR' ? 'Nos services pour un séjour exceptionnel' : 'Our services for an exceptional stay' }</h4>
              <Link to={`/${locale}/prestation`}>
                <Button variant="outlined" color="primary">
                  { locale === 'FR' ? 'Services & Activités' : 'Services & Activities' }
                </Button>
              </Link>
              <Link to={`/${locale}/gallery`}>
                <Button variant="outlined" color="primary">
                  { locale === 'FR' ? 'Galerie' : 'Gallery' }
                </Button>
              </Link>
            </div>
          </article>
          
        };
        { accommodation &&
          <article 
            className="background-section" 
            style={{
              background: `url(${accommodationBackground?.url ? accommodationBackground?.url : accommodationBackground?.images?.fallback?.src}) no-repeat center center`,
              backgroundSize: 'cover',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="background-section-content">
              <h3>{ accommodation.roomstitle }</h3>
              <p>{ accommodation.roomsdescription }</p>
              <div className="home-link">
                <Link to={`/${locale}/rooms`}>
                  <Button variant="outlined" color="primary">
                    { locale === 'FR' ? 'Gite & Chambres' : 'Accommodation' }
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        };
        { manager &&
          <article className="page-body">
            <h3>{ manager.abouttitle }</h3>
            <p>{ manager.aboutdescription }</p>
          </article>
        };
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
    presentationdescription: PropTypes.string
  })
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>      
      <HomePageTemplate
        title={post.frontmatter.title}
        image={post.frontmatter.image}
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
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        presentation {
          presentationtitle
          presentationdescription
        }
      }
    }
  }
`;





