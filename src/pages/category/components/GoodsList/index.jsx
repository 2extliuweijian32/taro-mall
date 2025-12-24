import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import './index.scss';

function GoodsList(props) {
  const { goodsList = [], onGoodsCall = () => {} } = props;

  /**
   * @desc 滚动加载
   * @return { void }
   */
  const handleScroll = () => {
    onGoodsCall();
  };

  return (
    <View className="goods-list">
      <ScrollView
        className="scroller"
        scrollY
        scrollWithAnimation
        lowerThreshold="50"
        onScrollToLower={handleScroll}
      >
        {goodsList.map((item, key) => (
          <View
            className="goods-item"
            key={key}
            onClick={() => Taro.navigateTo({ url: `/pages/goods/index?id=${item.id}` })}
          >
            <View className="goods-cover">
              <Image src={item.cover} />
            </View>
            <View className="goods-info">
              <View className="goods-name ellipsis">
                {item.name}
              </View>
              <View className="goods-price">￥{item.price}</View>
              <View className="goods-sales">销量: {item.sales}</View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default GoodsList;
