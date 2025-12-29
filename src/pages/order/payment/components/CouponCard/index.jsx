import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Picker } from '@tarojs/components';
import { wxToast } from '@/utils/wxApi';
import './index.scss';

function CouponCard(props) {
  const scoreArr = [0, 1000, 2000, 3000, 5000];

  const [pickerIndex, setPickerIndex] = useState(0);
  const [couponName, setCouponName] = useState('请选择优惠券');

  /**
   * @desc 选择积分
   * @param { object } e
   * @return { void }
   */
  const handlePickerChange = (e) => {
    let userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }

    if (scoreArr[parseInt(e?.target?.value)] <= userInfo?.score) {
      props.onScoreCall(scoreArr[parseInt(e?.target?.value)]);
      setPickerIndex(parseInt(e?.target?.value));
    } else {
      wxToast('可用积分不足', 'close-circle');
    }
  };

  useEffect(() => {
    setCouponName(props.couponInfo?.couponName);
  }, [props.couponInfo]);

  return (
    <View className="coupon-card">
      <View className="coupon-item">
        订单金额<Text className="coupon-item__label right">{props.totalMoney}</Text>
      </View>

      <View
        className="coupon-item"
        onClick={() => {
          Taro.setStorageSync('navType', 'order');
          Taro.navigateTo({ url: '/pages/coupon/index' });
        }}
      >
        优惠券
        <Text className="coupon-item__label right">{couponName}</Text>
      </View>

      <View className="coupon-item">
        积分抵扣金额
        <View>(100积分抵扣10元)</View>
        <View className="picker right">
          <Picker
            onChange={handlePickerChange}
            value={pickerIndex}
            range={scoreArr}
          >
            <Text className="score">{scoreArr[pickerIndex]}</Text>
          </Picker>
        </View>
      </View>
    </View>
  );
}

export default CouponCard;
