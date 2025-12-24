import React from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

function Activity() {
  const {
    router: { params = {} },
  } = getCurrentInstance();
  const goodsList = params.list ? JSON.parse(params?.list) : [];

  return (
    <View className="activity">
      {goodsList.map((item) => (
        <View
          className="goods"
          key={item.id}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/goods/index?id=${item.id}`,
            })
          }
        >
          <View className="goods-cover">
            <Image src={item.cover} />
          </View>
          <View className="goods-info">
            <View className="goods-name ellipsis">
              <Text>热销</Text>
              <Text>{item.name}</Text>
            </View>
            <View className="goods-price">￥{item.price}</View>
            <View className="goods-sales">销量: {item.sales}</View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default Activity;
