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
import {RouteProps} from "react-router";

type ChangeRouteTitle = {
    name?: string;
} & RouteProps;
const changeRouteTitle = (routes: Array<ChangeRouteTitle>, baseName?: string) => {
    if (routes?.length) {
        const routeEnum: any = {};
        const hashChange = () => {
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
        window.addEventListener('hashchange', hashChange);
    }
}

export default changeRouteTitle;
