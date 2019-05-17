
import Test from '../../_helpers/Test';
import bp from '../../_helpers/breakpoints';
import mq from '../../_helpers/mq';
import report_result_summary from '../../_helpers/report_result_summary';
import sequence from '../../_helpers/sequence';
import ResultTracker from '../../_helpers/ResultTracker';
import apply_style from '../../_helpers/apply_style';

export default function(){

	let landscapeResults = new ResultTracker();

	const test = ()=> mq.orientation('landscape');

	class positiveTest extends Test {
		constructor(){
			super({
				name:`positive landscape orientation`,
				test,
				size: [bp.large+1, bp.large],
				mqMatch: true,
				localTracker: landscapeResults,
			})
		}
	}

	class negativeTest_square extends Test {
		constructor(){
			super({
				name:`negative square landscape orientation`,
				test,
				size: [bp.large],
				mqMatch: false,
				localTracker: landscapeResults,
			})
		}
	}

	class negativeTest_landscape extends Test {
		constructor(){
			super({
				name:`negative landscape orientation`,
				size: [bp.large, bp.large+1],
				mqMatch: false,
				test,
				localTracker: landscapeResults,
			})
		}
	}

	const positive_tests = [
		new positiveTest(),
	]

	const negative_tests = [
		new negativeTest_square(),
		new negativeTest_landscape(),
	];

	return sequence([
		apply_style('landscape'),
		...positive_tests,
		...negative_tests,
		report_result_summary('orientation landscape', landscapeResults)
	])

}
