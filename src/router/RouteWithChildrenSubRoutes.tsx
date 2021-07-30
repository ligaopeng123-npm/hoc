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
import loadable from "@loadable/component";
import {Route, RouteProps} from "react-router-dom";

export const RouteWithChildrenSubRoutes = (route: RouteProps) => {
	return <Route
		path={route.path}
		exact={!!route.exact}
		component={loadable(() => import(`../${route.component}`))}
	/>
};

export default RouteWithChildrenSubRoutes;