import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConfigProvider extends Component {
  constructor() {
    super();
    console.log('this is being constructed');
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

ConfigProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.objectOf).isRequired
};

/**
 * @param {object} config
 * @returns {ReactObject}
 */
module.exports = {
  ConfigProvider
};
