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
import { RouteProps } from "react-router-dom";
import { RrefetchRoute } from "../typing";
import { addWebpackAliasPath, autoComponents } from "../addWebpackAliasPath";
import { PrefetchLazyComponent } from "../Prefetch";

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

export const RouteWithChildrenSubRoutes = (route: RouteProps & RrefetchRoute) => {
    const _path = route?.path as string;
    if (!PrefetchLazyComponent.get(_path)) {
        PrefetchLazyComponent.add(_path, React.lazy(() => route.prefetchComponent || import(`@pages/${addWebpackAliasPath(autoComponents(route))}`)));
    }
    const LazyComponent = PrefetchLazyComponent.get(_path);
    return (
        <React.Suspense
            fallback={
                !route.loading
                    ? null
                    : <div>
                        {
                            route.loading === true
                                ? 'loading...'
                                : route.loading
                        }
                    </div>
            }>
            <LazyComponent/>
        </React.Suspense>
    )
};

export default RouteWithChildrenSubRoutes;
