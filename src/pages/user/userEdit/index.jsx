import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Picker } from '@tarojs/components';

import { isNotNull } from '@/utils/util';
import { wxToast } from '@/utils/wxApi';

import Loading from '@/components/Loading/index';
import './index.scss';

function UserEdit() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * @desc 输入框 onChange 事件
   * @param { object } e
   * @param { string } sign
   * @return { void }
   */
  const handleInputChange = (e, sign) => {
    setFormData({
      ...formData,
      [sign]: e?.target?.value,
    });
  };

  /**
   * @desc 检测输入框值是否为空
   * @param { string } inputVal
   * @param { string } toastTxt
   * @return { boolean }
   */
  const checkInputVal = (inputVal, toastTxt) => {
    if (!isNotNull(inputVal)) {
      wxToast(toastTxt, 'close-circle');
      return true;
    }
  };

  /**
   * @desc 提交
   * @return { void }
   */
  const handleSubmit = async () => {
    if (checkInputVal(formData.nickName, '请输入称呼')) {
      return;
    }
    if (checkInputVal(formData.birth, '请输入出生日期')) {
      return;
    }

    wxToast('操作成功', 'check-circle');

    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  };

  /**
   * @desc 获取用户信息
   * @return { void }
   */
  const fetchUserInfo = async () => {
    
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <View className="user-edit">
      <View className="edit-item clearfix">
        <View className="edit-item__label left">称呼：</View>
        <View className="edit-item__value left">
          <Input
            className="form-control"
            placeholder="请输入您的称呼"
            value={formData.nickName}
            onInput={(e) => handleInputChange(e, 'nickName')}
          />
        </View>
      </View>

      <View>
        <View className="edit-item clearfix">
          <View className="edit-item__label left">出生日期：</View>
          <View className="edit-item__value left">
            <Picker
              className="form-control"
              placeholder="请选择出生日期"
              mode="date"
              value={formData.birth}
              onChange={(e) => handleInputChange(e, 'birth')}
            >
              <View className="display-text ellipsis">{formData.birth}</View>
            </Picker>
          </View>
        </View>
      </View>

      <View className="submit" onClick={handleSubmit}>
        提交
      </View>

      <Loading isLoading={loading} />
    </View>
  );
}

export default UserEdit;
