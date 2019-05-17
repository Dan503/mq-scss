
const isString = string => typeof string === 'string';
const _$ = (selector, _$refElem = document) => isString(selector) ? _$refElem.querySelector(selector) : selector;
const _$$ = (selector, _$refElem = document) => isString(selector) ? [..._$refElem.querySelectorAll(selector)] : selector;

export default _$$;
export { _$$, _$ }
