// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';

import codeLineNumbers from '~on-page-load-js/codeLineNumbers';
import smoothAnchors from '~on-page-load-js/smoothAnchors';

$(() => {
  $('html').removeClass('no-js').addClass('js');
  codeLineNumbers();
  smoothAnchors();
  $('html').addClass('-jsLoaded');
});
