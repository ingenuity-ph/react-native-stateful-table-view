import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import styles from './styles';


class StatefulTableLoadingView extends PureComponent {
  static propTypes = {
    activityIndicatorDetails: PropTypes.object,
    customStyle: PropTypes.object,
    detailText: PropTypes.string,
    hasActivityIndicator: PropTypes.bool,
    headerText: PropTypes.string,
  };
  static defaultProps = {
    activityIndicatorDetails: null,
    customStyle: styles,
    detailText: '',
    headerText: 'Loading...',
    hasActivityIndicator: true,
  };

  render() {
    const {
      activityIndicatorDetails,
      customStyle,
      detailText,
      hasActivityIndicator,
      headerText,
    } = this.props;
    let defaultActivityIndicator = <ActivityIndicator {...{ style: styles.activityIndicator }} />;

    if (activityIndicatorDetails) {
      if (activityIndicatorDetails.style) {
        activityIndicatorDetails.style = activityIndicatorDetails.style;
      } else if (customStyle.activityIndicator) {
        activityIndicatorDetails.style = customStyle.activityIndicator;
      } else {
        activityIndicatorDetails.style = styles.activityIndicator;
      }

      defaultActivityIndicator = <ActivityIndicator {...activityIndicatorDetails} />;
    }

    return (
      <View style={customStyle.container}>
        {hasActivityIndicator && defaultActivityIndicator}
        <Text style={customStyle.headerText}>{headerText}</Text>
        <Text style={customStyle.detailText}>{detailText}</Text>
      </View>
    );
  }
}

/* Export ==================================================================== */

module.exports = StatefulTableLoadingView;
module.exports.details = {
  title: 'StatefulTableLoadingView',
};
