/**********************************************************************
 *
 * @模块名称: Prefetch
 *
 * @模块作用: 预加载策略  todo webpackPrefetch: true webpack5不好用 目前先废弃 后续研究
 *
 * @创建人: pgli
 *
 * @date: 2021/9/29 11:44
 *
 **********************************************************************/
import { isArray } from "@gaopeng123/utils.types";
import { addWebpackAliasPath, autoComponents } from "../addWebpackAliasPath";

/**
 * 预加载策略
 * @constructor
 */
const PrefetchFn = () => {
    // 保存预加载的资源
    let loaded: any = {};
    // @ts-ignore
    return (routers) => {
        // 提供批处理加载 当非数组时 转换成数组
        if (!isArray(routers)) {
            routers = [routers]
        }
        for (let route of routers) {
            // 将加载过的资源 绑定在loaded对象上， 如果已经预加载过 则不在加载
            if (route?.component && !loaded[route?.component]) {
                // 将已经加载的资源 绑定到prefetchComponent属性上 渲染时 如果该属性有值 则不在加载
                route.prefetchComponent = import(/*webpackPrefetch:true*/`@pages/${addWebpackAliasPath(autoComponents(route))}`);
                // 将加载的资源路径保存为真
                loaded[route.component] = true;
            }
        }
    }
};

export const Prefetch = PrefetchFn();
/**
 * 缓存组件管理
 * @constructor
 */
const PrefetchLazyComponentFn = () => {
    let Router_Lazy_Component: any = {};
    let currentRouter: string = '';
    const routerKey = (key: string) => {
        return `${key}-cache`;
    }
    return {
        add: (key: string, component: any) => {
            Router_Lazy_Component[key] = component;
        },
        addState: (key: string, routeParams: any) => {
            Router_Lazy_Component[routerKey(key)] = routeParams;
            currentRouter = key;
        },
        del: (key: string) => {
            delete Router_Lazy_Component[key];
            delete Router_Lazy_Component[routerKey(key)];
        },
        clear: () => {
            Router_Lazy_Component = {};
        },
        get: (key: string) => {
            return Router_Lazy_Component[key];
        },
        getCurrentRouter: () => {
            return currentRouter;
        },
        getState: () => {
            return Router_Lazy_Component[routerKey(currentRouter)]?.location || {}
        },
        getParams: () => {
            return Router_Lazy_Component[routerKey(currentRouter)]?.params || {}
        }
    }
}

export const PrefetchLazyComponent = PrefetchLazyComponentFn();

/**
 * 缓存组件管理
 * @constructor
 */
const LoadBarFn = () => {
    let LoadBar_Component: any = {};
    const LoadBar = {
        add: (key: string) => {
            LoadBar_Component[key] = Date.now();
        },
        check: (key: string) => {
            const _lastNow = LoadBar.get(key) || 0;
            const _now = Date.now();
            // 时间太短 不需要触发loading
            if (_now - _lastNow < 100) {
                LoadBar.add(key);
                return false;
            }
            LoadBar.add(key);
            return true;
        },
        get: (key: string) => {
            return LoadBar_Component[key];
        },
    }
    return LoadBar
}

export const LoadBar = LoadBarFn();