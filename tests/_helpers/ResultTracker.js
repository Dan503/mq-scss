
export default class ResultTracker {
	constructor(){
		this.results = {
			pass: 0,
			fail: 0,
		}
	}

	pass(){
		this.results.pass++
	}

	fail(){
		this.results.fail++
	}
}

const totalsTracker = new ResultTracker();

export { totalsTracker, ResultTracker }
