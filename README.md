# react-native-stateful-table-view [![NPM version](https://badge.fury.io/js/react-native-stateful-table-view.svg)](https://npmjs.org/package/react-native-stateful-table-view) [![Build Status](https://travis-ci.org/ingenuityph/react-native-stateful-table-view.svg?branch=master)](https://travis-ci.org/ingenuityph/react-native-stateful-table-view)

> A React Native component based on FlatList that provides an option to display different views for each of its states (empty datasource, error, loading).

## Installation

```sh
$ npm install --save react-native-stateful-table-view
```

## Usage
The packages consists of various components that users can utilize to make the most of this package:
* StatefulTableView
* StatefulTableViewConstants
* StatefulTableInfoView
* StatefulTableErrorView
* StatefulTableLoadingView

Using all of these components is the recommended approach, although the last three props can be omitted to allow users to provide their own state views.

### StatefulTableView
The actual table view component that utilizes a `FlatList` component in the hood. What makes it different from a regular FlatList is that it also handle several conditions to display different views for each of its state.

It has several required props needed to be supplied in order for the component to work:
* `data` - Refers to the actual dataset to be fed to the FlatList.
* `keyExtractor` - Function to define the key to be used for each FlatList item.
* `renderItem` - Function to configure component to be used for displaying each row.
* `state` - The current state of the component.

Example of its usage (without any kind of customization):
```
<StatefulTableView
  data={['Item 1', 'Item 2']}
  keyExtractor={this.keyExtractor}
  renderItem={this.renderItem}
  state={StatefulTableViewConstants.States.DATA}
/>
```

These other props will allow users to further customize this component:
* `emptyStateView` - Providing a component to this prop will override the default empty state view, thus, displaying the provided component instead for an empty state.
* `errorStateView` - Providing a component to this prop will override the default error state view, thus, displaying the provided component instead when resulting to an error state.
* `loadingStateView` - Providing a component to this prop will override the default loading state view, thus, displaying the provided component instead when loading of dataset is ongoing.
* `refreshControl` - A `RefreshControl` component which will enable pull-to-refresh functionality when provided.
* `separator` - A component which will serve as the separator for each row.

### StatefulTableViewConstants
Dictionary containing the states that the `StatefulTableView` will recognize in order to display its corresponding state view.
```
States: {
  LOADING: 0,
  DATA: 1,
  ERROR: {
    SERVER: -1,
    INTERNET_CONNECTION: -2
  },
}
```

* `LOADING` - Refers to the state in which the process of fetching the dataset is currently ongoing.
* `DATA` - Refers to the state in which the fetching of the dataset has either resulted in an empty dataset or has actual content.
* `ERROR` - Further divided into `SERVER` and `INTERNET_CONNECTION`. The former can be used when fetching of data from an API or other similar platform results in a error, while the latter is if the fetching of data was disrupted by an internet connection problem.

### StatefulTableInfoView
One of the 3 state views, the `StatefulTableInfoView` serves as a generic state view, wherein you can provide any information not necessarily tied in to a specific state. By default, it defaults to an empty state view.

With its default implementation (not supplying any props) will display a **"No data available"** text intended as a default value for empty states. Providing values to these following props will allow this component to better cater user needs:
* `headerText` (required) - The primary text to be displayed in the view.
* `customStyle` - A `StyleSheet` object to customize the appearance of the `headerText`, `detailText`, and `container`.

A sample `customStyle` looks like this:
```
let padding = 10;
let customStyle = {
  container: {
  // Your style here
  },
  detailText: {
  // Your style here
  },
  headerText: {
  // Your style here
  },
};
```
* `detailText` - The supplementing information to be displayed in the view.
* `imageDetails` - A dictionary supplying values for `Image` component's props. Not providing the values for the *style* prop will use the default styling for the image provided by this package.

A full implementation of this component looks like this:
```
<StatefulTableInfoView
  headerText='No data fetched'
  detailText='Please try again later.'
  imageDetails={{
    source: require('./empty.png'),
    // Optional
    style: {
      // Your style here
    }
  }}
  customStyle={customStyle}
/>
```

### StatefulTableErrorView
Another of the three state views, the `StatefulTableErrorView` serves as a state view specific for error states.

Unlike the previous state view, this has a required prop, *state*, which defines as to what default message it should display. **"No internet connection."** text is displayed for the `INTERNET_CONNECTION` error, and **"An error occured."** for the `SERVER` error.

Providing values to these following props will allow this component to better cater user needs:
* `customStyle` - A `StyleSheet` object to customize the appearance of the `headerText`, `detailText`, and `container`.

See `customStyle` in *StatefulTableInfoView* for a sample guide.
* `detailText` - The supplementing information to be displayed in the view.
* `headerText` (required) - The primary text to be displayed in the view.
* `imageDetails` - A dictionary supplying values for `Image` component's props. Not providing the *style* prop will use the default styling for the image provided by this package.
* `errorButtonDetails` - A dictionary supplying values for the custom `ErrorButton` component's props bundled in this package. Providing a value for this prop will enable a button to be displayed in the view, which can be further customized by the user.

```
errorButtonDetails={{
  onPress: () => {
    this.setState({
      tableViewState: StatefulTableViewConstants.States.LOADING
    });
    this.fetchJokes();
  },
  // Optional
  title: 'Reload',
  // Optional
  customStyle: {
    title: {
      // Your style here
    },
    view: {
      // Your style here
    }
  }
}}
```
For the button to have any functionality, the `onPress` prop must be provided. This is where you will put the function you want to be executed when the button is pressed.

`title` refers to the title of the button, and supplying any value defaults the button to have **"Retry"** as its title.

Provide a value to the `customStyle` prop if you want to further customize the appearance of the button.

A full implementation of this component looks like this:
```
<StatefulTableErrorView
  headerText='Error'
  detailText='Cannot complete request. Please try again later.'
  state={StatefulTableViewConstants.States.ERROR.SERVER}
  imageDetails={{
    source: require('./empty.png'),
    style: {
      // Your style here
    }
  }}
  errorButtonDetails={{
    onPress: () => {
      console.log('Clicked')
    },
    // Optional
    title: 'Reload',
    // Optional
    customStyle: {
      view: {
        // Your style here
      }
    }
  }}
  customStyle={customStyle}
/>
```

### StatefulTableLoadingView
Lastly, the `StatefulTableLoadingView` is specifically built for the loading state.

With its default implementation (not supplying any props) will display a **"Loading..."** text with a default activity indicator. Providing values to these following props will allow this component to better cater user needs:
* `activityIndicatorDetails` - A dictionary supplying values for `ActivityIndicator` component's props. Not providing the *style* prop will use the default styling for the activity indicator provided by this package.
* `customStyle` - A `StyleSheet` object to customize the appearance of the `headerText`, `detailText`, and `container`.
* `detailText` - The supplementing information to be displayed in the view.
* `hasActivityIndicator` - Visibility of the activity indicator. Defaults to `true`.
* `headerText` - The primary text to be displayed in the view.

A full implementation of this component looks like this:
```
<StatefulTableLoadingView
  headerText='Processing...'
  detailText='This may take a while'
  activityIndicatorDetails={{
    // Optional
    color: 'black',
    // Optional
    style: {
      // Your style here
    }
  }}
  customStyle={customStyle}
/>
```

## License

MIT © [Jason Jon E. Carreos]()
