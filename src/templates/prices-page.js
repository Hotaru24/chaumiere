import React from "react";
import { graphql } from "gatsby";

import { GatsbyImage } from "gatsby-plugin-image";
import { getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";

import Layout from "../components/Layout/Layout";
import './prices.css';


// eslint-disable-next-line
export const PricesPageTemplate = ({
  heading,
  description,
  prices
}) => {

  const priceTablePicture = getImage(prices) || prices;

  return (
    <div className="content">
      <section className="section prices">
        <header>
          <h2>{heading}</h2>
          <p>{description}</p>
        </header>
        <article>
          <GatsbyImage
            image={priceTablePicture}
            objectFit={"cover"}
            objectPosition={"bottom"}
          />          
        </article>
      </section>
    </div>
  );
};

PricesPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  prices: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const PricesPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PricesPageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        prices={frontmatter.prices}
      />
    </Layout>
  );
};

PricesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default PricesPage;

export const pricesPageQuery = graphql`
  query PricesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        description
        prices {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
