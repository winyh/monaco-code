import MonacoCode, { monaco } from './MonacoCode';

import pjson from '../../package.json';

const install = Vue => {
  if (install.installed) return;
  Vue.Component(MonacoCode);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install, MonacoCode, monaco };

export default { version: pjson.version, MonacoCode, monaco };
