import React from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import Goods from '@/components/Goods';

function Activity() {
  const {
    router: { params = {} },
  } = getCurrentInstance();
  const goodsList = params.list ? JSON.parse(params?.list) : [];

  return (
    <View className="activity">
      {goodsList.map((data) => (
        <Goods data={data} key={data.id} showTag />
      ))}
    </View>
  );
}

export default Activity;
