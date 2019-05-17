
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let insideResults = new ResultTracker();

	class positiveTest_low extends Test {
		constructor({ name, test }){
			super({
				name:`positive low inside ${name}`,
				test,
				size: [bp.small+1],
				mqMatch: true,
				localTracker: insideResults,
			})
		}
	}

	class positiveTest_high extends Test {
		constructor({ name, test }){
			super({
				name:`positive high inside ${name}`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: insideResults,
			})
		}
	}

	class negativeTest_low extends Test {
		constructor({ name, test }){
			super({
				name:`negative low inside ${name}`,
				size: [bp.small],
				mqMatch: false,
				test: test,
				localTracker: insideResults,
			})
		}
	}

	class negativeTest_high extends Test {
		constructor({ name, test }){
			super({
				name:`negative high inside ${name}`,
				size: [bp.large+1],
				mqMatch: false,
				test: test,
				localTracker: insideResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_low({
			name: `insideWidth test`,
			test: ()=> mq.insideWidth('small', 'large'),
		}),

		new positiveTest_low({
			name: `"small" (if)`,
			test: ()=> mq.inside('small', 'large'),
		}),

		new positiveTest_low({
			name: `${bp.small} (if)`,
			test: ()=> mq.inside(bp.large, bp.small),
		}),

		new positiveTest_low({
			name: `"small" (cb)`,
			test: ()=> {
				let result = false;
				mq.inside('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_low({
			name: `${bp.small} (cb)`,
			test: ()=> {
				let result = false;
				mq.inside(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `"large" (if)`,
			test: ()=> mq.inside('small', 'large'),
		}),

		new positiveTest_high({
			name: `${bp.large} (if)`,
			test: ()=> mq.inside(bp.large, bp.small),
		}),

		new positiveTest_high({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.inside('large', 'small', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new positiveTest_high({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.inside(bp.small, bp.large, ()=> {
					result = true;
				})
				return result;
			},
		}),
	];

	const negative_tests = [
		new negativeTest_high({
			name: `"large" (if)`,
			test: ()=> mq.inside('large', 'small'),
		}),

		new negativeTest_high({
			name: `${bp.large} (if)`,
			test: ()=> mq.inside(bp.small, bp.large),
		}),

		new negativeTest_high({
			name: `"large" (cb)`,
			test: ()=> {
				let result = false;
				mq.inside('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_high({
			name: `${bp.large} (cb)`,
			test: ()=> {
				let result = false;
				mq.inside(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `"small" (if)`,
			test: ()=> mq.inside('large', 'small'),
		}),

		new negativeTest_low({
			name: `${bp.small} (if)`,
			test: ()=> mq.inside(bp.small, bp.large),
		}),

		new negativeTest_low({
			name: `"small" (cb)`,
			test: ()=> {
				let result = false;
				mq.inside('small', 'large', ()=> {
					result = true;
				})
				return result;
			},
		}),

		new negativeTest_low({
			name: `${bp.small} (cb)`,
			test: ()=> {
				let result = false;
				mq.inside(bp.large, bp.small, ()=> {
					result = true;
				})
				return result;
			},
		}),
	]

	return sequence([
		apply_style('inside'),
		...positive_tests,
		...negative_tests,
		report_result_summary('inside', insideResults)
	])

}
