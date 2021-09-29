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

export const RouteWithChildrenSubRoutes = (route: RouteProps & RrefetchRoute) => {
    return <Route
        path={route.path}
        exact={!!route.exact}
        component={route?.prefetchComponent || loadable(() => import(`@/${route.component}`))}
    />
};

export default RouteWithChildrenSubRoutes;