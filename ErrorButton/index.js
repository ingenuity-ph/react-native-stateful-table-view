import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './styles';


class ErrorButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,

    customStyle: PropTypes.object,
    title: PropTypes.string,
  };
  static defaultProps = {
    customStyle: styles,
    title: 'Retry',
  };

  render() {
    const {
      customStyle,
      onPress,
      title,
    } = this.props;

    if (customStyle) {
      customStyle.view = customStyle.view ? customStyle.view : styles.view;
      customStyle.title = customStyle.title ? customStyle.title : styles.title;
    }

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        style={customStyle.view}
      >
        <Text style={customStyle.title}>{title}</Text>
      </TouchableHighlight>
    );
  }
}

export default ErrorButton;
