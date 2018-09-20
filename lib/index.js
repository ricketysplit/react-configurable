import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import keys from 'lodash/keys';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

const ConfigUtils = {
  toArray: arg => (isArray(arg) ? arg : [arg])
};

let ConfigContext = {};

function getValue(config, path) {
  return get(config, path);
}

function setConfig(config) {
  this.config = config;
}

function ConfigService(options) {
  this.options = options;
}

ConfigService.prototype.setConfig = setConfig;

function createConfig(config) {
  ConfigContext = React.createContext(config);
}

function getPropsFromConfig(config, props) {
  return mapValues(
    props,
    (v, k) => (v === true ? config[k] : getValue(config, v))
  );
}

function shouldShow(config, props) {
  return keys(props).every(
    k => (props[k] !== true ? props[k] === config[k] : config[k])
  );
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

export const ConfigHide = ({ children, ...props }) => (
  <ConfigContext.Consumer>
    {config => (
      <React.Fragment>
        {!shouldShow(config, props) ? children : null}
      </React.Fragment>
    )}
  </ConfigContext.Consumer>
);

ConfigHide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]).isRequired
};

export const ConfigShow = ({ children, ...props }) => (
  <ConfigContext.Consumer>
    {config => (
      <React.Fragment>
        {shouldShow(config, props) ? children : null}
      </React.Fragment>
    )}
  </ConfigContext.Consumer>
);

ConfigShow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]).isRequired
};

export default {
  ConfigProvider,
  ConfigEnhancer,
  ConfigHide,
  ConfigShow
};
