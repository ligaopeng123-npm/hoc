/**********************************************************************
 *
 * @模块名称: loadingComponents
 *
 * @模块作用: loadingComponents
 *
 * @创建人: ligm12
 *
 * @date: 2023/1/7 10:51 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export class LoadingComponents extends HTMLElement {
    shadow: any = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.shadow.innerHTML = this.template();
    }

    template() {
        const animation_duration = '1.8s'
        return `
            <style>
                .content {
                    min-height: 100px;
                }
                .loader {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 50px;
                  height: 10px;
                  background: var(--loader-color-2, #3498DB);
                  border-radius: 5px;
                  animation: load ${animation_duration} ease-in-out infinite; 
                }
                
                .loader:before, .loader:after {
                    position: absolute; 
                    display: block;
                    content: "";
                    animation: load ${animation_duration} ease-in-out infinite;
                    height: 10px;
                    border-radius: 5px;
                  }
                  .loader:before {
                    top: -20px;
                    left: 10px;
                    width: 40px;
                    background: var(--loader-color-1, #EF4836);
                  }
                  .loader:after {
                    bottom: -20px;
                    width: 35px;
                    background: var(--loader-color-3, #F5AB35); 
                  }
                
                @keyframes load {
                  0% {
                    transform: translateX(40px);
                  }
                  
                  50% {
                    transform: translateX(-30px);
                  }
                  100% {
                    transform: translateX(40px);
                  }
                }
            </style>
            <div class="content"><div class="loader"></div></div>
        `
    }
}

if (!customElements.get('loading-component')) {
    customElements.define('loading-component', LoadingComponents);
}