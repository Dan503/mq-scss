
import { totalsTracker } from './ResultTracker';
import windowResize from './windowResize';
import has_active_styling from './has_active_styling';
import mq_style from './mq_style';

export default class Test {
	constructor({
		size = false, // [ width, height ] (height optional)
		name = 'test name undefined',
		test = ()=>{},
		mqMatch = true,
		localTracker,
	}) {
		Object.assign(this, {size, name, test, mqMatch, localTracker });
		return ()=> this.run_code();
	}

	async run_code(){
		this.resize(this.size);
		const result = await this.run_test();
		this.report_results(result);
	}

	async run_test(){
		// console.log('delay start', this.name);
		return this.delay()
		.then(()=> {
			// console.log('delay end', this.name);
			this.mq_active = has_active_styling();
			return this.test()
		});
	}

	delay(delay = 100) {
		return new Promise((resolve)=> setTimeout(resolve, delay));
	}

	resize(size){
		if (size) windowResize(...size);
	}

	report_results(result){
		const isMatch = result && this.mqMatch && this.mq_active;
		const notMatch = !result && !this.mqMatch && !this.mq_active;
		const isIgnored = this.mqMatch === 'ignore';
		const successful = isIgnored ? result : (isMatch || notMatch);
		// Un-comment to debug
		// console.log({result, mqMatch: this.mqMatch, mq_active: this.mq_active })
		const logType = successful ? 'log' : 'error';
		console[logType](`${successful}: ${mq_style} ${this.name}`)
		this.add_test_result(successful);
	}

	add_test_result(is_a_pass){
		if (is_a_pass) {
			totalsTracker.pass();
			this.localTracker.pass();
		} else {
			totalsTracker.fail();
			this.localTracker.fail();
		}
	}
}
