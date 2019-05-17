
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let maxRatioResults = new ResultTracker();

	class positiveTest_exact extends Test {
		constructor({ name, test }){
			super({
				name:`positive exact maxRatio ${name}`,
				test,
				size: [ bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: maxRatioResults,
			})
		}
	}

	class positiveTest_thin extends Test {
		constructor({ name, test }){
			super({
				name:`positive thin maxRatio ${name}`,
				test,
				size: [ (bp.large - 2) / 2, bp.large],
				mqMatch: true,
				localTracker: maxRatioResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({ name, test }){
			super({
				name:`negative maxRatio ${name}`,
				size: [(bp.large + 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: maxRatioResults,
			})
		}
	}


	const positive_tests = [
		new positiveTest_exact({
			name: `string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new positiveTest_exact({
			name: `number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),
		new positiveTest_exact({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_exact({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_thin({
			name: `string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new positiveTest_thin({
			name: `number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),
		new positiveTest_thin({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new positiveTest_thin({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest({
			name: `string (if)`,
			test: ()=> mq.maxRatio(' 1 / 2 '),
		}),
		new negativeTest({
			name: `number (if)`,
			test: ()=> mq.maxRatio(0.5),
		}),

		new negativeTest({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio('1/2', ()=> {
					result = true;
				})
				return result;
			},
		}),
		new negativeTest({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.maxRatio(0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

	]

	return sequence([
		apply_style('maxRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('maxRatio', maxRatioResults)
	])

}
