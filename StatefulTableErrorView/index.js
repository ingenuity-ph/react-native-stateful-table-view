import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Image,
  Text,
  View
} from 'react-native';

import styles from './styles';
import ErrorButton from '../ErrorButton/';

import _ from 'lodash';

const Constants = require('../StatefulTableViewConstants');


class StatefulTableErrorView extends Component {
  static propTypes = {
    state: PropTypes.number.isRequired,

    customStyle: PropTypes.object,
    detailText: PropTypes.string,
    errorButtonDetails: PropTypes.object,
    headerText: PropTypes.string,
    imageDetails: PropTypes.object
  };
  static defaultProps = {
    state: Constants.States.ERROR.SERVER,
  };

  render() {
    let {
      state,

      customStyle,
      detailText,
      errorButtonDetails,
      headerText,
      imageDetails
    } = this.props;

    let defaultButton = null;
    let defaultImage = null;
    let defaultMessage = '';

    // Check either to use user-specified styles or the default styles.
    customStyle = (customStyle && _.size(customStyle) > 0) ? customStyle : styles;

    if (imageDetails) {
      if (imageDetails.style) {
        imageDetails.style = imageDetails.style;
      } else if (customStyle.image) {
        imageDetails.style = customStyle.image;
      } else {
        imageDetails.style = styles.image;
      }

      defaultImage = imageDetails.source ? <Image {...imageDetails} /> : null;
    }

    switch (state) {
      case Constants.States.ERROR.INTERNET_CONNECTION:
        defaultMessage = 'No internet connection.';

        break;
      default:
        defaultMessage = 'An error occured.';

        break;
    }

    headerText = (headerText && headerText.length > 0) ? headerText : defaultMessage;

    return(
      <View style={customStyle.container}>
        {defaultImage}
        <Text style={customStyle.headerText}>{headerText}</Text>
        <Text style={customStyle.detailText}>{detailText}</Text>
        {errorButtonDetails && <ErrorButton {...errorButtonDetails} />}
      </View>
    );
  }
}

/* Export ==================================================================== */

module.exports = StatefulTableErrorView;
module.exports.details = {
  title: 'StatefulTableErrorView',
};
