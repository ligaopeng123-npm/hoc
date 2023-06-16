import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

/**
 * 加载属性
 */
export type LoadingProps = {
    loading?: boolean | ReactNode; // 是否使用loading效果  false不使用 true使用默认的 也可传递组件
    loadingColor?: string; // 加载动画颜色
}
/**
 * 加载器
 */
export type LoaderProps = {
    isVite?: boolean; // 是否使用vite加载
}
export type RrefetchRoute = {
    prefetchComponent?: any; // 预加载资源
    component?: any; // pc端加载组件
    mComponent?: any; // 移动端加载组件
    hideInMenu?: boolean; // 是否隐藏改菜单
} & LoadingProps & LoaderProps;

/**
 * 暴露入口
 */
export type keepAliveType = 'auto' | 'force' | 'not';
export declare type RouteWithModuleRoutesProps = {
    routers: any[];
    onRouteChange?: (route: RouteProps & RrefetchRoute) => void;
    onLoadRouteError?: (route: RouteProps & RrefetchRoute) => void;
    /**
     * auto 默认缓存非hideInMenu菜单级别的路由
     * force 强制缓存所有页面
     * not 不缓存页面 默认为not
     */
    keepAlive?: keepAliveType;
    // 卸载缓存的的路由  传递过来的是路由地址
    uninstallKeepAliveKeys?: Array<string>;
    // 防止报错
    children?: any;
} & LoadingProps & LoaderProps;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'error-404': any
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'error-403': any
        }
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'loading-component': any
        }
    }
}
export type SingleRouterProps = {
    router?: RouteProps & RrefetchRoute;
    loadError?: string;
    isVite?: boolean;
    keepAlive?: keepAliveType;
} & LoadingProps;