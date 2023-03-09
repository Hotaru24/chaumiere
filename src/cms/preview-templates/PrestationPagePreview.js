import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/prestation-page'

const PrestationPagePreview = ({ entry, widgetFor }) => (
  <HomePageTemplate
    title={entry.getIn(['data', 'title'])}
    cheading={entry.getIn(['data', 'heading'])}
  />
)

PrestationPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PrestationPagePreview
