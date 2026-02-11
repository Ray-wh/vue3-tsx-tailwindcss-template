import type { App } from 'vue';
import Loading from './Loading';
import Empty from './Empty';


export const globalComponents = {
  AppLoading: Loading,
  AppEmpty: Empty,
};

export const registerGlobalComponents = (app: App) => {
  Object.entries(globalComponents).forEach(([name, component]) => {
    app.component(name, component);
  });
};

export default {
  globalComponents,
  registerGlobalComponents,
};
