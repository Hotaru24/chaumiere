import React from 'react'
import PropTypes from 'prop-types'
import { HomePageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry, widgetFor }) => (
  <HomePageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
