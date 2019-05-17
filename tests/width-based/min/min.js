
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let minResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name:`positive min ${name}`,
				test,
				size: [bp.large+1],
				mqMatch: true,
				localTracker: minResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name:`negative min ${name}`,
				size: [bp.large],
				mqMatch: false,
				test: test,
				localTracker: minResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `minWidth test`,
			test: ()=> mq.minWidth('large'),
		}),

		new positiveTest({
			name: `"large" (if)`,
			test: ()=> mq.min('large'),
		}),

		new positiveTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.min(bp.large),
		}),

		new positiveTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.min('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.min(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `"large" (if)`,
			test: ()=> mq.min('large'),
		}),

		new negativeTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.min(bp.large),
		}),

		new negativeTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.min('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.min(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('min'),
		...positive_tests,
		...negative_tests,
		report_result_summary('min', minResults)
	])

}
