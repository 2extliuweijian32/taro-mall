import React, { useMemo, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

import Loading from '@/components/Loading/index';
import NoData from '@/components/NoData/index';
import './index.scss';
import Goods from '@/components/Goods';

function Cart() {
  const [goodsList, setGoodsList] = useState([]);
  const [checkboxIds, setCheckboxIds] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * @desc 商品数量按钮事件
   * @param { object } e
   * @param { number } id
   * @param { string } type
   * @return { void }
   */
  const handleNumChange = (e, id, type) => {
    e.stopPropagation();

    const list = goodsList.map((item) => {
      if (item.id === id) {
        const newItem = { ...item };
        // 数量加减
        newItem.num = type === 'add' ? newItem.num + 1 : newItem.num - 1;
        if (newItem.num < 1) {
          newItem.num = 0;
        }

        return newItem;
      }

      return item;
    });

    setGoodsList(list);

    // 更新缓存
    const cartList = list.filter((item) => item.num > 0);
    Taro.setStorageSync('cartList', JSON.stringify(cartList));
  };

  /**
   * @desc 商品 checkbox 点击事件
   * @param { object } e
   * @param { number } id
   * @return { void }
   */
  const handleChecked = (e, id) => {
    e.stopPropagation();

    const checkboxIdArr = [...checkboxIds];
    if (checkboxIdArr.includes(id)) {
      // checkboxIds 数组中是否存在当前点击的 checkbox id，如果有，则删除
      checkboxIdArr.splice(checkboxIdArr.indexOf(id), 1);
    } else {
      // 如果 childIds 数组中不存在当前点击的 checkbox id，则将其加入数组
      checkboxIdArr.push(id);
    }

    setCheckboxIds(checkboxIdArr);
  };

  /**
   * @desc 全选 checkbox
   * @return { void }
   */
  const handleCheckedAll = () => {
    const checkboxIdArr = [...checkboxIds];
    const list = JSON.parse(JSON.stringify(goodsList));

    if (isCheckedAll) {
      setCheckboxIds([]);
    } else {
      list.forEach((item) => checkboxIdArr.push(item.id));
      setCheckboxIds(checkboxIdArr);
    }
  };

  const totalMoney = useMemo(() => {
    const total = 0;
    goodsList.forEach((item) => {
      if (!checkboxIds.includes(item.id)) {
        return;
      }
      // 计算总价
      total += parseFloat(item.num) * parseFloat(item.price);
    });

    return total.toFixed(2);
  }, [goodsList, checkboxIds]);

  const isCheckedAll = useMemo(() => {
    return goodsList.every(v => checkboxIds.includes(v.id));
  }, [goodsList, checkboxIds]);

  useDidShow(() => {
    setLoading(true);
    // 从缓存中拿当前购买的商品信息
    let list = Taro.getStorageSync('cartList');
    if (list) {
      list = JSON.parse(list);

      const checkboxIdArr = [];
      list.forEach((item) => {
        // 存储 checkboxIds 数组供 checkbox 使用
        checkboxIdArr.push(item.id);
      });

      setGoodsList(list);
      setCheckboxIds(checkboxIdArr);
    }

    setLoading(false);
  });

  return (
    <View className="cart">
      {goodsList.map((item) => (
        <View
          className="cart-item"
          key={item.id}
          onClick={() => {
            Taro.setStorageSync('goodsList', JSON.stringify(goodsList));
            Taro.navigateTo({
              url: `/pages/goods/index?id=${item.id}`,
            });
          }}
        >
          <View
            className={checkboxIds.includes(item.id) ? 'cart__checkbox--checked' : 'cart__checkbox'}
            onClick={(e) => handleChecked(e, item.id)}
          >
            <View style={{ display: checkboxIds.includes(item.id) ? 'block' : 'none' }}>
              <AtIcon value="check" size="16" color="#fff" />
            </View>
          </View>
          <View className="cart__goods">
            <Goods 
              data={item}
              actions={(
                <View className="btn-group">
                  <View className="sub-btn" onClick={(e) => handleNumChange(e, item.id, 'sub')}>
                    <AtIcon value="subtract-circle" size="23" color="#999" />
                  </View>
                  <View className="num">{item.num}</View>
                  <View className="add-btn" onClick={(e) => handleNumChange(e, item.id, 'add')}>
                    <AtIcon value="add-circle" size="23" color="#999" />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      ))}

      <View className="cart__footer">
        <View className="cart__footer__checkbox">
          <View
            className={isCheckedAll ? 'cart__checkbox--checked' : 'cart__checkbox'}
            onClick={handleCheckedAll}
          >
            <View style={{ display: isCheckedAll ? 'block' : 'none' }}>
              <AtIcon
                style={{ display: isCheckedAll ? 'block' : 'none' }}
                value="check"
                size="16"
                color="#fff"
              />
            </View>
          </View>
          <Text className="cart__checkbox--label">全选</Text>
        </View>
        <View className="total">
          合计：<Text>￥{totalMoney}</Text>
        </View>
        <Button
          className="submit"
          onClick={() => {
            Taro.setStorageSync('goodsList', JSON.stringify(goodsList));
            Taro.navigateTo({
              url: `/pages/order/payment/index?checkedGoods=${JSON.stringify(checkboxIds)}`,
            });
          }}
          openType="getUserInfo"
        >
          下单({checkboxIds.length})
        </Button>
      </View>

      <NoData isVisible={Array.isArray(goodsList) && goodsList.length === 0} />

      <Loading isLoading={loading} />
    </View>
  );
}

export default Cart;
