import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

function Recommend(props) {
  const { data = {} } = props;

  return (
    <View className="recommend">
      <View
        className="recommend__header"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/activity/index?list=${data.goodsList}`,
          })
        }
      >
        ——<Text>推荐</Text>——
      </View>

      {data.goodsList?.map((item) => (
        <View
          className="recommend__goods-item"
          key={item.id}
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/goods/index?id=${item.id}`,
            })
          }
        >
          <View className="recommend__goods-cover">
            <Image src={item.cover} />
          </View>
          <View className="recommend__goods-info">
            <View className="recommend__goods-name ellipsis">
              {item.name}
            </View>
            <View className="recommend__goods-price">￥{item.price}</View>
            <View className="recommend__goods-sales">销量: {item.sales}</View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default Recommend;
