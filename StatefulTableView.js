import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import StatefulTableErrorView from './StatefulTableErrorView';
import StatefulTableInfoView from './StatefulTableInfoView';
import StatefulTableLoadingView from './StatefulTableLoadingView';

const Constants = require('./StatefulTableViewConstants');


class StatefulTableView extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    keyExtractor: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    state: PropTypes.number.isRequired,

    emptyStateView: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    errorStateView: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    loadingStateView: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    refreshControl: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    separator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
  };
  static defaultProps = {
    data: [],
    state: Constants.States.DATA,
  };

  render() {
    const {
      data,
      keyExtractor,
      renderItem,
      state,

      emptyStateView,
      errorStateView,
      loadingStateView,
      refreshControl,
      separator
    } = this.props;

    let flatListView = (refreshControl != null) ? (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        refreshControl={refreshControl}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    ) : (
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    );

    switch (state) {
      case Constants.States.LOADING:
        return loadingStateView ? loadingStateView : <StatefulTableLoadingView />;

        break;
      case Constants.States.DATA:
        if (data.length == 0) {
          return emptyStateView ? emptyStateView : <StatefulTableInfoView />;

          break;
        }

        return flatListView;

        break;
      default:
        return errorStateView ? errorStateView : <StatefulTableErrorView state={state} />

        break;
    }
  }
}

/* Export ==================================================================== */

module.exports = StatefulTableView;
module.exports.details = {
  title: 'StatefulTableView',
};
