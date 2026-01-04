import { View, Text } from '@tarojs/components';
import './index.scss';

function OrderHeader(props) {
  const { headerInfo = {} } = props;

  return (
    <View className="order-header">
      <View className="order-addr">
        <View>
          <Text>{headerInfo.consignee}</Text>
          <Text>{headerInfo.phone}</Text>
        </View>
        <View>
          {headerInfo.province}
          {headerInfo.city}
          {headerInfo.region}
          {headerInfo.detailAddr}
        </View>
      </View>
    </View>
  );
}

export default OrderHeader;
