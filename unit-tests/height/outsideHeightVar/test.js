import unitTest from '../../../gulp/helpers/unitTest';

unitTest('outsideHeightVar', __dirname, '@media (max-height: 600px), (min-height: 801px){.unitTest{color:#000}}')
