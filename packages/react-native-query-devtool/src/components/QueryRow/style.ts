import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  observersContainer: {
    width: 20,
    height: 20,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  observerNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
  queryKey: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Courier New',
    marginLeft: 3,
  },
  queryKeySelected: {
    fontWeight: 'bold',
  },
});
