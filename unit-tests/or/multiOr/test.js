import unitTest from '../../../gulp/helpers/unitTest';

unitTest('multiOr', __dirname, '@media screen and (min-width: 801px), (min-height: 801px), (max-width: 1000px) and (min-width: 601px), (max-aspect-ratio: 2 / 1) and (min-aspect-ratio: 1 / 1), print{.unitTest{color:#000}}')
