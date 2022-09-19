/**********************************************************************
 *
 * @模块名称: useLocation
 *
 * @模块用途: useLocation  重写react-router-dom的值 处理卸载过程中缓存组件导致的属性不全
 *
 * @创建人: pgli
 *
 * @date: 2022/9/19 11:18
 *
 **********************************************************************/
import { useLocation as _useLocation } from "react-router-dom";
import { PrefetchLazyComponent } from "../Prefetch";

const useLocation = () => {
    const locationVal = _useLocation();
    const currentLocation: any = PrefetchLazyComponent.getState();
    return (locationVal.pathname === currentLocation?.pathname || !currentLocation?.pathname) ? locationVal : currentLocation;
};

export default useLocation;
