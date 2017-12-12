import {
  StyleSheet
} from 'react-native';


var padding = 20

export default StyleSheet.create({
  activityIndicator: {
    height: 20,
    marginBottom: 20,
    width: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  detailText: {
    color: 'gray',
    fontSize: 14,
    paddingLeft: padding,
    paddingRight: padding,
    textAlign: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    paddingLeft: padding,
    paddingRight: padding,
    textAlign: 'center',
  },
  image: {
    height: 100,
    marginBottom: 20,
    width: 100,
  }
});
