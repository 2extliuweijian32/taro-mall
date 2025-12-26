import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { getUserInfoApi } from '@/services/user';

import Loading from '@/components/Loading/index';
import { isObj } from '@/utils/util';

import allIcon from '@/assets/orders/all.png';
import unpayIcon from '@/assets/orders/unpay.png';
import unsendIcon from '@/assets/orders/unsend.png';
import doneIcon from '@/assets/orders/done.png';

import './index.scss';

function UserInfo() {
  const [miniUserInfo, setMiniUserInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * @desc 小程序授权
   * @return { void }
   */
  const handleApplyAuthorize = () => {
    Taro.getUserProfile({
      success: (res) => {
        setMiniUserInfo(res.userInfo);
        Taro.setStorageSync('miniUserInfo', JSON.stringify(res.userInfo));
        setIsModalShow(false);
      },
      fail: (e) => {
        Taro.showToast({
          title: e.errMsg,
          icon: 'error'
        });
      }
    });
  };

  /**
   * @desc 跳转页面
   * @param { string } url
   * @return { void }
   */
  const handleRedirect = (url) => {
    Taro.setStorageSync('navType', 'user');
    Taro.navigateTo({ url });
  };

  /**
   * @desc 获取用户信息
   * @return { void }
   */
  const fetchUserInfo = async () => {
    setLoading(true);
    const res = await getUserInfoApi();

    if (res?.status === 200) {
      setUserInfo(res?.data);
      Taro.setStorageSync('userInfo', JSON.stringify(res?.data));
    }

    setLoading(false);
  };

  useEffect(() => {
    const miniInfo = Taro.getStorageSync('miniUserInfo');
    if (miniInfo) {
      const infoJson = JSON.parse(miniInfo);

      if (isObj(infoJson) && Object.keys(infoJson).length > 0) {
        setMiniUserInfo(infoJson);
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <View className="user-info">
      <View className="user-info__header">
        <View>
          <View className="user-info__avatar">
            <Image src={miniUserInfo.avatarUrl} />
          </View>
          <View className="user-info__name">
            <View
              onClick={() => {
                if (!miniUserInfo.nickName) {
                  setIsModalShow(true);
                }
              }}
            >
              {miniUserInfo.nickName || '请登录'}
            </View>
            <View
              className="left"
              onClick={() => handleRedirect('/pages/user/userEdit/index', 'navigateTo')}
            >
              个人设置
            </View>
          </View>
        </View>
        <View className="user-info__score">
          <View>积分：{userInfo.score}</View>
        </View>
      </View>

      <View
        className="user-info__coupon"
        onClick={() => handleRedirect('/pages/coupon/index', 'navigateTo')}
      >
        <View>
          <Text className="user-info__coupon-label">我的优惠券</Text>
          <View className="user-info__coupon-num right">
            <View>{userInfo.coupons}张</View>
            <AtIcon value="chevron-right" size="24" color="#FFE2C0" />
          </View>
        </View>
      </View>

      <View className="user-info__orders">
        <View
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/order/orderList/index?current=00`,
            });
          }}
        >
          我的订单
          <View className="right">
            <AtIcon value="chevron-right" size="18" color="#999" />
          </View>
        </View>
        <View className="user-info__order-category">
          <View
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/order/orderList/index?current=00`,
              });
            }}
          >
            <Image className="order-icon1" src={allIcon} />
            <View>全部订单</View>
          </View>
          <View
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/order/orderList/index?current=01`,
              });
            }}
          >
            <Image className="order-icon2" src={unpayIcon} />
            <View>待付款</View>
            <View className="badge">{userInfo.unPay}</View>
          </View>
          <View
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/order/orderList/index?current=02`,
              });
            }}
          >
            <Image className="order-icon3" src={unsendIcon} />
            <View>待发货</View>
            <View className="badge">{userInfo.unSend}</View>
          </View>
          <View
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/order/orderList/index?current=03`,
              });
            }}
          >
            <Image className="order-icon4" src={doneIcon} />
            <View>已完成</View>
          </View>
        </View>
      </View>

      <View className="info-list">
        <View onClick={() => handleRedirect('/pages/user/addrList/index')}>
          <AtIcon value="map-pin" size="16" color="#999" className="ver-icon" />
          <Text>收货地址</Text>
          <View className="right">
            <AtIcon value="chevron-right" size="20" color="#999" />
          </View>
        </View>
        <View onClick={() => handleRedirect('/pages/user/phoneEdit/index')}>
          <AtIcon value="phone" size="16" color="#999" className="ver-icon" />
          <Text>认证手机</Text>
          <View className="right">
            <AtIcon value="chevron-right" size="20" color="#999" />
          </View>
        </View>
        {/* <View onClick={() => handleRedirect('/pages/user/invoiceEdit/index')}>
          <AtIcon value="bookmark" size="16" color="#999" className="ver-icon" />
          <Text>增值发票</Text>
          <View className="right">
            <AtIcon value="chevron-right" size="20" color="#999" />
          </View>
        </View> */}
        <View onClick={() => handleRedirect('/pages/user/suggestion/index')}>
          <AtIcon
            value="bullet-list"
            size="16"
            color="#999"
            className="ver-icon"
          />
          <Text>反馈建议</Text>
          <View className="right">
            <AtIcon value="chevron-right" size="20" color="#999" />
          </View>
        </View>
      </View>

      <AtModal isOpened={isModalShow} closeOnClickOverlay={false}>
        <AtModalHeader>欢迎来到XX商城</AtModalHeader>
        <AtModalContent>请授权登录，获得完整购物体验</AtModalContent>
        <AtModalAction>
          <Button onClick={() => setIsModalShow(false)}>取消</Button>
          <Button openType="getUserInfo" onClick={handleApplyAuthorize}>
            授权登录
          </Button>
        </AtModalAction>
      </AtModal>

      <Loading isLoading={loading} />
    </View>
  );
}

export default UserInfo;
