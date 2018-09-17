import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';

const ConfigUtils = {
  toArray: arg => (isArray(arg) ? arg : [arg])
};

let ConfigContext = {};

function getValue(path) {
  return get(this.object, path);
}

function setConfig(config) {
  this.config = config;
}

function ConfigService(options) {
  this.options = options;
}

ConfigService.prototype.getValue = getValue;
ConfigService.prototype.setConfig = setConfig;

function createConfig(config) {
  ConfigContext = React.createContext(config);
}

function getPropsFromConfig(config, props) {
  console.log(keys(props));
  return config;
}

class ConfigProvider extends Component {
  constructor() {
    super();
    const { config, options } = this.props;
    createConfig(config, options);
  }

  render() {
    const { children } = this.props;
    return <ConfigContext.Provider>{children}</ConfigContext.Provider>;
  }
}

ConfigProvider.defaultProps = {
  options: {}
};

ConfigProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  config: PropTypes.objectOf.isRequired,
  options: PropTypes.objectOf
};

const ConfigEnhancer = ({ children, ...props }) => (
  <ConfigContext.Consumer>
    {config => (
      <React.Fragment>
        {ConfigUtils.toArray(children).map(child =>
          React.cloneElement(child, getPropsFromConfig(config, props))
        )}
      </React.Fragment>
    )}
  </ConfigContext.Consumer>
);

ConfigEnhancer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.objectOf).isRequired
};

/**
 * @param {object} config
 * @returns {ReactObject}
 */
module.exports = {
  ConfigProvider
};
