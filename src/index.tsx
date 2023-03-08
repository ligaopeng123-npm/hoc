/**
 * 动态加载js文件
 */
export type { DynamicLoadScriptProps } from "./DynamicLoadScript";
export { default as DynamicLoadScript } from "./DynamicLoadScript";
/**
 * 路由相关高阶组件
 */
export type { RouteWithModuleRoutesProps } from "./typing";
export { default as RouteWithModuleRoutes } from "./RouteWithModuleRoutes";
export { default as RouteWithChildrenSubRoutes } from "./RouteWithChildrenSubRoutes";
export { default as TopBarLoading } from "./TopBarLoading";

export type { RouteWithSubRoutesProps as RouteWithSubRoutesProps } from "./RouteWithSubRoutes";
export { default as RouteWithSubRoutes } from "./RouteWithSubRoutes";

/**
 * 路由预加载
 */
export { default as Prefetch, PrefetchLazyComponent } from "./Prefetch";
/**
 * 路由外加载 包裹函数
 */
export { default as HistoryRouter } from "./HistoryRouter";
/**
 * 根据路由设置document title
 */
export { default as changeRouteTitle } from "./ChangeRouteTitle";
export type { RrefetchRoute } from "./typing";
/**
 * 包裹hooks
 */
export { default as useLocation } from "./hooks/useLocation";
/**
 * 包裹hooks
 */
export { default as useParams } from "./hooks/useParams";
/**
 * 钩子透出
 */
export { useActivate, useUnactivate, withActivation } from 'react-activation'
/**
 * 基础组件
 */
export { default as ErrorComponents } from "./Error/ErrorComponents";
export { default as ErrorComponents403 } from "./Error/ErrorComponents403";
export { default as LoadingComponents } from "./Error/LoadingComponents";
