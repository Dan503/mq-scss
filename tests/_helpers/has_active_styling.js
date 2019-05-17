

//https://stackoverflow.com/a/51137753/1611058
const getStyle = function(element, property) {
	return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
};

export default function has_active_styling (){
	const bg = getStyle(document.querySelector('html'), 'background-color');
	return ['rgba(0, 0, 0, 0)', 'transparent'].indexOf(bg) < 0;
}
