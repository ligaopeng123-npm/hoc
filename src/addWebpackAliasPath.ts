/**********************************************************************
 *
 * @模块名称: addWebpackAliasPath
 *
 * @模块用途: addWebpackAliasPath
 *
 * @date: 2022/2/16 14:35
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { RrefetchRoute } from "./typing";
import { isMobile } from "@gaopeng123/utils.types";
import { memoized, MemoizedFn } from "@gaopeng123/utils.function";
import { Prefetch } from "./Prefetch";

export const addWebpackAliasPath = (comPath: string): string => {
    if (comPath?.startsWith('/pages')) {
        return comPath.replace('/pages/', '');
    } else if (comPath?.startsWith('pages')) {
        return comPath.replace('pages/', '');
    } else if (comPath?.startsWith('/')) {
        return comPath.replace('/', '');
    } else {
        return comPath;
    }
}

/**
 * 移动端路由支持 双路由 双模块
 * @param route
 */
export const autoComponents = (route: RrefetchRoute) => {
    return isMobile() ? (route.mComponent || route.component) : route.component
}

/**
 * 递归匹配路由
 * @param routers
 * @param pathname
 */
const pathnameFromRouters: MemoizedFn = (pathname: string, routers: Array<any>, isVite?: boolean) => {
    if (routers) {
        for (let route of routers) {
            // @ts-ignore
            const { path } = route;
            // @ts-ignore
            const children = route?.children || route?.routes;
            if (path === pathname) {
                /**
                 * 预加载策略 将同级路由和当前子级路由全部加载
                 */
                !isVite && Prefetch(routers.filter((r) => route !== r).concat(children || []));
                return route;
            } else {
                const state: any = pathnameFromRouters(pathname, children, isVite);
                if (state) return state;
            }
        }
    }
};

/**
 * 缓存路由
 */
export const cacheRouter = memoized(pathnameFromRouters);
