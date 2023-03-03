import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

export default function PageHeaderImage(props) {
  const {
    img,
    title
  } = props;

  return (
    <>
      {img &&
        <header
          className="pages-header"
          style={{
            background: `url(${img.url ? img.url : img.images?.fallback?.src}) no-repeat center center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}>
          <h1>{ title }</h1>
        </header>      
      }
    </>
  );
}

PageHeaderImage.propTypes = {
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string
};
