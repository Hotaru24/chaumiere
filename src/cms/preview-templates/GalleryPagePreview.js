import React from 'react'
import PropTypes from 'prop-types'
import { GalleryPageTemplate } from '../../templates/gallery'

const GalleryPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <GalleryPageTemplate
        title={data.title}
        galleryimages={data.galleryimages}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

GalleryPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default GalleryPagePreview