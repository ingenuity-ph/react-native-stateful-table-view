import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
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
      PropTypes.object,
    ]),
    errorStateView: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    loadingStateView: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    refreshControl: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    separator: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  };
  static defaultProps = {
    emptyStateView: <StatefulTableInfoView />,
    errorStateView: null,
    loadingStateView: <StatefulTableLoadingView />,
    refreshControl: null,
    separator: null,
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
      separator,
    } = this.props;

    const flatListView = (refreshControl != null) ? (
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
        return loadingStateView;
      case Constants.States.DATA:
        if (data.length === 0) {
          return emptyStateView;
        }

        return flatListView;
      default:
        return errorStateView || <StatefulTableErrorView state={state} />;
    }
  }
}

/* Export ==================================================================== */

module.exports = StatefulTableView;
module.exports.details = {
  title: 'StatefulTableView',
};
