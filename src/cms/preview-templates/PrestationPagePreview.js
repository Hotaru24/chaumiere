import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/prestation-page'

const PrestationPagePreview = ({ entry, widgetFor }) => (
  <HomePageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

PrestationPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PrestationPagePreview
