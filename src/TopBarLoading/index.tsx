/** ********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @date: 2022/9/28 15:31
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import LoadingBar, { IProps, LoadingBarRef } from "react-top-loading-bar";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { LoadBar } from "../Prefetch";

/**
 *
 * @param props
 * @constructor
 */
type TopLoadingBarRef = {
    close: () => void;
} & LoadingBarRef;

const TopBarLoading = forwardRef<TopLoadingBarRef, IProps & { pathname?: string }>((props, ref) => {
    /**
     * 头部进度条 当dom结构被渲染 则去掉滚动条
     */
    const barRef = useRef<any>();

    useEffect(() => {
        if (!props.pathname || !LoadBar.check(props.pathname)) {
            return () => {

            }
        }
        barRef?.current?.continuousStart(0);
        let timer: any;
        const checkLoaded = () => {
            const hocMain = document.querySelector(`div[attr-hoc="hoc-main"]`);
            if (hocMain?.firstChild) {
                barRef?.current?.complete();
                return true;
            }
            return false;
        }
        const checkLoop = (loopTimer: number) => {
            const flag = checkLoaded();
            if (!flag) {
                timer = setTimeout(() => {
                    if (loopTimer < 10) {
                        checkLoop(++loopTimer);
                    } else {
                        clearTimeout(timer);
                    }
                }, 200);
            }
        }
        checkLoop(0);
        return () => {
            clearTimeout(timer);
        }
    }, [props.pathname]);

    useImperativeHandle(ref, () => ({
        continuousStart(startingValue?: number, refreshRate: number = 1000) {
            barRef?.current?.staticStart(startingValue, refreshRate);
        },
        staticStart(startingValue?: number) {
            barRef?.current?.staticStart(startingValue);
        },
        complete() {
            barRef?.current?.complete();
        },
        close() {
            barRef?.current?.complete();
        }
    }));

    return (
        <LoadingBar
            ref={barRef}
            progress={0}
            transitionTime={100}
            waitingTime={10}
            shadow={false}
            {...props}
            color={props.color || '#28b485'}/>
    )
})

export default TopBarLoading;
