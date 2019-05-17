// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import './_helpers/is_ie';
import debounce from 'debounce';
import { mq, bp } from './_helpers/mq';
import testBreakpoints from '../../tests/_helpers/breakpoints';
import { _$ } from './_helpers/_$selector';

import a_codeNumbers from '../_modules/a-codeNumbers/a-codeNumbers';
import m_revealer from '../_modules/m-revealer/m-revealer';

window.test = ()=>{
  const settings = {
    innerWidth: 1000,
    innerHeight: testBreakpoints.large,
  };

  window.open('/test-em.html', 'ems test', settings);
  window.open('/test-px.html', 'px test', settings)
}

//https://philipwalton.com/articles/loading-polyfills-only-when-needed/
if (browser_supports_all_features()) {
  // Browsers that support all features run `run_code()` immediately.
  run_code();
} else {
  console.log('Loading polyfills...')
  // All other browsers loads polyfills and then run `run_code()`.
  loadScript('assets/scripts/polyfills.js', run_code);
}

function run_code(){
  a_codeNumbers()
  m_revealer();
  run_demos();
}

function run_demos(){
  function toggler(selector, test){
    const _$elem = _$(selector);
    if (_$elem) {
      _$elem.onclick = function(e){
         e.preventDefault();
         if (test()) {
           this.classList.toggle('-active');
         }
       };
    }
  }

  _$('#testingBtn').onclick = window.test;

  const toggleActive = elem => elem.classList.toggle('-active');
  const toggleInactive = elem => elem.classList.toggle('-inactive');
  
  _$('.a-btn.-max').onclick = function(e){
    e.preventDefault();
  
    mq.max('medium', (screen_size)=>{
      toggleActive(this);
      console.log(screen_size);
    })
  };
  
  toggler('.a-btn.-maxIf', ()=> mq.max('medium'));
  toggler('.a-btn.-min', ()=> mq.min('medium'));
  toggler('.a-btn.-inside', ()=> mq.inside('medium', 'small'));
  toggler('.a-btn.-outside', ()=> mq.outside('medium', 'small'));
  
  const MQ_btn = state => ({
    active: () => mq.max('medium'),
    inactive: () => mq.min('medium'),
  }[state]());
  
  _$('.a-btn.-mqVar').onclick = function(e){
    e.preventDefault();
  
    if (MQ_btn('active')){
      toggleActive(this);
    }
  
    if (MQ_btn('inactive')){
      toggleInactive(this);
    }
  
  };
  
  toggler('.a-btn.-pxVal', ()=> mq.max(1000));
  toggler('.a-btn.-pxValMin', ()=> mq.min(1000));
  toggler('.a-btn.-bpVar', ()=> mq.min(bp.medium + 30));
  
  const _$resizeBtn = _$('.a-btn.-onResize');
  
  _$resizeBtn.onclick = (e) => e.preventDefault();
  
  function toggleBtn(){
    _$resizeBtn.classList.toggle('-active', mq.inside('medium', 'small'));
  };
  
  toggleBtn();
  window.onresize = debounce(toggleBtn, 200);
  
  toggler('.a-btn.-maxHeight', ()=> mq.maxHeight(600));
  toggler('.a-btn.-minHeight', ()=> mq.minHeight(600));
  toggler('.a-btn.-insideHeight', ()=> mq.insideHeight(800, 400));
  toggler('.a-btn.-outsideHeight', ()=> mq.outsideHeight(800, 400));
  toggler('.a-btn.-landscape', ()=> mq.orientation('landscape'));
  toggler('.a-btn.-portrait', ()=> mq.orientation('portrait'));
  toggler('.a-btn.-exactRatio', ()=> mq.ratio(1 / 2));
  toggler('.a-btn.-minRatio', ()=> mq.ratio('1 / 2'));
  toggler('.a-btn.-maxRatio', ()=> mq.ratio(1 / 2));
  toggler('.a-btn.-insideRatio', ()=> mq.insideRatio(1 / 2, 3 / 2));
  toggler('.a-btn.-insideRatio', ()=> mq.outsideRatio(1 / 2, 3 / 2));
  toggler('.a-btn.-maxRatioString', ()=> mq.maxRatio('1 / 2'));
  
  const _$btn = _$('.a-btn.-reactTo');
  
  mq.reactTo(()=> mq.inside(800, 900), (is_active, screen_size)=> {
    _$btn.classList.toggle('-active');
    console.log(is_active, screen_size)
  });
  
  _$btn.onclick = e => e.preventDefault();

}

function browser_supports_all_features() {
  return window.Promise && Object.assign && Array.from;
}

function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    throw new Error('Failed to load script ' + src);
  };
  document.head.appendChild(js);
}
