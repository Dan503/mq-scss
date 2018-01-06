import unitTest from '../../../gulp/helpers/unitTest';

unitTest('outsideRatio', __dirname, '@media (max-aspect-ratio: 1 / 1), (min-aspect-ratio: 2 / 1){.unitTest{color:#000}}')
