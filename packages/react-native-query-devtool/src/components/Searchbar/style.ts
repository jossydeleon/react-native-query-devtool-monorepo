import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 18,
    zIndex: 999,
  },
});
