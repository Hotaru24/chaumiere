import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import Content, { HTMLContent } from "../components/Content";
import Carrousel from '../components/Carrousel';
import instagram from "../img/social/instagram.svg";
import facebook from "../img/social/facebook.svg";

import './about.css'

// eslint-disable-next-line
export const AboutPageTemplate = ({
  title,
  subheading,
  content,
  contentComponent 
}) => {
  const [locale, setLocale] = useState('FR');
  const PageContent = contentComponent || Content;

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
            <div className="section about">
              <header>
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
              </header>
              <div id="about-content">
                <PageContent  className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>      
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subheading={post.frontmatter.subheading}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subheading
      }
    }
  }
`;
