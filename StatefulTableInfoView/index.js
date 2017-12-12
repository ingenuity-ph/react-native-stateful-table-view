import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  View
} from 'react-native';

import styles from './styles';
import StatefulTableViewConstants from '../StatefulTableViewConstants';

import _ from 'lodash';


class StatefulTableInfoView extends Component {
  static propTypes = {
    headerText: PropTypes.string.isRequired,

    customStyle: PropTypes.object,
    detailText: PropTypes.string,
    imageDetails: PropTypes.object
  };
  static defaultProps = {
    headerText: 'No data available'
  };

  render() {
    let {
      headerText,

      customStyle,
      detailText,
      imageDetails
    } = this.props;

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

      defaultImage = <Image {...imageDetails} />;
    }

    return(
      <View style={customStyle.container}>
        {defaultImage}
        <Text style={customStyle.headerText}>{headerText}</Text>
        <Text style={customStyle.detailText}>{detailText}</Text>
      </View>
    );
  }
}

/* Export ==================================================================== */

module.exports = StatefulTableInfoView;
module.exports.details = {
  title: 'StatefulTableInfoView',
};
