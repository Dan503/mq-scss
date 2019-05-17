
function result (isAllowed, callback) {
  if (isAllowed && callback) callback.call(window, screenSize());
  return isAllowed;
}

function screenWidth () {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function screenHeight () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function screenSize(){
  var width = screenWidth();
  var height = screenHeight();
  var numberRatio = width / height;
  var stringRatio = number_to_ratio(numberRatio);
  var orientation = numberRatio > 1 ? 'landscape' : 'portrait';

  return {
    width: width,
    height: height,
    orientation: orientation,
    ratio: {
      number: numberRatio,
      string: stringRatio,
    }
  };
}

//Checks if the size is a valid breakpoint value
function checkBP(size, breakpoints){
  if (typeof size === 'string'){
    if (typeof breakpoints[size] !== 'undefined'){
      return breakpoints[size];
    } else {
      console.error('Available Breakpoints:', breakpoints);
      throw new Error('"'+size+'" breakpoint does not exist');
    }
  } else if (typeof size === 'number') {
    return size;
  } else {
    console.error('Available Breakpoints:', breakpoints);
    throw new Error('"'+size+'" is not a valid breakpoint. It must be a string or a number');
  }
}

function inside_outside(queryTemplate, dimension, instance, sizeOne, sizeTwo, callback) {
	return result(
		doubleValue({
			queryTemplate: queryTemplate,
			sizeOne: sizeOne,
			sizeTwo: sizeTwo,
			dimension: dimension,
			MQ_instance: instance,
		}),
		callback
	);
}

// Test if current screen size is between 2 values
function doubleValue (opts) {

  var queryTemplate = opts.queryTemplate;
  var sizeOne = opts.sizeOne;
  var sizeTwo = opts.sizeTwo;
  var dimension = opts.dimension;
  var MQ_instance = opts.MQ_instance;

  check_second_value(sizeOne, sizeTwo, dimension);

  var sizes = [
    checkBP(sizeOne, MQ_instance.bp),
    checkBP(sizeTwo, MQ_instance.bp),
  ];

  var largeSize = Math.max.apply(null,sizes);
  var smallSize = Math.min.apply(null,sizes);

  // Un-comment to debug
  // console.log({largeSize, smallSize})

  return MQ_instance.checkMQ({
    queryTemplate: queryTemplate,
    largeSize: largeSize,
    smallSize: smallSize
  });
}

function second_property_is_invalid (secondProperty) {
  var type = typeof secondProperty;
  var isInvalid = ['function','undefined'].indexOf(type) > -1;
  return isInvalid;
}

function check_second_value(propOne, propTwo, dimension){
  if (second_property_is_invalid(propTwo)){
    var message = function (divider, extra) {
      divider = divider || ' and ';
      extra = extra || '';
      var dimensionFunctions = {
        width : ['mq.inside(',extra,')',divider,'mq.outside(',extra,')'].join(''),
        height : ['mq.insideHeight(',extra,')',divider,'mq.outsideHeight(',extra,')'].join(''),
        ratio : ['mq.insideRatio(',extra,')',divider,'mq.outsideRatio(',extra,')'].join(''),
      }
      return dimensionFunctions[dimension];
    }

    throw new Error('\
\
  The '+message()+' functions require two breakpoints to be defined.\
\
  Currently only the "'+propOne+'" breakpoint is defined.\
  The other breakpoint is coming through as "'+propTwo+'".\
\
  Please use this format:\
  '+message('\n', '[breakpoint-1], [breakpoint-2], [optional-callback-function]')+'\
  ')
  }
}

//http://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/
function number_to_ratio(x) {
	var tolerance = 1.0E-6;
	var h1=1; var h2=0;
	var k1=0; var k2=1;
	var b = x;
	do {
			var a = Math.floor(b);
			var aux = h1; h1 = a*h1+h2; h2 = aux;
			aux = k1; k1 = a*k1+k2; k2 = aux;
			b = 1/(b-a);
	} while (Math.abs(x-h1/k1) > x*tolerance);

	return h1+" / "+k1;
}

exports.result = result;
exports.screenWidth = screenWidth;
exports.screenHeight = screenHeight;
exports.screenSize = screenSize;
exports.checkBP = checkBP;
exports.doubleValue = doubleValue;
exports.check_second_value = check_second_value;
exports.number_to_ratio = number_to_ratio;
exports.inside_outside = inside_outside;
