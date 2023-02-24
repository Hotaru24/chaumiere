import * as React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import './services.css';

const FeatureGrid = ({ gridItems }) => (
  <div className="services-list">
    {gridItems.map((item, index) => (
      <article key={ index } className="service-item">
        <div className="service-item-icon">
          <PreviewCompatibleImage imageInfo={item} />
        </div>
        <h3>{ item.title }</h3>
        <p>{ item.text }</p>
      </article>
    ))}
  </div>
);

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      title: PropTypes.string,
      text: PropTypes.string
    })
  ),
};

export default FeatureGrid;
