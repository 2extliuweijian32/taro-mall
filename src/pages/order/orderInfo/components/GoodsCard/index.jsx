import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

function GoodsCard(props) {
  const { goodsList } = props;

  return (
    <View className="goods-card">
      {Array.isArray(goodsList) &&
        goodsList.map((item) => {
          return (
            <View
              className="goods"
              key={item.id}
              onClick={() =>
                Taro.navigateTo({
                  url: `/pages/goods/index?id=${item.id}`,
                })
              }
            >
              <View className="goods-cover">
                <Image src={item.cover} />
              </View>
              <View className="goods-info">
                <View className="goods-name">{item.name}</View>
                <View className="goods-price">￥{item.price}</View>
                <View className="goods-num right">
                  x<Text>{item.num}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
}

export default GoodsCard;
