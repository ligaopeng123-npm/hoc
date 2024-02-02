/**
 * 动态加载js文件
 */
export type { DynamicLoadScriptProps } from "./DynamicLoadScript";
export { DynamicLoadScript } from "./DynamicLoadScript";
/**
 * 路由相关高阶组件
 */
export type { RouteWithModuleRoutesProps } from "./typing";
export { RouteWithModuleRoutes } from "./RouteWithModuleRoutes";
export { RouteWithChildrenSubRoutes } from "./RouteWithChildrenSubRoutes";
export { TopBarLoading } from "./TopBarLoading";

export type { RouteWithSubRoutesProps as RouteWithSubRoutesProps } from "./RouteWithSubRoutes";
export { RouteWithSubRoutes } from "./RouteWithSubRoutes";

/**
 * 路由预加载
 */
export { Prefetch, PrefetchLazyComponent } from "./Prefetch";
/**
 * 路由外加载 包裹函数
 */
export { HistoryRouter } from "./HistoryRouter";
/**
 * 根据路由设置document title
 */
export { changeRouteTitle } from "./ChangeRouteTitle";
export type { RrefetchRoute } from "./typing";
/**
 * 包裹hooks
 */
export { useLocation } from "./hooks/useLocation";
/**
 * 包裹hooks
 */
export { useParams } from "./hooks/useParams";
/**
 * 钩子透出
 */
export { useActivate, useUnactivate, withActivation } from 'react-activation'
/**
 * 基础组件
 */
export { ErrorComponents } from "./Error/ErrorComponents";
export { ErrorComponents403 } from "./Error/ErrorComponents403";
export { LoadingComponents } from "./Error/LoadingComponents";
