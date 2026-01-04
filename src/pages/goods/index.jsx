import React, { useState, useEffect } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { getGoodsListApi } from '@/services/goods';

import { Home, Cart, Category, Plus, Minus } from '@nutui/icons-react-taro';
import Loading from '@/components/Loading/index';

import './index.scss';
import NoData from '@/components/NoData';

function GoodsInfo() {
  const {
    router: { params = {} },
  } = getCurrentInstance();

  const [goodsInfo, setGoodsInfo] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [totalNum, setTotalNum] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * @desc 商品数量按钮点击事件
   * @param { string } type
   * @return { void }
   */
  const btnClick = (type) => {
    let total = totalNum;
    const num = type === 'add' ? (total += 1) : (total -= 1);

    if (num < 0) {
      return;
    }

    setTotalNum(num);
    setTotalMoney((goodsInfo.price * num).toFixed(2));
  };

  /**
   * @desc 跳转页面
   * @param { string } url
   * @param { string } action
   * @return { void }
   */
  const handleRedirect = (url, action) => {
    updateStorage();
    Taro[action]({ url });
  };

  /**
   * @desc 将商品信息存入购物车缓存
   * @return { void }
   */
  const updateStorage = () => {
    if (totalNum > 0) {
      let list = [];
      const cartList = Taro.getStorageSync('cartList');
      if (cartList) {
        list = JSON.parse(cartList);
        let hasItem = false;
        list.forEach((item) => {
          // 如果 购物车缓存 存在该商品信息，则添加数量
          if (item.id === Number(params?.id)) {
            item.num = totalNum;
            hasItem = true;
          }
        });
        // 如果 购物车缓存 不存在该商品信息，则加入购物车缓存
        if (!hasItem) {
          list.push({
            ...goodsInfo,
            num: totalNum,
          });
        }
      } else {
        // 如果不存在，则将 商品信息 存入购物车缓存中
        list.push({ ...goodsInfo, num: totalNum });
      }

      Taro.setStorageSync('cartList', JSON.stringify(list));
    }
  };

  /**
   * @desc 获取商品列表
   * @return { void }
   */
  const fetchGoodsList = async () => {
    setLoading(true);
    const res = await getGoodsListApi();

    if (res?.status === 200) {
      const info = res?.data.filter((item) => item.id === Number(params?.id));

      setGoodsInfo(info[0]);

      // 获取缓存中的商品信息
      const cartList = Taro.getStorageSync('cartList');
      if (cartList) {
        const list = JSON.parse(cartList);

        list.forEach((item) => {
          if (item.id === Number(params?.id)) {
            setTotalNum(item.num);
            setTotalMoney((item.num * info[0]?.price).toFixed(2));
          }
        });
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchGoodsList();
  }, []);

  return (
    <View className="goods">
      <View className="banner" style={ goodsInfo.cover ? { backgroundImage: `url(${goodsInfo.cover})` } : {}} />

      <View className="info">
        <View className="name ellipsis">{goodsInfo.name}</View>
        <View className="price">
          <Text className="price--current">￥{goodsInfo.price}</Text>
          <Text className="price--before">￥{goodsInfo.price}</Text>
        </View>
        <View className="stock right">
          <Text>库存: 9999</Text>
          <Text>销量: {goodsInfo.sales}</Text>
        </View>
      </View>

      <View className="cart">
        <View className="total-money">
          合计：<Text>{totalMoney}</Text>
        </View>
        <View className="btn-group">
          <View onClick={() => btnClick('sub')} className="sub-btn">
            <Minus size="20" color="#999" />
          </View>
          <View className="num">{totalNum}</View>
          <View onClick={() => btnClick('add')} className="add-btn">
            <Plus size="12" color="#999" />
          </View>
        </View>
      </View>

      <View className="tabs">
        <View className="tabs-header">
          <View>
            <Text
              className={tabIndex === 0 ? 'tabs-header__item--active' : 'tabs-header__item'}
              onClick={() => setTabIndex(0)}
            >
              商品描述
            </Text>
          </View>
          <View>
            <Text
              className={tabIndex === 1 ? 'tabs-header__item--active' : 'tabs-header__item'}
              onClick={() => setTabIndex(1)}
            >
              规格参数
            </Text>
          </View>
          <View>
            <Text
              className={tabIndex === 2 ? 'tabs-header__item--active' : 'tabs-header__item'}
              onClick={() => setTabIndex(2)}
            >
              包装售后
            </Text>
          </View>
        </View>

        <View className="tabs-content">
          <NoData isVisible />
        </View>
      </View>

      <View className="footer">
        <View className="icons">
          <View className="icon">
            <Home
              size="18"
              color="#666"
              onClick={() => handleRedirect('/pages/index/index', 'switchTab')}
            />
            <View className="name">首页</View>
          </View>
          <View
            className="icon"
            onClick={() => handleRedirect('/pages/category/index', 'switchTab')}
          >
            <Category size="18" color="#666" />
            <View className="name">分类</View>
          </View>
          <View
            className="icon"
            onClick={() => handleRedirect('/pages/cart/index', 'switchTab')}
          >
            <View className="badge" style={{ display: totalNum > 0 ? 'block' : 'none' }}>
              {totalNum}
            </View>
            <Cart size="18" color="#666" />
            <View className="name">购物车</View>
          </View>
        </View>
        <View className="btn-group">
          <View className="cart-btn" onClick={() => btnClick('add')}>
            加入购物车
          </View>
          <Button
            className="pay-btn"
            onClick={() => handleRedirect('/pages/order/orderList/index?current=01', 'navigateTo')}
          >
            去结算
          </Button>
        </View>
      </View>

      <Loading isLoading={loading} />
    </View>
  );
}

export default GoodsInfo;
