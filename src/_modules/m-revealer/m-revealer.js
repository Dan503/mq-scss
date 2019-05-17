
import _$$ from '../../_scripts/_helpers/_$selector';
import ga from '../../_scripts/_helpers/ga';

const m = 'm-revealer';
const _m = '.'+m;
const hash = window.location.hash.replace('#','');

class Revealer {
	constructor(wrapperElem){
		this._$wrapper = wrapperElem;
		this._$trigger = this._$wrapper.querySelector(`${_m}__trigger`);
		this._$slider = this._$wrapper.querySelector(`${_m}__slider`);
		this._$content = this._$wrapper.querySelector(`${_m}__content`);
		this.isLoaded = false;
		this.id = this._$trigger.id;
		this.timer;
		this.relevantIDs = this.gather_ids();
		this.initialise();
	}

	initialise(){
		this.isOpen = this.check_url() || this._$wrapper.dataset.open;
		if (!this.isOpen) {
			this.close();
		} else if (hash === this.id) {
			this.wait_for_animation(500)
			.then(()=>{
				this._$trigger.scrollIntoView(true);
				return this.delay(500);
			}).then(()=>{
				this._$trigger.focus();
			})
		}
		this._$wrapper.classList.add('-set');
		this._$trigger.onclick = ()=> this.toggle();
		this.isLoaded = true;
	}

	open(){
		if (this.isLoaded) ga(this.id, 'open');
		this._$wrapper.classList.remove('-closed');
		this.wait_for_animation().then(()=>{
			this.isOpen = true;
			this.clear_max_height();
		});
	}

	close() {
		if (this.isLoaded) ga(this.id, 'close');
		this.set_max_height();
		this.delay(1).then(()=>{
			this._$wrapper.classList.add('-closed');
			this.isOpen = false;
		})
	}

	toggle(){
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	set_max_height(){
		const height = getComputedStyle(this._$content).height;
		this._$slider.style.maxHeight = height;
	}
	clear_max_height(){
		this._$slider.style.maxHeight = 'none';
	}

	delay(delay, timeout){
		return new Promise(resolve => {
			if (timeout) {
				timeout = setTimeout(resolve, delay);
			} else {
				setTimeout(resolve, delay);
			}
		})
	}

	wait_for_animation(extension = 0){
		clearTimeout(this.timer);
		this.isReady = false;
		return this.delay(500 + extension, this.timer).then(()=> {
			return Promise.resolve(()=> this.isReady = true);
		});
	}

	check_url(){
		const hasID = this.relevantIDs.some(id => id === hash);
		return hasID;
	}

	gather_ids(){
		const children = _$$(_m, this._$content);
		const child_trigger_ids = children.map(get_id);

		return [this.id, ...child_trigger_ids];

		function get_id (_$wrapper) {
			const _$trigger = _$wrapper.querySelector(`${_m}__trigger`);
			return _$trigger.id;
		}
	}

	get_parents_revelers(){
		let parents = [];
		let elem = this._$trigger;
		while (elem.classList) {
			if (elem.classList.contains(m)){
				parents.push(elem);
			}
			elem = elem.parentNode;
		}
		return parents;
	}
}

export default function(){
	const _$$revealers = [...document.querySelectorAll(_m)];
	_$$revealers.forEach(_$revealer => new Revealer(_$revealer));
}
