
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let insideHeightResults = new ResultTracker();

	class positiveTest_low extends Test {
		constructor({ name, test }){
			super({
				name:`positive low insideHeight ${name}`,
				test,
				size: [bp.small, bp.small+1],
				mqMatch: true,
				localTracker: insideHeightResults,
			})
		}
	}

	class positiveTest_high extends Test {
		constructor({ name, test }){
			super({
				name:`positive high insideHeight ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: insideHeightResults,
			})
		}
	}

	class negativeTest_low extends Test {
		constructor({ name, test }){
			super({
				name:`negative low insideHeight ${name}`,
				size: [bp.small],
				mqMatch: false,
				test: test,
				localTracker: insideHeightResults,
			})
		}
	}

	class negativeTest_high extends Test {
		constructor({ name, test }){
			super({
				name:`negative high insideHeight ${name}`,
				size: [bp.large, bp.large+1],
				mqMatch: false,
				test: test,
				localTracker: insideHeightResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_low({
			name: `"small" (if)`,
			test: ()=> mq.insideHeight('small', 'large'),
		}),

		new positiveTest_low({
			name: `${bp.small} (if)`,
			test: ()=> mq.insideHeight(bp.large, bp.small),
		}),

		new positiveTest_low({
			name: `"small" (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_low({
			name: `${bp.small} (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `"large" matches (if)`,
			test: ()=> mq.insideHeight('small', 'large'),
		}),

		new positiveTest_high({
			name: `${bp.large} matches (if)`,
			test: ()=> mq.insideHeight(bp.large, bp.small),
		}),

		new positiveTest_high({
			name: `"large" matches (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `${bp.large} matches (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_high({
			name: `"large" (if)`,
			test: ()=> mq.insideHeight('large', 'small'),
		}),

		new negativeTest_high({
			name: `${bp.large} (if)`,
			test: ()=> mq.insideHeight(bp.small, bp.large),
		}),

		new negativeTest_high({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_high({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `"small" (if)`,
			test: ()=> mq.insideHeight('large', 'small'),
		}),

		new negativeTest_low({
			name: `${bp.small} (if)`,
			test: ()=> mq.insideHeight(bp.small, bp.large),
		}),

		new negativeTest_low({
			name: `"small" (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `${bp.small} (cb)`,
			test: ()=> {
				let result = false;
				mq.insideHeight(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('insideHeight'),
		...positive_tests,
		...negative_tests,
		report_result_summary('insideHeight', insideHeightResults)
	])

}
