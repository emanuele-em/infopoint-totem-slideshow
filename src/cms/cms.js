import CMS from 'netlify-cms-app';
import { it } from 'netlify-cms-locales';
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerLocale('it', it);

CMS.registerPreviewStyle('/admin/indexPagePreview.css');
CMS.registerPreviewTemplate('index', IndexPagePreview)