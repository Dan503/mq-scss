//Performs a smooth page scroll to an anchor on the same page
//https://css-tricks.com/snippets/jquery/smooth-scrolling/

import $ from 'jquery';

export default function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000);
				return false;
			}
		}
	});
}
