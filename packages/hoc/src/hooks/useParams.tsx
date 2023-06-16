/**********************************************************************
 *
 * @模块名称: useParams
 *
 * @模块用途: useParams 重写react-router-dom的值 处理卸载过程中缓存组件导致的属性不全
 *
 * @创建人: pgli
 *
 * @date: 2022/9/19 11:18
 *
 **********************************************************************/
import { useParams as _useParams, useLocation as _useLocation } from "react-router-dom";
import { PrefetchLazyComponent } from "../Prefetch";

const useParams = () => {
    const locationVal = _useLocation();
    const currentLocation: any = PrefetchLazyComponent.getState();
    const params = _useParams();
    return (locationVal.pathname === currentLocation?.pathname || !currentLocation?.pathname) ? params : PrefetchLazyComponent.getParams()
};

export default useParams;
