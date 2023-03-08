/**********************************************************************
 *
 * @模块名称: ErrorComponents403
 *
 * @模块作用: ErrorComponents403
 *
 * @创建人: pgli
 *
 * @date: 2023/3/8 4:23 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import ErrorComponents from "./ErrorComponents";

class ErrorComponents403 extends ErrorComponents {
    /**
     * 错误内容
     */
    getContent() {
        return `
            <h1>403</h1>
            <h2>抱歉，您无权访问此页面！</h2>
            <p>
                Sorry, you are not authorized to access this page.
                How you got here is a mystery. But you can click the button below
                to go back to the homepage.
            </p>
        `
    }
}

if (!customElements.get('error-403')) {
    customElements.define('error-403', ErrorComponents403);
}

export default ErrorComponents403;