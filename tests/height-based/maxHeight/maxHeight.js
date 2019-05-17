
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let maxHeightResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name:`positive maxHeight ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: maxHeightResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name:`negative maxHeight ${name}`,
				size: [bp.large, bp.large+1],
				mqMatch: false,
				test: test,
				localTracker: maxHeightResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `"large" (if)`,
			test: ()=> mq.maxHeight('large'),
		}),

		new positiveTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.maxHeight(bp.large),
		}),

		new positiveTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.maxHeight('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.maxHeight(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `"large" (if)`,
			test: ()=> mq.maxHeight('large'),
		}),

		new negativeTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.maxHeight(bp.large),
		}),

		new negativeTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.maxHeight('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.maxHeight(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('maxHeight'),
		...positive_tests,
		...negative_tests,
		report_result_summary('maxHeight', maxHeightResults)
	])

}
