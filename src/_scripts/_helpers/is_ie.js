
var ua = window.navigator.userAgent;
var is_ie = /MSIE|Trident/.test(ua);

document.documentElement.classList.add(is_ie ? 'ie' : 'not-ie');

export default is_ie;
