
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let insideRatioResults = new ResultTracker();

	class positiveTest_max extends Test {
		constructor({ name, test }){
			super({
				name:`positive max insideRatio ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: insideRatioResults,
			})
		}
	}

	class positiveTest_min extends Test {
		constructor({ name, test }){
			super({
				name:`positive min insideRatio ${name}`,
				test,
				size: [bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: insideRatioResults,
			})
		}
	}

	class negativeTest_max extends Test {
		constructor({ name, test }){
			super({
				name:`negative max insideRatio ${name}`,
				size: [bp.large + 1, bp.large],
				mqMatch: false,
				test: test,
				localTracker: insideRatioResults,
			})
		}
	}

	class negativeTest_min extends Test {
		constructor({ name, test }){
			super({
				name:`negative min insideRatio ${name}`,
				size: [(bp.large - 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: insideRatioResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_max({
			name: `string thin (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `number thin (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new positiveTest_max({
			name: `mixed thin (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `string wide (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `number wide (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new positiveTest_min({
			name: `mixed wide (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_max({
			name: `string thin (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `number thin (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new negativeTest_max({
			name: `mixed thin (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `string thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `number thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `mixed thin (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `string wide (if)`,
			test: ()=> mq.insideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `number wide (if)`,
			test: ()=> mq.insideRatio(1, 0.5),
		}),

		new negativeTest_min({
			name: `mixed wide (if)`,
			test: ()=> mq.insideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `string wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `number wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `mixed wide (cb)`,
			test: ()=> {
				let result = false;
				mq.insideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('insideRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('insideRatio', insideRatioResults)
	])

}
