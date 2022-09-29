/**********************************************************************
 *
 * @模块名称: RouteWithChildrenSubRoutes
 *
 * @模块用途: RouteWithChildrenSubRoutes  todo webpackPrefetch: true webpack5不好用 目前先废弃 后续研究
 *
 * @创建人: pgli
 *
 * @date: 2021/7/30 8:16
 *
 **********************************************************************/
import React from 'react';
import { RouteProps, useLocation, useParams } from "react-router-dom";
import { keepAliveType, RrefetchRoute } from "../typing";
import { addWebpackAliasPath, autoComponents } from "../addWebpackAliasPath";
import { PrefetchLazyComponent } from "../Prefetch";
import TopBarLoading from "../TopBarLoading";

/**
 * 异步加载资源 处理vite动态加载
 * @param imports
 * @param reg
 */
export const getAsyncPages = (imports: Record<string, () => Promise<any>>, reg: RegExp) => {
    return (Object.keys(imports)
        .map((key) => {
            const names = reg.exec(key);
            return Array.isArray(names) && names.length >= 2
                ? {[names[1]]: imports[key]}
                : undefined;
        })
        .filter((m) => !!m)
        .reduce((o, n) => ({...o, ...n}), []) as unknown) as Record<string, () => Promise<any>>;
}


export const RouteWithChildrenSubRoutes = (route: RouteProps & RrefetchRoute & { keepAlive?: keepAliveType }) => {
    /**
     * 实际路由
     */
    const _path = route?.path as string;
    /**
     * 查看缓存的状态
     */
    const keepAlive = route.keepAlive;
    /**
     * 当前路由state
     */
    const locationVal = useLocation();
    /**
     * 当前路由的params
     */
    const params = useParams();
    /**
     * 获取缓存组件
     */
    const getLazyComponent = () => {
        return React.lazy(() => route.prefetchComponent || import(`@pages/${addWebpackAliasPath(autoComponents(route))}`));
    }

    const checkKeepAlive = (): boolean => {
        switch (keepAlive) {
            case "not":
                return false;
            case "auto":
                return route.hideInMenu !== true;
            case "force":
                return true;
            default: {
                return false;
            }
        }
    }

    let LazyComponent;
    /**
     * 需要缓存
     */
    if (checkKeepAlive()) {
        if (!PrefetchLazyComponent.get(_path)) {
            PrefetchLazyComponent.add(_path, getLazyComponent(), {params: params, location: locationVal});
        }
        LazyComponent = PrefetchLazyComponent.get(_path);
    }
    // 不需要缓存
    else {
        LazyComponent = getLazyComponent()
    }

    return (
        <React.Suspense
            fallback={
                !route.loading
                    ? null
                    : <div>
                        {
                            route.loading === true
                                ? <TopBarLoading color={route.loadingColor}/>
                                : route.loading
                        }
                    </div>
            }>
            <LazyComponent/>
        </React.Suspense>
    )
};

export default RouteWithChildrenSubRoutes;
