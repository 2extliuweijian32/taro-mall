import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

function FlashSale(props) {
  const { data = {} } = props;

  return (
    <View className="flash-sale">
      <View
        className="flash-sale__header"
        onClick={() =>
          Taro.navigateTo({
            url: `/pages/activity/index?list=${JSON.stringify(data.goodsList)}`,
          })
        }
      >
        <Text>秒杀</Text>
        <View className="flash-sale__more">
          <Text>更多</Text>
          <View className="at-icon at-icon-chevron-right" />
        </View>
      </View>

      <View className="flash-sale__banner left">
        <Image src={data.banner} />
      </View>

      <View className="flash-sale__goods clearfix">
        {data.goodsList?.map((item) => (
          <View
            className="flash-sale__goods-item left"
            key={item.id}
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/goods/index?id=${item.id}`,
              })
            }
          >
            <View className="flash-sale__goods-info">
              <Image src={item.cover} />
              <View className="flash-sale__goods-name ellipsis">
                {item.name}
              </View>
            </View>
            <View className="flash-sale__goods-intro">
              <View className="flash-sale__goods-price">￥{item.price}</View>
              <View className="flash-sale__goods-sales">销量: {item.sales}</View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default FlashSale;
