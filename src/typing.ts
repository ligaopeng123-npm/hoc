import {ReactNode} from "react";

export type RrefetchRoute = {
    prefetchComponent?: any; // 预加载资源
    isVite?: boolean; // 是否使用vite加载
    loading?: boolean | ReactNode; // 是否使用vite加载
    component?: any; // 是否使用vite加载
}
