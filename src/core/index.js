import MonacoCodeEditor from './MonacoCodeEditor';

import pjson from '../../package.json';

const install = Vue => {
  if (install.installed) return;
  Vue.component('MonacoCodeEditor', MonacoCodeEditor);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install, MonacoCodeEditor };

export default { install, version: pjson.version, MonacoCodeEditor };
