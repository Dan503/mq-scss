
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let maxResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({ name, test }){
			super({
				name:`positive max ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: maxResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name:`negative max ${name}`,
				size: [bp.large+1],
				mqMatch: false,
				test: test,
				localTracker: maxResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest({
			name: `maxWidth test`,
			test: ()=> mq.maxWidth('large'),
		}),

		new positiveTest({
			name: `"large" (if)`,
			test: ()=> mq.max('large'),
		}),

		new positiveTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.max(bp.large),
		}),

		new positiveTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `"large" (if)`,
			test: ()=> mq.max('large'),
		}),

		new negativeTest({
			name: `${bp.large} (if)`,
			test: ()=> mq.max(bp.large),
		}),

		new negativeTest({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.max('large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.max(bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('max'),
		...positive_tests,
		...negative_tests,
		report_result_summary('max', maxResults)
	])

}
