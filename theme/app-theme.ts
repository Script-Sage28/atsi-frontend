import { theme } from 'antd';

const appTheme = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Button: {
      colorPrimary: 'red',
      algorithm: false,
    },
    Typography: {
      colorPrimary: '#FFF',
      algorithm: true,
    },
  },
};

export { appTheme };
