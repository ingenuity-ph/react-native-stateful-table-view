import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import styles from './styles';
import StatefulTableViewConstants from '../StatefulTableViewConstants';

import _ from 'lodash';


class StatefulTableLoadingView extends Component {
  static propTypes = {
    activityIndicatorDetails: PropTypes.object,
    customStyle: PropTypes.object,
    detailText: PropTypes.string,
    hasActivityIndicator: PropTypes.bool,
    headerText: PropTypes.string
  };
  static defaultProps = {
    hasActivityIndicator: true
  };

  render() {
    let {
      activityIndicatorDetails,
      customStyle,
      detailText,
      hasActivityIndicator,
      headerText
    } = this.props;

    let defaultActivityIndicator = <ActivityIndicator {...{style: styles.activityIndicator}} />;
    let defaultMessage = '';

    // Check either to use user-specified styles or the default styles.
    customStyle = (customStyle && _.size(customStyle) > 0) ? customStyle : styles;
    headerText = (headerText && headerText.length > 0) ? headerText : 'Loading...';

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

    return(
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
