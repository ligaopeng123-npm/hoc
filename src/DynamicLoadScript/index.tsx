/**
 * 高阶函数 动态加载静态资源
 */
import React, {useEffect, useState} from 'react';
import * as Script from 'react-load-script';

/**
 * 加载状态
 * @type {{}}
 */
export type DynamicLoadScriptProps = {
	url: string | Array<string>;
	onLoad?: () => any;
	onError?: (...args: any) => any;
	onCreate?: (...args: any) => any;
}

export const DynamicLoadScript: React.FC<DynamicLoadScriptProps> = (props) => {
	const {onLoad, onCreate, onError, url} = props;
	const [loadedBase, setLoadedBase] = useState<any>({});
	const Url = typeof url === 'string' ? [url] : url;
	// 当前加载完成的url
	const [currentLoadedUrl, setCurrentLoadedUrl] = useState<string>('');
	
	/**
	 * 根据加载此处 等加载完成后 执行onLoad
	 */
	useEffect(() => {
		for (let url of Url) {
			if (!loadedBase[url]) {
				return () => {
				}
			}
		}
		if (onLoad) onLoad();
		return () => {
		}
	}, [loadedBase]);
	
	const _onLoad = (_url: string) => {
		setCurrentLoadedUrl(_url);
	};
	
	useEffect(() => {
		if (currentLoadedUrl) {
			setLoadedBase(Object.assign({}, loadedBase, {[currentLoadedUrl]: true}));
		}
	}, [currentLoadedUrl]);
	
	return (
		<React.Fragment>
			{
				Url.map((_url: string, index: number) => {
					return <Script
						key={`Dynamic-LoadScript-${index}`}
						url={_url}
						onCreate={onCreate}
						onError={onError}
						onLoad={() => {
							_onLoad(_url);
						}}
					/>
				})
			}
		</React.Fragment>
	)
	
};