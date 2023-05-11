import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#ffd60a',
  primaryDeemphasized: '#ffea83',
  secondary: '#ebeae4',
  secondaryDeemphasized: '#f5f4ed',
  secondaryDark: '#999999',
  primaryText: '#050505',
  text: '#050505',
  secondaryText: '#6b6a65',
  secondaryTextOnBg: '#706d60',
  background: '#f5f4f0',
  separator: '#d4d3ce',
  border: '#e2e1dd',
  cardBackground: '#ffffff',
  primaryIcon: '#050505',
  primaryCheckedIcon: '#514a26',
  secondaryIcon: '#050505',
  secondaryCheckedIcon: '#ffffff',
  secondaryDarkIcon: '#ffffff',
  linkIcon: '#6b6a65',
  linkCheckedIcon: '#ffd60a',
  danger: '#eb5c5c',
  success: '#14a44d',
  warning: '#ff8c00',
  completed: '#daf5da',
  completedText: '#14a44d',
  disabledBackground: '#ebeae4',
  disabledText: '#c4c3bc',
};

export const SIZES = {
  width,
  height,
  borderRadius: 10,
};
