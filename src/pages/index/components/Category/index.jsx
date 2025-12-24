import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

function Category(props) {
  const { data = [] } = props;

  return (
    <View className="category clearfix">
      {data.map((category) => (
          <View
            className="category__item left"
            key={category.id}
            onClick={() => Taro.switchTab({ url: '/pages/category/index' })}
          >
            <View className="category__icon">
              <Image src={category.imgUrl} />
            </View>
            <View className="category__title">{category.title}</View>
          </View>
        ))}
    </View>
  );
}

export default Category;
