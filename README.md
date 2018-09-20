# React-Configurable

`react-configurable` uses `React.Context` to allow easy access and use of application wide config values.

## Installation
```
npm install react-configurable --save
```
react-configurable requires React > 16

## Examples

### ConfigProvider

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

### ConfigEnhancer

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

### ConfigHide / ConfigShow

Also provided are simple approaches to showing and hiding components based on config

```jsx
import {ConfigHide} from 'react-configurable';

export default <ConfigHide mockHide><div>Should be hidden</div></ConfigHide>
```

If `mockHide` in the config is true, then the component is hidden.

One difference from `ConfigEnhancer` is that if an actual value is passed into a prop, it is used for an equality check instead of passing the value;

So in the following example, `react-configurable` will compare the config value of `mockHide` to the value passed into `ConfigHide`

```jsx
import {ConfigHide} from 'react-configurable';

// This will only be hidden if the config value of mockHide equals false
export default <ConfigHide mockHide={false}><div>Should be hidden</div></ConfigHide>
```
