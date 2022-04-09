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
import {createElement, useLayoutEffect, useState} from 'react';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom';

export const history = createBrowserHistory();

interface HistoryRouterProps {
    history: typeof history;
}

const HistoryRouter: React.FC<HistoryRouterProps> = ({history, children}) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => {
        history.listen(setState);
    }, [history]);

    return createElement(Router, Object.assign({children, navigator: history}, state));
};

export default HistoryRouter;
