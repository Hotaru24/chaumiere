import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./prestations.css";

import FullWidthImage from "../components/FullWidthImage";
import Services from "../components/Services/Services";
import Layout from "../components/Layout/Layout";



// eslint-disable-next-line
export const PrestationPageTemplate = ({
  image,
  title,
  services,
  meal,
  activities
}) => {
  const heroImage = getImage(image) || image;

  const activitiesMapUrl = "https://www.google.com/maps/d/embed?mid=16CBReMCohNJGMQbyAda9dMR3TAQEswE&ehbc=2E312F";
  const isMobile = useMediaQuery('(max-width: 850px)');

  return (
    <>
      <FullWidthImage img={ heroImage } title={ title } />
      { services && 
        <section className="page-body">
          <h2>{ services.heading }</h2>
          <h3 >{ services.description }</h3>
          <Services gridItems={ services.blurbs } />
        </section>
      }
      { meal &&
        <section>
          <div className="page-body meal">
            <h2>{ meal.heading }</h2>
            <p>{ meal.description }</p>
          </div>
        </section>
      }
      { activities &&
        <section className="page-body">
            <h2>{ activities.heading }</h2>
            <h3 >{ activities.description }</h3>
            <div className="activities-map-container">
              <iframe
                src={ activitiesMapUrl }
                title="activities"
                width={ isMobile ? 640 : 800 }
                height={ isMobile ? 480 : 550 }
              ></iframe>                 
            </div>           
        </section>
      }
    </>
  );
};

PrestationPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  services: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  meal: PropTypes.object,
  activities: PropTypes.object
};

const PrestationPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PrestationPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        services={frontmatter.services}
        meal={frontmatter.meal}
        activities={frontmatter.activities}
      />
    </Layout>
  );
};

PrestationPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default PrestationPage;

export const pageQuery = graphql`
  query PrestationPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        services {
          heading
          description
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            title
            text
          }
        }
        meal {
          heading
          description
        }
        activities {
          heading
          description
        }
      }
    }
  }
`;
