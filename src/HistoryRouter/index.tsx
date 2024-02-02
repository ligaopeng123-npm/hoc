/**********************************************************************
 *
 * @模块名称: HistoryRouter
 *
 * @模块用途: HistoryRouter  包裹路由 可使在react-router v6 路由外跳转
 *
 * @创建人: pgli
 *
 * @date: 2022/4/9 19:08
 *
 **********************************************************************/
import { createElement, PropsWithChildren, useLayoutEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

interface HistoryRouterProps {
    history: typeof history;
}

export const HistoryRouter:React.FC<PropsWithChildren<HistoryRouterProps>> = ({history, children}) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => {
        // @ts-ignore
        history.listen(setState);
    }, [history]);

    // @ts-ignore
    return createElement(Router, Object.assign({children, navigator: history}, state));
};