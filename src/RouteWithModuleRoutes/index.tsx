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
import React, { useState, useEffect } from 'react';
import { RouteProps, useLocation } from "react-router-dom";
import RouteWithChildrenSubRoutes from "../RouteWithChildrenSubRoutes";
import KeepAlive, { useAliveController, AliveScope } from 'react-activation';
import { RouteWithModuleRoutesProps, RrefetchRoute, SingleRouterProps } from "../typing";
import { cacheRouter } from "../addWebpackAliasPath";
import { PrefetchLazyComponent } from "../Prefetch";

/**
 * 缓存路由
 * @constructor
 */
const KeepAliveRouter = ({router, loading, isVite, keepAlive}: SingleRouterProps) => {
    return (
        <AliveScope>
            <KeepAlive when={keepAlive === 'auto' ? !router?.hideInMenu : true} id={`${router?.path}`}>
                <RouteWithChildrenSubRoutes {...router} loading={loading} isVite={isVite}/>
            </KeepAlive>
        </AliveScope>
    )
}

const RouteWithModuleRoutes: React.FC<RouteWithModuleRoutesProps> = (props) => {
    const {routers, onRouteChange, loading, isVite, keepAlive, uninstallKeepAliveKeys} = props;
    /**
     * 当前加载路由
     */
    const [router, setRouter] = useState<RouteProps & RrefetchRoute>();
    /**
     * 加载错误状态
     */
    const [loadError, setLoadError] = useState<any>(loading === true ? 'loading' : loading);
    const location = useLocation();
    /**
     * 获取参数
     */
    const pathname = location.pathname;
    /**
     * 缓存模式
     */
    const _keepAlive = keepAlive || 'not';

    useEffect(() => {
        if (pathname && pathname !== '/') {
            const route = cacheRouter(pathname, routers, isVite)[0];
            if (route) {
                setLoadError('');
                route && setRouter(route);
                route && onRouteChange && onRouteChange(route);
            } else {
                setLoadError('页面加载失败 404!');
            }
        }
    }, [pathname, routers]);
    /**
     * 缓存清理
     */
    const {drop} = useAliveController();
    /**
     * 监听卸载菜单 如果需要卸载 则清理缓存
     */
    useEffect(() => {
        if (uninstallKeepAliveKeys?.length) {
            for (const uninstallKeepAliveKey of uninstallKeepAliveKeys) {
                drop(uninstallKeepAliveKey);
                PrefetchLazyComponent.del(uninstallKeepAliveKey)
            }
        }
    }, [uninstallKeepAliveKeys]);

    return (
        <>
            {
                !router
                    ? <div>{loadError}</div>
                    : _keepAlive !== 'not'
                        ? <KeepAliveRouter
                            keepAlive={_keepAlive}
                            router={router} loading={loading} loadError={loadError} isVite={isVite}/>
                        : <RouteWithChildrenSubRoutes {...router} loading={loading} isVite={isVite}/>
            }
        </>
    )
};

export default RouteWithModuleRoutes;
