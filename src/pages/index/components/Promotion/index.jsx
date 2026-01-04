import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { ArrowRightSize8 } from '@nutui/icons-react-taro';
import Goods from '@/components/Goods';
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
        <View className="promotion__more">
          <Text>更多</Text>
          <ArrowRightSize8 size={12} color="#999" />
        </View>
      </View>
      <View className="promotion__banner" style={ data.banner ? {backgroundImage: `url(${data.banner})`} : {}} />
      <View className="promotion__goods">
        {data.goodsList?.map((item) => (
          <Goods key={item.id} data={item} size="medium" />
        ))}
      </View>
    </View>
  );
}

export default Promotion;
