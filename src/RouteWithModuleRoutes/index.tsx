/**********************************************************************
 *
 * @模块名称: RouteWithModuleRoutes
 *
 * @模块用途: RouteWithModuleRoutes
 *
 * @创建人: pgli
 *
 * @date: 2021/7/30 8:14
 *
 **********************************************************************/
import React, {useState, useEffect, Fragment} from 'react';
import {RouteProps, useLocation} from "react-router-dom";
import {memoized, MemoizedFn} from "@gaopeng123/utils.function";
import Prefetch from '../Prefetch';
import RouteWithChildrenSubRoutes from "../RouteWithChildrenSubRoutes";
import {RrefetchRoute} from "../typing";

/**
 * 递归匹配路由
 * @param routers
 * @param pathname
 */
const pathnameFromRouters: MemoizedFn = (pathname: string, routers: Array<any>, isVite?: boolean) => {
    if (routers) {
        for (let route of routers) {
            // @ts-ignore
            const {path} = route;
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
const cacheRouter = memoized(pathnameFromRouters);
/**
 * 暴露入口
 */
export declare type RouteWithModuleRoutesProps = {
    routers: any[];
    onRouteChange?: (route: RouteProps & RrefetchRoute) => void;
    isVite?: boolean; // 是否使用vite模式
}

const RouteWithModuleRoutes: React.FC<RouteWithModuleRoutesProps> = (props) => {
    const [router, setRouter] = useState<RouteProps & RrefetchRoute>();
    const {routers, onRouteChange} = props;
    const location = useLocation();
    const pathname = location.pathname;
    const isVite = props.isVite;
    useEffect(() => {
        if (pathname && pathname !== '/') {
            const route = cacheRouter(pathname, routers, isVite)[0];
            route && setRouter(route);
            route && onRouteChange && onRouteChange(route);
        }
    }, [pathname, routers]);

    return (
        <Fragment>
            {
                router ? <RouteWithChildrenSubRoutes {...router} isVite={isVite}/> : <span>页面加载错误</span>
            }
        </Fragment>
    )
};
export default RouteWithModuleRoutes;
