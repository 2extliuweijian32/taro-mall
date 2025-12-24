import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

function Promotion(props) {
  const { data = {} } = props;

  return (
    <View className="promotion">
      <View
        className="promotion__header"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/activity/index?list=${JSON.stringify(data.goodsList)}`,
          })
        }
      >
        <Text>促销</Text>
        <Text className="promotion__more">更多</Text>
      </View>
      <View className="promotion__banner" style={{backgroundImage: `url(${data.banner})`}} />
      <View className="promotion__goods">
        {data.goodsList?.map((item) => (
          <View
            className="promotion__goods-item"
            key={item.id}
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/goods/index?id=${item.id}`,
              })
            }
          >
            <View className="promotion__goods-cover">
              <Image src={item.cover} />
            </View>
            <View className="promotion__goods-info">
              <View className="promotion__goods-name ellipsis">
                <Text className="promotion__goods-tag">热销</Text>
                {item.name}
              </View>
              <View className="promotion__goods-price">￥{item.price}</View>
              <View className="promotion__goods-sales">销量: {item.sales}</View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Promotion;
