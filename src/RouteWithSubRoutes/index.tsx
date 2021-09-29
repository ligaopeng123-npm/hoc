/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index  高阶组件 拼接switch中的路由
 *
 * @创建人: pgli
 *
 * @date: 2021/8/2 18:20
 *
 **********************************************************************/
// @ts-ignore
import React from 'react';
import {RouteProps} from "react-router-dom";
import RouteWithChildrenSubRoutes from "../RouteWithChildrenSubRoutes";

export declare type RouteWithSubRoutesProps = {
    router: RouteProps;
}
const RouteWithSubRoutes = (props: RouteWithSubRoutesProps) => {
    // @ts-ignore
    const {router} = props;
    if (router.children) {
        const children = (router.children as Array<RouteProps>).map((item: RouteProps) => {
            return RouteWithChildrenSubRoutes(item);
        });
        return children;
    } else {
        return RouteWithChildrenSubRoutes(router);
    }
};
export default RouteWithSubRoutes;
