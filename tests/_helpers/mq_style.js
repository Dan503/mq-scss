
const using_ems = window.location.pathname.indexOf('em') > 1;

const mq_style = using_ems ? 'em' : 'px';

export default mq_style;

export { using_ems, mq_style }
