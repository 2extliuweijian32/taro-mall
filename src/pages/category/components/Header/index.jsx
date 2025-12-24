import React, { useState } from 'react';
import { View, Input, Text, Image } from '@tarojs/components';
import './index.scss';
import arrowUp from '@/assets/arrow_up.png';

const NO_DESC = 0b000;
const COMPREHENSIVE_DESC = 0b001;
const SALES_DESC = 0b010;
const PRICE_DESC = 0b100;

function isDescending(descValue, descContext) {
  return (descValue & descContext) !== NO_DESC;
}

function reverse(descValue, descContext) {
  if (isDescending(descValue, descContext)) {
    return descValue & ~descContext;
  }

  return descValue | descContext;
}

function Header(props) {
  const { onHeaderCall = () => {} } = props;

  const [kw, setKw] = useState('');
  const [descValue, setDescValue] = useState(NO_DESC);
  /**
   * @desc 点击排序
   * @param { number } type
   * @return { void }
   */
  const handleSort = (descContext) => {
    const reversedValue = reverse(descValue, descContext);

    setDescValue(reversedValue);

    onHeaderCall({
      kw,
      descValue: reversedValue,
    });
  };

  const handleSearch = () => {

    setDescValue(NO_DESC);

    onHeaderCall({
      kw
    });
  };

  return (
    <View className="header">
      <View className="search">
        <Input
          className="kw"
          placeholder-class="placeholder-cls"
          placeholder="请输入商品名称"
          onInput={(e) => setKw(e?.target?.value)}
        />
        <Text onClick={handleSearch}>搜索</Text>
      </View>

      <View className="sorting">
        <View className="sorting-item" onClick={() => handleSort(COMPREHENSIVE_DESC)}>
          <Text>综合</Text>
          <Image
            src={arrowUp}
            className={isDescending(descValue, COMPREHENSIVE_DESC) ? 'sorting--arrow-up__active' : 'sorting--arrow-up'}
          />
        </View>
        <View className="sorting-item" onClick={() => handleSort(SALES_DESC)}>
          <Text>销量</Text>
          <Image
            src={arrowUp}
            className={isDescending(descValue, SALES_DESC) ? 'sorting--arrow-up__active' : 'sorting--arrow-up'}
          />
        </View>
        <View className="sorting-item" onClick={() => handleSort(PRICE_DESC)}>
          <Text>价格</Text>
          <Image
            src={arrowUp}
            className={isDescending(descValue, PRICE_DESC) ? 'sorting--arrow-up__active' : 'sorting--arrow-up'}
          />
        </View>
      </View>
    </View>
  );
}

export default Header;
