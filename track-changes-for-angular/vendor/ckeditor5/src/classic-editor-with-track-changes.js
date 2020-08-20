/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'
import Comments from '@ckeditor/ckeditor5-comments/src/comments'
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage'
import BaseEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges'

export default class ClassicEditorWithTrackChanges extends BaseEditor {}

ClassicEditorWithTrackChanges.builtinPlugins = [
  Alignment,
  Autoformat,
  BlockQuote,
  Bold,
  CKFinder,
  EasyImage,
  Essentials,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  Image,
  Italic,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  Comments,
  TrackChanges,
]

ClassicEditorWithTrackChanges.defaultConfig = {
  // Cloud Services configuration is added only for the Easy Image integration. This configuration should not be used in a
  // production environment. It is not needed for the track changes feature. See https://ckeditor.com/ckeditor-cloud-services/easy-image/
  cloudServices: {
    tokenUrl:
      'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt',
    uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
  },
  toolbar: [
    'heading',
    '|',
    'fontsize',
    'fontfamily',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'removeFormat',
    'highlight',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'link',
    'blockquote',
    'insertTable',
    '|',
    'trackChanges',
    '|',
    'comment',
    '|',
    'undo',
    'redo',
  ],
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    tableToolbar: ['comment'],
  },
}
