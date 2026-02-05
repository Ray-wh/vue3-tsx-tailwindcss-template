/**
 * 自定义指令集合
 * 分为全局指令和局部指令
 */
import focus from './focus';
import clickOutside from './click-outside';
import debounce from './debounce';
import throttle from './throttle';
import copy from './copy';

// 全局指令（自动注册到全局）
export const globalDirectives = {
  focus,
  clickOutside,
  debounce,
  throttle,
  copy,
};

// 局部指令（需要在组件中手动注册）
export const localDirectives = {
  // 可以添加只在特定组件中使用的指令
};

// 注册所有全局指令
export const registerGlobalDirectives = (app: any) => {
  Object.entries(globalDirectives).forEach(([name, directive]) => {
    app.directive(name, directive);
  });
};

export default {
  globalDirectives,
  localDirectives,
  registerGlobalDirectives,
};
