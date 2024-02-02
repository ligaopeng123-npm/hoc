/** ********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @date: 2022/4/9 19:23
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import { RouteProps } from "react-router-dom";

type ChangeRouteTitle = {
    name?: string;
} & RouteProps;

export const changeRouteTitle = (routes: Array<ChangeRouteTitle>, baseName?: string, callBack?: (hash: string) => void) => {
    const hashChange = () => {
        if (routes?.length) {
            const routeEnum: any = {};
            if (routeEnum[location.hash]) {
                document.title = routeEnum[location.hash];
            } else {
                for (const route of routes) {
                    if (location.hash.replace('#', '') === route.path) {
                        routeEnum[location.hash] = route.name + (baseName ? `-${baseName}` : '');
                        document.title = routeEnum[location.hash];
                        break;
                    }
                }
            }
        }
        callBack && callBack(location.hash.replace('#', ''));
    }
    window.addEventListener('hashchange', hashChange);
}