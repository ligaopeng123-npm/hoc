import {ReactNode} from "react";

export type RrefetchRoute = {
    prefetchComponent?: any; // 预加载资源
    isVite?: boolean; // 是否使用vite加载
    loading?: boolean | ReactNode; // 是否使用加载状态
    component?: any; // pc端加载组件
    mComponent?: any; // 移动端加载组件
}
