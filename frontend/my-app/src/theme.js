import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html,body': {
        backgroundColor: '#ffffff',
      },
    },
  },
  colors: {
    buttonColor: {
      500: '#6246ea',
    },
    headLineColor: {
      500: '#2b2c34',
    },
    paragraphColor:{
        500:'#2b2c34'
    }
  },
});

export default theme;
