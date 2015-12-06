'use strict';

import React from 'react-native';
let { WebView } = React;
import safeHtml from 'safe-html';
import _ from 'lodash';

const script = '<script>window.location.hash = 1;document.title = document.height;</script>';

const defaultSafeConfig = _.defaults(
  {
    allowedTags: safeHtml.DEFAULT_CONFIG.allowedTags.concat(['img', 'style']),
    allowedAttributes: _.defaults(
      {
        id: {allTags: true},
        style: {allTags: true},
        src: {allowedTags: ['img']}
      }, safeHtml.DEFAULT_CONFIG.allowedAttributes)
  },
  safeHtml.DEFAULT_CONFIG
);

let scrubHtml = function (html, makeSafe) {
  if (!html || makeSafe === false) {
    return html;
  }

  return safeHtml(
    html,
    _.isObject(makeSafe) ? makeSafe : defaultSafeConfig);
};

class WebContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onNavigationStateChange(navState) {
    this.setState({
      height: navState.title
    });
  }

  render() {
    let {
      html,
      style,
      autoHeight,
      makeSafe,
      scrollEnabled,
      ...props
    } = this.props;

    let scrubbedHtml = scrubHtml(html, makeSafe);

    return (
      <WebView
        {...props}
        style={[style, (autoHeight ? {height: Number(this.state.height)} : {})]}
        scrollEnabled={autoHeight ? false : scrollEnabled}
        html={autoHeight ? (scrubbedHtml + script) : scrubbedHtml}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
    );
  }
}

WebContainer.propTypes = {
  autoHeight: React.PropTypes.boolean,
  makeSafe: React.PropTypes.oneOf(
    React.PropTypes.boolean,
    React.PropTypes.object
  )
};

WebContainer.defaultProps = {
  makeSafe: false
};

export default WebContainer;
