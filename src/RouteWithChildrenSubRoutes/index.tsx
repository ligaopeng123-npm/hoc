/**********************************************************************
 *
 * @模块名称: RouteWithChildrenSubRoutes
 *
 * @模块用途: RouteWithChildrenSubRoutes
 *
 * @创建人: pgli
 *
 * @date: 2021/7/30 8:16
 *
 **********************************************************************/
import React from 'react';
// @ts-ignore
import loadable from "@loadable/component";
import {Route, RouteProps} from "react-router-dom";
import {RrefetchRoute} from "../typing";

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
    const isVite = route.isVite;
    return <Route
        path={route.path}
        exact={!!route.exact}
        // @ts-ignore
        component={route?.prefetchComponent || loadable(() => isVite ? import(/* @vite-ignore */ `../../${route.component}`) : import(`@/${route.component}`))}
    />
};

export default RouteWithChildrenSubRoutes;
