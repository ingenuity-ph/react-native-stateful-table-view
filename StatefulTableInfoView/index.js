import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  Text,
  View,
} from 'react-native';

import _ from 'lodash';

import styles from './styles';


class StatefulTableInfoView extends PureComponent {
  static propTypes = {
    customStyle: PropTypes.object,
    detailText: PropTypes.string,
    headerText: PropTypes.string,
    imageDetails: PropTypes.object,
  };
  static defaultProps = {
    customStyle: styles,
    detailText: '',
    headerText: 'No data available',
    imageDetails: null,
  };

  render() {
    const {
      detailText,
      headerText,
      imageDetails,
    } = this.props;

    let {
      customStyle,
    } = this.props;
    let defaultImage = null;

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

    return (
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
