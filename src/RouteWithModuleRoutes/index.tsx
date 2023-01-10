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
import { keepAliveType, RouteWithModuleRoutesProps, RrefetchRoute, SingleRouterProps } from "../typing";
import { cacheRouter } from "../addWebpackAliasPath";
import { PrefetchLazyComponent } from "../Prefetch";
import TopBarLoading from '../TopBarLoading';
import "../Error/ErrorComponents";
import "../Error/LoadingComponents";

/**
 * 缓存路由
 * @constructor
 */
const KeepAliveRouter = ({router, loading, isVite, keepAlive, loadingColor}: SingleRouterProps) => {
    return (
        <AliveScope>
            {
                // when={keepAlive === 'auto' ? !router?.hideInMenu : true} 去掉when 走自动缓存配置
                keepAlive === 'force' || (keepAlive === 'auto' && !router?.hideInMenu)
                    ? <KeepAlive cacheKey={router?.path} id={router?.path}>
                        <RouteWithChildrenSubRoutes
                            keepAlive={keepAlive as keepAliveType}
                            {...router}
                            loading={loading}
                            isVite={isVite}
                            loadingColor={loadingColor}
                        />
                    </KeepAlive>
                    : <RouteWithChildrenSubRoutes
                        keepAlive={keepAlive as keepAliveType}
                        {...router}
                        loading={loading}
                        isVite={isVite}
                        loadingColor={loadingColor}
                    />
            }
        </AliveScope>
    )
}

const RouteWithModuleRoutes: React.FC<RouteWithModuleRoutesProps> = (props) => {
    const {routers, onRouteChange, loading, loadingColor, isVite, keepAlive, uninstallKeepAliveKeys} = props;
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
    const _keepAlive: keepAliveType = keepAlive || 'not';

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

    console.log('routers', routers?.length)

    return (
        <>
            {
                !router
                    ? <>
                        {
                            routers?.length
                                ? <error-404></error-404>
                                : <loading-component></loading-component>
                        }
                    </>
                    : <>
                        <TopBarLoading color={loadingColor} pathname={pathname}/>
                        <div attr-hoc={'hoc-main'}>
                            {
                                _keepAlive !== 'not'
                                    ? <KeepAliveRouter
                                        keepAlive={_keepAlive as keepAliveType}
                                        router={router}
                                        loading={loading}
                                        loadingColor={loadingColor}
                                        loadError={loadError}
                                        isVite={isVite}
                                    />
                                    : <RouteWithChildrenSubRoutes
                                        keepAlive={_keepAlive as keepAliveType}
                                        {...router}
                                        loading={loading}
                                        loadingColor={loadingColor}
                                        isVite={isVite}
                                    />
                            }
                        </div>
                    </>
            }
        </>
    )
};

export default RouteWithModuleRoutes;
