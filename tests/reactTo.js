
import Test from './_helpers/Test';
import bp from './_helpers/breakpoints';
import mq from './_helpers/mq';
import report_result_summary from './_helpers/report_result_summary';
import sequence from './_helpers/sequence';
import ResultTracker from './_helpers/ResultTracker';
import { screenSize } from '../_common';

import resize from './_helpers/windowResize';

export default function(){

	let reactValue = { isActive: false, isEqual: ()=> false, screen_size: ()=> undefined };
	let hasReacted = false;
	let allowReactions = false;

	mq.reactTo(()=> mq.max(bp.large), (isActive, screen_size)=> {
		if (allowReactions) {
			hasReacted = true;
			reactValue = {
				isActive,
				isEqual: ()=> isActive === mq.max(bp.large),
				screen_size: ()=> JSON.stringify(screenSize()) === JSON.stringify(screen_size)
			}
		}
	});

	const initialState = ()=> new Promise((resolve)=> {
		resize(bp.large + 1);
		allowReactions = true;
		resolve();
	});

	const delay = (timer = 100) => new Promise(resolve => setTimeout(resolve, timer));

	let reactResults = new ResultTracker();

	class positiveTest extends Test {
		constructor({name, test}){
			super({
				name: `positive reactTo ${name}`,
				test,
				size: [bp.large],
				mqMatch: 'ignore',
				localTracker: reactResults,
			})
		}
	}

	class negativeTest extends Test {
		constructor({name, test}){
			super({
				name:`negative reactTo ${name}`,
				test,
				size: [bp.large+1],
				mqMatch: 'ignore',
				localTracker: reactResults,
			})
		}
	}

	const positiveTests = [
		new positiveTest({
			name:`activation`,
			test: ()=> reactValue.isActive,
		}),
		new positiveTest({
			name:`match`,
			test: ()=> reactValue.isEqual(),
		}),
		new positiveTest({
			name:`screen-size`,
			test: ()=> reactValue.screen_size(),
		}),
		new positiveTest({
			name:`screen-size format regex`,
			test: ()=> {
				const size = screenSize();
				const string = JSON.stringify(size);
				const regex = /{"width":([0-9]*),"height":([0-9]*),"orientation":"(portrait|landscape)","ratio":{"number":([0-9]),"string":"([0-9]) \/ ([0-9])"}}/;
				return regex.test(string);
			},
		}),
	];

	const negativeTests = [
		new negativeTest({
			name:`activation`,
			test: ()=> !reactValue.isActive && hasReacted,
		}),
		new negativeTest({
			name:`match`,
			test: ()=> reactValue.isEqual() && hasReacted,
		}),
	];

	return sequence([
		initialState,
		delay,
		...positiveTests,
		...negativeTests,
		report_result_summary('reactTo', reactResults),
		()=> Promise.resolve(()=> allowReactions = false),
	])

}
