import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout/Layout";
import Services from "../components/Services/Services";
import FullWidthImage from "../components/FullWidthImage";


// eslint-disable-next-line
export const PrestationPageTemplate = ({
  image,
  title,
  services,
  meal,
  activities
}) => {
  const heroImage = getImage(image) || image;

  return (
    <>
      <FullWidthImage img={ heroImage } title={ title } />
      <div>
        {services && 
          <section>
            <h2>{ services.heading }</h2>
            <h3 >{ services.description }</h3>
            <Services gridItems={ services.blurbs } />
          </section>
        }
        {meal &&
          <section>
            <h2>{ meal.heading }</h2>
            <p>{ meal.description }</p>
          </section>
        }
        { activities &&
          <section>
              <h2>{ activities.heading }</h2>
              <h3 >{ activities.description }</h3>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=16CBReMCohNJGMQbyAda9dMR3TAQEswE&ehbc=2E312F"
                width="640"
                height="480"
              ></iframe>            
          </section>
        }
      </div>
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
