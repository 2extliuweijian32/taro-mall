import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Input } from '@tarojs/components';
import { isNotNull } from '@/utils/util';
import { wxToast } from '@/utils/wxApi';
import useCountDown from '@/hooks/useCountDown';

import Loading from '@/components/Loading/index';
import './index.scss';

function PhoneEdit() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const { count, run } = useCountDown();
  const [btnDisabled, setBtnDisabled] = useState(false);

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
   * @desc 获取新手机号验证码
   * @return { void }
   */
  const getSmsCode = () => {
    if (!isNotNull(formData.newPhone)) {
      wxToast('请填写新手机号', 'close-circle');
      return;
    }

    if (!btnDisabled) {
      setBtnDisabled(true);
      fetchSmsCode();
    }
  };

  /**
   * @desc 提交
   * @return { void }
   */
  const handleSubmit = async () => {
    if (checkInputVal(formData.oldPhone, '请输入认证手机')) {
      return;
    }
    if (checkInputVal(formData.newPhone, '请输入新手机号')) {
      return;
    }
    if (checkInputVal(formData.smsCode, '请输入验证码')) {
      return;
    }
    wxToast('设置成功', 'check-circle');
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  };

  /**
   * @desc 获取验证码
   * @return { void }
   */
  const fetchSmsCode = async () => {
    run();
    wxToast('发送成功', 'check-circle');
  };

  useEffect(() => {
    if (count === 0) {
      setBtnDisabled(false);
    }
  }, [count]);

  return (
    <View className="phone-edit">
      <View>
        <View className="edit-row clearfix">
          <View className="edit-row__label left">认证手机：</View>
          <View className="edit-row__value left">
            <Input
              className="form-control"
              placeholder="请输入认证手机"
              onInput={(e) => handleInputChange(e, 'oldPhone')}
            />
          </View>
        </View>
        <View className="edit-row clearfix">
          <View className="edit-row__label left">新手机：</View>
          <View className="edit-row__value left">
            <Input
              className="form-control"
              placeholder="请输入新手机"
              onInput={(e) => handleInputChange(e, 'newPhone')}
            />
          </View>
        </View>
        <View className="edit-row clearfix">
          <View className="edit-row__label left">验证码：</View>
          <View className="edit-row__value left">
            <Input
              className="form-control"
              placeholder="请输入验证码"
              onInput={(e) => handleInputChange(e, 'smsCode')}
            />
          </View>
          <View
            className="verify-btn right"
            onClick={getSmsCode}
            style={{ backgroundColor: btnDisabled ? '#ccc' : '#e80e27' }}
          >
            {btnDisabled ? `重新发送(${count})` : '获取验证码'}
          </View>
        </View>
      </View>

      <View className="submit-btn" onClick={handleSubmit}>
        提交
      </View>

      <Loading isLoading={loading} />
    </View>
  );
}

export default PhoneEdit;
