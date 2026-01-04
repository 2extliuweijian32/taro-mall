import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Edit, Del } from '@nutui/icons-react-taro';

import { getAddressApi } from '@/services/user';
import { wxToast } from '@/utils/wxApi';

import Loading from '@/components/Loading/index';
import './index.scss';

function AddrList() {
  const [addrList, setAddrList] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * @desc 新增编辑收货地址
   * @param { number } id
   * @param { object } e
   * @return { void }
   */
  const updateAddr = (id, e) => {
    e.stopPropagation();
    let itemClone = {};

    // 编辑传数据
    if (id > 0) {
      addrList.forEach((item) => {
        if (item.id === id) {
          itemClone = { ...item };
        }
      });
    }

    Taro.navigateTo({
      url: `/pages/user/addrEdit/index?initFormData=${JSON.stringify(itemClone)}`,
    });
  };

  /**
   * @desc 删除地址
   * @param { object } e
   * @param { number } id
   * @return { void }
   */
  const deleteAddr = (e, id) => {
    e.stopPropagation();
    setAddrList(data => data.filter(v => v.id !== id));
    wxToast('删除成功', 'check-circle');
  };

  /**
   * @desc 订单页面选择收货地址
   * @param { object } addrJson
   * @return { void }
   */
  const handleAddrClick = async (addrJson) => {
    const navType = Taro.getStorageSync('navType');
    if (navType === 'order') {
      Taro.setStorageSync('addrInfo', JSON.stringify(addrJson));
      Taro.navigateBack();
    }
  };

  /**
   * @desc 获取地址信息
   * @return { void }
   */
  const fetchAddrList = async () => {
    setLoading(true);
    const res = await getAddressApi();

    if (res?.status === 200) {
      setAddrList(res?.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAddrList();
  }, []);

  return (
    <View className="addr-list">
      {Array.isArray(addrList) &&
        addrList.map((item) => {
          const phoneVal = `${item.phone.toString().slice(0, 3)}****${item.phone
            .toString()
            .slice(7)}`;
          const addrJson = {
            addrId: item.id,
            consignee: item.consignee,
            phone: item.phone,
            province: item.province,
            city: item.city,
            region: item.region,
            detailAddr: item.detailAddr,
          };

          return (
            <View className="addr-item" key={item.id} onClick={() => handleAddrClick(addrJson)}>
              <View className="addr-item__top">
                <Text>{item.consigneeName}</Text>
                <View>
                  {phoneVal}
                  <Text style={{ display: item.type === 1 ? 'inline-block' : 'none' }}>
                    默认地址
                  </Text>
                </View>
              </View>
              <View className="addr-item__bottom ellipsis">
                {`${item.province}${item.city}${item.region}${item.detailAddr}`}
              </View>
              <View className="edit-icon" onClick={(e) => updateAddr(item.id, e)}>
                <Edit size="18" color="#666" />
              </View>
              <View className="delete-icon" onClick={(e) => deleteAddr(e, item.id)}>
                <Del size="18" color="#666" />
              </View>
            </View>
          );
        })}

      <View className="submit-btn" onClick={(e) => updateAddr(undefined, e)}>
        新增收货地址
      </View>

      <Loading isLoading={loading} />
    </View>
  );
}

export default AddrList;
