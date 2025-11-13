import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: 64,
  },
  logo: {
    width: 150,
    height: 34,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 8,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  clearButton: {
    marginLeft: 'auto',
  },
  clearText: {
    color: '#828282',
    fontWeight: 'bold',
    fontSize: 12,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  empty: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 14,
  },
});