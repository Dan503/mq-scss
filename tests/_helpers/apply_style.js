
export default function (className){
	return new Promise((resolve) => {
		const $html = document.querySelector('html');
		$html.removeAttribute('class');
		$html.classList.add(className);
		setTimeout(resolve, 500)
	})
}
