/**********************************************************************
 *
 * @模块名称: addWebpackAliasPath
 *
 * @模块用途: addWebpackAliasPath
 *
 * @date: 2022/2/16 14:35
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const addWebpackAliasPath = (comPath: string): string => {
    if (comPath?.startsWith('/pages')) {
        return /* webpackPrefetch: true */ comPath.replace('/pages/', '');
    } else if (comPath?.startsWith('pages')) {
        return /* webpackPrefetch: true */ comPath.replace('pages/', '');
    } else if (comPath?.startsWith('/')) {
        return /* webpackPrefetch: true */ comPath.replace('/', '');
    } else {
        return /* webpackPrefetch: true */ comPath;
    }
}
