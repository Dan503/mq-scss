
'use strict';

//npm imports
import $ from 'jquery';
import PubSub from 'pubsub-js';

//module imports
//import { example } from 'example/example';

const //hooks
	_module =  $('.JS-tabs'),
	_content = $('.JS-tabs__content'),
	_triggers = $('.JS-tabs__trigger');

const //classes
	active_ = '-active';

//module functionality
class tabs {
	constructor(elem){
		const This = this;
		this.elem = elem;
		this.$elem = $(elem);
		this.$triggers = this.$elem.find(_triggers);
		this.$content = this.$elem.find(_content);
		this.is_defaultSwitcher = this.$elem.is('#JS-tabs__defaultSelector');

		this.$triggers.click(function(e){
			e.preventDefault();
			This.switchTab($(this));
		});

		if (typeof window.localStorage.activeTab !== 'undefined'){
			this.switchTab(window.localStorage.activeTab);
		} else {
			this.switchTab(0);
		}

		if (!this.is_defaultSwitcher){
			PubSub.subscribe('defaultSwitch', (msg,index)=>{
				this.switchTab(index);
			})
		}
	}

	//Switches to the defined tab
	switchTab(tab){

		if ($.isNumeric(tab)){
			tab = this.$triggers.eq(tab);
		}

		const pos = tab.parent().index();


		this.$triggers.filter('.'+active_).removeClass(active_);
		tab.addClass(active_);

		this.$content.hide();
		this.$content.eq(pos).show();

		if (this.is_defaultSwitcher){
			window.localStorage.activeTab = pos;
			PubSub.publish('defaultSwitch', pos);
		}
	}
}

//This function is called on page load unless the name of this file starts with an underscore
export default function() {
	_module.each(function(e){
		new tabs(this);
	})
}
