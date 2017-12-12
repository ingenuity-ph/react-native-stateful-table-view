const StatefulTableViewConstants = {
  States: {
    LOADING: 0,
    DATA: 1,
    ERROR: {
      SERVER: -1,
      INTERNET_CONNECTION: -2
    },
  },
};

/* Export ==================================================================== */

module.exports = StatefulTableViewConstants;
module.exports.details = {
  title: 'StatefulTableViewConstants',
};

