import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';
import Goods from '@/components/Goods';

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
        <Goods data={item} key={item.id} showTag />
      ))}
    </View>
  );
}

export default Recommend;
