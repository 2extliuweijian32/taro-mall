import { View, Text } from '@tarojs/components';
import './index.scss';

function CouponCard(props) {
  const { couponInfo = {} } = props;

  return (
    <View className="coupon-card">
      <View className="coupon-item">
        订单金额<Text className="coupon-item__label right">{couponInfo.orderMoney}</Text>
      </View>

      <View className="coupon-item">
        优惠券
        <Text className="coupon-item__label right">{couponInfo.couponName}</Text>
      </View>

      <View className="coupon-item">
        积分抵扣金额
        <View>(100积分抵扣10元)</View>
        <Text className="coupon-item__label right">{couponInfo.integralDiscount}</Text>
      </View>
    </View>
  );
}

export default CouponCard;
