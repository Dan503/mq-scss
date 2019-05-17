
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let portraitResults = new ResultTracker();

	const test = ()=> mq.orientation('portrait');

	class positiveTest_square extends Test {
		constructor(){
			super({
				name:`positive square portrait orientation`,
				test,
				size: [bp.large],
				mqMatch: true,
				localTracker: portraitResults,
			})
		}
	}

	class positiveTest_portrait extends Test {
		constructor(){
			super({
				name:`positive portrait orientation`,
				test,
				size: [bp.large, bp.large+1],
				mqMatch: true,
				localTracker: portraitResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor(){
			super({
				name:`negative portrait orientation`,
				size: [bp.large+1, bp.large],
				mqMatch: false,
				test,
				localTracker: portraitResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest_square(),
		new positiveTest_portrait(),
	]

	const negative_tests = [
		new negativeTest(),
	];

	return sequence([
		apply_style('portrait'),
		...positive_tests,
		...negative_tests,
		report_result_summary('orientation portrait', portraitResults)
	])

}
