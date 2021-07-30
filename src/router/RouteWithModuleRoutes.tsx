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
import React, {useState, useEffect} from 'react';
import RouteWithChildrenSubRoutes from "./RouteWithChildrenSubRoutes";
import {RouteComponentProps, RouteProps, RouterProps, withRouter} from "react-router-dom";
import {memoized, MemoizedFn} from "@gaopeng123/utils";

/**
 * 递归匹配路由
 * @param routers
 * @param pathname
 */
const pathnameFromRouters: MemoizedFn = (pathname: string, routers: Array<any>) => {
	if (routers) {
		for (let route of routers) {
			const {path, children} = route;
			if (path === pathname) {
				return route;
			} else {
				const state: any = pathnameFromRouters(pathname, children);
				if (state) return state;
			}
		}
	}
};

/**
 * 缓存路由
 */
const cacheRouter = memoized(pathnameFromRouters);

export declare type RouteWithModuleRoutesProps = {
	routers: RouterProps;
	onRouteChange?: (route: RouteProps) => void;
}

const RouteWithModuleRoutes = (props: RouteWithModuleRoutesProps & RouteComponentProps) => {
	const [router, setRouter] = useState<RouteProps>();
	const {routers, onRouteChange} = props;
	const pathname = props.history.location.pathname;
	useEffect(() => {
		if (pathname && pathname !== '/') {
			const route = cacheRouter(pathname, routers)[0];
			route && setRouter(route);
			route && onRouteChange && onRouteChange(route);
		}
	}, [pathname, routers]);
	
	
	return (
		<React.Suspense fallback={<div>loading...</div>}>
			{
				router ? <RouteWithChildrenSubRoutes {...router}/> : <span>页面加载错误</span>
			}
		</React.Suspense>
	)
};

export default withRouter(RouteWithModuleRoutes);