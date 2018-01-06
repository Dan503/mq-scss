import unitTest from '../../../gulp/helpers/unitTest';

unitTest('multiPlus', __dirname, '@media screen and (min-width: 801px) and (min-height: 401px) and (max-width: 1000px) and (min-width: 601px) and (max-aspect-ratio: 2 / 1) and (min-aspect-ratio: 1 / 1){.unitTest{color:#000}}')
