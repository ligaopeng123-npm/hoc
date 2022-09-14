import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

export type RrefetchRoute = {
    prefetchComponent?: any; // 预加载资源
    isVite?: boolean; // 是否使用vite加载
    loading?: boolean | ReactNode; // 是否使用加载状态
    component?: any; // pc端加载组件
    mComponent?: any; // 移动端加载组件
    hideInMenu?: boolean; // 是否隐藏改菜单
}

/**
 * 暴露入口
 */
export type keepAliveType = 'auto' | 'force' | 'not';
export declare type RouteWithModuleRoutesProps = {
    routers: any[];
    onRouteChange?: (route: RouteProps & RrefetchRoute) => void;
    isVite?: boolean; // 是否使用vite模式
    loading?: boolean | ReactNode; // 是否使用loading效果  false不使用 true使用默认的 也可传递组件
    /**
     * auto 默认缓存非hideInMenu菜单级别的路由
     * force 强制缓存所有页面
     * not 不缓存页面 默认为not
     */
    keepAlive?: keepAliveType;
    // 卸载缓存的的路由  传递过来的是路由地址
    uninstallKeepAliveKeys?: Array<string>;
}

export type SingleRouterProps = {
    router: RouteProps & RrefetchRoute;
    loading?: boolean | ReactNode;
    loadError?: string;
    isVite?: boolean;
    keepAlive?: keepAliveType;
}
