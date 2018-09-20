# React-Configurable

## Installation
react-configurable requires React > 16

## Examples

Usage requires the application to be wrapped in a `ConfigProvider` component

```jsx
import {ConfigProvider} from 'react-configurable';

const config = {
    mockValue: 'value1',
    nested: {
        mockNestedValue: 'value3',
    },
    mockHide: true,
    mockHide2: 'value2'
}

class ConfigExample extends React.Component {
    render() {
        return <ConfigProvider config={config}>
                    <App />
               <ConfigProvider>;
    }
}

ReactDOM.render(<ConfigExample />, document.getElementById('container'));
```

Once the application is wrapper in `ConfigProvider`, values can be passed through `ConfigEnhancer` using prop keys

```jsx
import {ConfigEnhancer} from 'react-configurable';

const Example = ({mockValue}) => <div>{mockValue}</div>;

// Pass values to Example through ConfigEnhancer
export default <ConfigEnhancer mockValue><Example /></ConfigEnhancer>
```

If the config has nested values, pass the dot notated path to the prop key

```jsx
import {ConfigEnhancer} from 'react-configurable';

const Example = ({mockValue}) => <div>{mockValue}</div>;

// Pass values to Example through ConfigEnhancer
export default <ConfigEnhancer mockValue="nested.mockNestedValue"><Example /></ConfigEnhancer>
```
