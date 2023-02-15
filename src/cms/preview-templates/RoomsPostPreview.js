import React from 'react'
import PropTypes from 'prop-types'
import { RoomsPostTemplate } from '../../templates/rooms-post'

const RoomsPostPreview = ({ entry, widgetFor }) => {
  return (
    <RoomsPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

RoomsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RoomsPostPreview
