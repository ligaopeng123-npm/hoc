/**********************************************************************
 *
 * @模块名称: addWebpackAliasPath
 *
 * @模块用途: addWebpackAliasPath
 *
 * @date: 2022/2/16 14:35
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { RrefetchRoute } from "./typing";
import { isMobile } from "@gaopeng123/utils.types";

export const addWebpackAliasPath = (comPath: string): string => {
    if (comPath?.startsWith('/pages')) {
        return comPath.replace('/pages/', '');
    } else if (comPath?.startsWith('pages')) {
        return comPath.replace('pages/', '');
    } else if (comPath?.startsWith('/')) {
        return comPath.replace('/', '');
    } else {
        return comPath;
    }
}

/**
 * 移动端路由支持 双路由 双模块
 * @param route
 */
export const autoComponents = (route: RrefetchRoute) => {
    return isMobile() ? (route.mComponent || route.component) : route.component
}
