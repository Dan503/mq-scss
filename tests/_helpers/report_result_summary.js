
import mq_style from './mq_style';

import { totalsTracker } from './ResultTracker';

export default function report_result_summary (type = 'total', testTracker = totalsTracker){
	return () => Promise.resolve().then(()=>{
		const isTotal = type === 'total';
		const errorCount = testTracker.results.fail;
		const hasFails = errorCount > 0;

		let logType = hasFails ? 'error' : 'warn';

		console[logType]('\n', type, mq_style, 'results:', testTracker.results, ' \n ');

		if (isTotal) {
			const message = hasFails ? `🤬 ${errorCount} errors detected! 👺` : `😃 SUCCESS! 😁`;
			alert(message);
		}

	})
}
