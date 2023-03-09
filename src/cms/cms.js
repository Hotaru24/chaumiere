import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import PrestationPagePreview from './preview-templates/PrestationPagePreview'
import RoomsPostPreview from './preview-templates/RoomsPostPreview'
import PricesPagePreview from './preview-templates/PricesPagePreview'
import HomePagePreview from './preview-templates/HomePagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('prestation', PrestationPagePreview)
CMS.registerPreviewTemplate('prices', PricesPagePreview)
CMS.registerPreviewTemplate('rooms', RoomsPostPreview)
