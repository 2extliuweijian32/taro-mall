import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import Goods from '@/components/Goods';

function GoodsCard(props) {
  return (
    <View className="goods-card">
      {Array.isArray(props?.goodsList) &&
        props.goodsList.map((item) => {
          return (
            <Goods 
              data={item} 
              key={item.id}
              actions={
                <View className="goods__num">
                  x<Text>{item.num}</Text>
                </View>
              }
            />
          );
        })}
    </View>
  );
}

export default GoodsCard;
