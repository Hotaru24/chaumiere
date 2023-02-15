import React from 'react'
import PropTypes from 'prop-types'
import { PricesPageTemplate } from '../../templates/prices-page'

const ProductPagePreview = ({ entry, getAsset }) => {

  return (
    <PricesPageTemplate
      title={entry.getIn(['data', 'title'])}
      heading={entry.getIn(['data', 'heading'])}
      description={entry.getIn(['data', 'description'])}
      prices={getAsset(entry.getIn(['data', 'prices']))}
    />
  )
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProductPagePreview
