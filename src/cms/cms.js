import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import RoomsPostPreview from './preview-templates/RoomsPostPreview'
import PricesPagePreview from './preview-templates/PricesPagePreview'
import HomePagePreview from './preview-templates/HomePagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate('index', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('pricess', PricesPagePreview)
CMS.registerPreviewTemplate('rooms', RoomsPostPreview)
