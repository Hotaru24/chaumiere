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
  prices,
  rows,
  nightCols,
  weekCols,
  romance,
  reverie,
  songe,
  cocon
}) => {

  const priceTablePicture = getImage(prices) || prices;
console.log(weekCols)
  return (
    <div className="content">
      <section className="section prices">
        <header>
          <h2>{heading}</h2>
          <p>{description}</p>
        </header>
        <article>
          <h1>{weekCols?.heading}</h1>
          <h1>{rows?.cottage}</h1>
          <h1>{romance.week}</h1>
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
  prices: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  rows: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  nightCols: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  weekCols: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  romance: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  reverie: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  songe: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  cocon: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
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
        rows={frontmatter.rows}
        nightCols={frontmatter.nightCols}
        weekCols={frontmatter.weekCols}
        romance={frontmatter.romance}
        reverie={frontmatter.reverie}
        songe={frontmatter.songe}
        cocon={frontmatter.cocon}
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
        rows {
          room
          cottage
        }
        nightCols {
          heading
          subheading
        }
        weekCols {
          heading
          subheading
        }
        romance {
          night
          week
        }
        reverie {
          night
          week
        }
        songe {
          night
          week
        }
        cocon {
          night
          week
        }
      }
    }
  }
`;
