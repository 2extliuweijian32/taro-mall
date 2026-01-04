import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

function Goods(props) {
  const { data, size = 'large', actions, showTag = false } = props;

  return (
    <View
      className={`goods goods-${size}`}
      key={data.id}
      onClick={() =>
        Taro.navigateTo({
          url: `/pages/goods/index?id=${data.id}`,
        })
      }
    >
      <View className="goods__cover" style={{ backgroundImage: `url(${data.cover})` }} />
      <View className="goods__info">
        <View className="goods__name">
          { showTag && <Text className="goods__tag">热销</Text> }
          {data.name}
        </View>
        <View className="goods__info__footer">
          <View className="goods__price">￥{data.price}</View>
          { actions || <View className="goods__sales">销量: {data.sales}</View> }
        </View>
      </View>
    </View>
  )
}

export default React.memo(Goods);
