
//helpers
import sequence from '../../tests/_helpers/sequence';
import report_result_summary from '../../tests/_helpers/report_result_summary';
import 'es6-object-assign/auto';
import 'es6-promise/auto';

////////////
// TESTS //
//////////

// Width based
import max from '../../tests/width-based/max/max';
import min from '../../tests/width-based/min/min';
import inside from '../../tests/width-based/inside/inside';
import outside from '../../tests/width-based/outside/outside';

//height based
import maxHeight from '../../tests/height-based/maxHeight/maxHeight';
import minHeight from '../../tests/height-based/minHeight/minHeight';
import insideHeight from '../../tests/height-based/insideHeight/insideHeight';
import outsideHeight from '../../tests/height-based/outsideHeight/outsideHeight';

// Ratio based
import ratio from '../../tests/ratio-based/ratio/ratio';
import minRatio from '../../tests/ratio-based/minRatio/minRatio';
import maxRatio from '../../tests/ratio-based/maxRatio/maxRatio';
import insideRatio from '../../tests/ratio-based/insideRatio/insideRatio';
import outsideRatio from '../../tests/ratio-based/outsideRatio/outsideRatio';

// Orientation tests
import portrait from '../../tests/orientation/portrait/portrait';
import landscape from '../../tests/orientation/landscape/landscape';

// reactTo test
import reactTo from '../../tests/reactTo';

window.onload = function(){
	sequence([
		max,
		min,
		inside,
		outside,
		maxHeight,
		minHeight,
		insideHeight,
		outsideHeight,
		ratio,
		minRatio,
		maxRatio,
		insideRatio,
		outsideRatio,
		portrait,
		landscape,
		reactTo,
		report_result_summary(),
	])
}
