
import { using_ems } from './mq_style';
import mq from './mq';

// Do not run test in Chrome, Chrome resize is unstable
// Firefox resize is stable and predictable :D
export default function windowResize (width, height = width) {

	const difference = {
		width: window.outerWidth - window.innerWidth,
		height: window.outerHeight - window.innerHeight,
	}

	const multiplier = get_multiplier();

	const final = {
		width: parseInt(width * multiplier) + difference.width,
		height: parseInt(height * multiplier) + difference.height,
	}

	window.resizeTo(final.width, final.height);
}

window.windowResize = windowResize;

function get_multiplier(){
	if (using_ems) {
		const $document = document.querySelector('body');
		const fontSize = parseFloat( getComputedStyle($document).fontSize );
		return fontSize / mq.settings.emBase;
	}
	return 1;
}
