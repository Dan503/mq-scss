
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let outsideRatioResults = new ResultTracker();

	class positiveTest_max extends Test {
		constructor({ name, test }){
			super({
				name:`positive max outsideRatio ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: outsideRatioResults,
			})
		}
	}

	class positiveTest_min extends Test {
		constructor({ name, test }){
			super({
				name:`positive min outsideRatio ${name}`,
				test,
				size: [bp.large / 2, bp.large],
				mqMatch: true,
				localTracker: outsideRatioResults,
			})
		}
	}

	class negativeTest_max extends Test {
		constructor({ name, test }){
			super({
				name:`negative max outsideRatio ${name}`,
				size: [bp.large - 1, bp.large],
				mqMatch: false,
				test: test,
				localTracker: outsideRatioResults,
			})
		}
	}

	class negativeTest_min extends Test {
		constructor({ name, test }){
			super({
				name:`negative min outsideRatio ${name}`,
				size: [(bp.large + 2) / 2, bp.large],
				mqMatch: false,
				test: test,
				localTracker: outsideRatioResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_max({
			name: `string (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `number (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new positiveTest_max({
			name: `mixed (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_max({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_max({
			name: `mixed (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `string (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `number (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new positiveTest_min({
			name: `mixed (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new positiveTest_min({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_min({
			name: `mixed (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_max({
			name: `string (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `number (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new negativeTest_max({
			name: `mixed (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_max({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_max({
			name: `mixed (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `string (if)`,
			test: ()=> mq.outsideRatio('1/1', ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `number (if)`,
			test: ()=> mq.outsideRatio(1, 0.5),
		}),

		new negativeTest_min({
			name: `mixed (if)`,
			test: ()=> mq.outsideRatio(1, ' 1 / 2 '),
		}),

		new negativeTest_min({
			name: `string (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', ' 1 / 2 ', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `number (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio(1, 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_min({
			name: `mixed (cb)`,
			test: ()=> {
				let result = false;
				mq.outsideRatio('1/1', 0.5, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('outsideRatio'),
		...positive_tests,
		...negative_tests,
		report_result_summary('outsideRatio', outsideRatioResults)
	])

}
