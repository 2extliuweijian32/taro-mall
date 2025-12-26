import Taro from '@tarojs/taro';
import React, { Fragment } from 'react';
import 'taro-ui/dist/style/index.scss';
import '@/styles/base.scss';

function App(props) {
  return <Fragment>{props?.children}</Fragment>;
}

export default App;
