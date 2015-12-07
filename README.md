# react-native-web-container
A wrapper around the React Native WebView to add autoHeight and the ability to sanitize html using [sanitize-html](https://github.com/punkave/sanitize-html)
## Installation
> npm install --save react-native-web-container

## Usage

### Example
```javascript
import WebContainer from 'react-native-web-container';

class MyWebView extends React.Component {
  render() {
    let html = '';

    return (
      <WebContainer
        style={{flex: 1}}
        html={html}
        makeSafe={true}
        autoHeight={true} />
    );
  }
}
```
### Properties
| option | values |
|---|---|
| autoHeight | (default: `false`) automatically set the height of the WebView to fill the contains and remove the scroll bar |
| makeSafe | (default: `false`) `false`: will not modify the html, `true`: will sanitize the html using the build in defaults, `object`: define a custom configuration for how to sanitize the html (See [docs](https://github.com/punkave/sanitize-html#how-to-use))
