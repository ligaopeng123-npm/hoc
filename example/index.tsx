import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DynamicLoadScript, LoadingComponents, ErrorComponents, ErrorComponents403 } from '../packages/hoc/src/.';
import { useState } from "react";

const App = () => {
    const onLoad = () => {
        console.log(111)
    }
    const [example, setExample] = useState('DynamicLoadScript');
    const examples = ['DynamicLoadScript', 'loading-component', 'error-404', 'error-403'];
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{flex: 1,}}>
                {
                    examples.map((item) => {
                        return <div
                            style={{
                                cursor: 'pointer',
                                padding: 16,
                                color: '#0000ffc9'
                            }}
                            key={item}
                            onClick={() => {
                                setExample(item)
                            }}>{item}</div>
                    })
                }
            </div>
            <div style={{flex: 5,}}>
                {
                    (() => {
                        switch (example) {
                            case 'DynamicLoadScript':
                                return <DynamicLoadScript url={['./abc.js']} onLoad={onLoad}/>;
                            case 'loading-component':
                                return <loading-component></loading-component>;
                            case 'error-404':
                                return <error-404></error-404>;
                            case 'error-403':
                                return <error-403></error-403>;
                            default:
                                return null;
                        }
                    })()
                }
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
