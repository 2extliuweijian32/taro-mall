import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import Goods from '@/components/Goods';

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
          <Goods data={item} key={key} />
        ))}
      </ScrollView>
    </View>
  );
}

export default GoodsList;
