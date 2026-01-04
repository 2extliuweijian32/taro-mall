import React from 'react';
import { View } from '@tarojs/components';

function NoData(props) {
  return (
    <View
      style={{
        display: props.isVisible ? 'block' : 'none',
        padding: '40px 0',
        textAlign: 'center',
        color: '#999'
      }}
    >
      暂无数据
    </View>
  );
}

export default NoData;
