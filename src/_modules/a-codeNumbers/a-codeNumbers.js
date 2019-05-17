
import _$$ from '../../_scripts/_helpers/_$selector';

export default function(){

	// putting lines by the pre blocks
	_$$("pre:not(.no-lines)").forEach(function(_$code, index, listObj){
		const lines = _$code.innerText.split("\n");
		const numbers = lines.map((text, i) => i+1);
		const trimmed_numbers = remove_empty_ends(numbers, lines);

		const originalHTML = _$code.outerHTML;
		_$code.outerHTML = `
			<div class="a-codeNumbers">
				<pre class="a-codeNumbers__numbers">${trimmed_numbers.join("\n")}</pre>
				<div class="a-codeNumbers__code">${originalHTML}</div>
			</div>`;
	});

	function remove_empty_ends (numbersArr, linesArr) {
		let clonedNumbers = [...numbersArr];
		trim_numbers(clonedNumbers, linesArr);
		const reversed = [...linesArr].reverse();
		trim_numbers(clonedNumbers, reversed);
		return clonedNumbers;
	}

	function trim_numbers(numbersArr, linesArr) {
		linesArr.some(line => {
			if (line === '') {
				numbersArr.pop();
				return false;
			}
			return true;
		})
	}

}
