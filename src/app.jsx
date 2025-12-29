import '@nutui/nutui-react-taro/dist/style.css';
import Taro from '@tarojs/taro';
import React, { Fragment } from 'react';
import '@/styles/base.scss';

function App(props) {
  return <Fragment>{props?.children}</Fragment>;
}

export default App;
