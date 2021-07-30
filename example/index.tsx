import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {DynamicLoadScript} from '../src/.';

const App = () => {
	const onLoad = () => {
		console.log(111)
	}
	return (
		<div>
			<DynamicLoadScript url={[]} onLoad={onLoad}/>
		</div>
	);
};

ReactDOM.render(<App/>, document.getElementById('root'));
