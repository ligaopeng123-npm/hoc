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
import {isArray} from "@gaopeng123/utils.types";
import {addWebpackAliasPath} from "../addWebpackAliasPath";

/**
 * 预加载策略
 * @constructor
 */
const Prefetch = () => {
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
                // 将已经加载的资源 绑定到prefetchComponent属性上
                // 渲染时 如果该属性有值 则不在加载
                route.prefetchComponent = import(/*webpackPrefetch:true*/`@pages/${addWebpackAliasPath(route.component)}`);
                // 将加载的资源路径保存为真
                loaded[route.component] = true;
            }
        }
    }
};

export default Prefetch();
