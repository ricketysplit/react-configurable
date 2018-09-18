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
  return get(this.config, path);
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
  console.log({ config });
  // TODO need to only return needed props
  return config;
}

export class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    const { config, options } = props;
    createConfig(config, options);
  }

  render() {
    const { children, config } = this.props;
    return (
      <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
    );
  }
}

ConfigProvider.defaultProps = {
  options: {}
};

ConfigProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf, PropTypes.object])
    .isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  options: PropTypes.objectOf(PropTypes.any)
};

export const ConfigEnhancer = ({ children, ...props }) => (
  <ConfigContext.Consumer>
    {config => (
      <React.Fragment>
        {ConfigUtils.toArray(children).map((child, index) =>
          React.cloneElement(child, {
            key: index,
            ...getPropsFromConfig(config, props)
          })
        )}
      </React.Fragment>
    )}
  </ConfigContext.Consumer>
);

ConfigEnhancer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

/**
 * @param {object} config
 * @returns {ReactObject}
 */

export default {
  ConfigProvider,
  ConfigEnhancer
};
