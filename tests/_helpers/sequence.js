
export default function sequence (promiseArray) {
	return promiseArray.reduce((a,b) => {
		const c = typeof a === 'function' ? a() : a;
		return c.then(b);
	});
}
