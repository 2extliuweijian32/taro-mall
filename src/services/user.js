// 获取用户信息
const getUserInfoApi = () => Promise.resolve({
  success: true,
  status: 200,
  data: {
    score: 3000,
    coupons: 10,
    unPay: 2,
    unSend: 1
  }
});

// 获取地址信息
const getAddressApi = (params) => Promise.resolve({
  success: true,
  status: 200,
  data: [
    {
      id: 1,
      province: '山东省',
      city: '青岛市',
      region: '黄岛区',
      detailAddr: '金沙滩风景区',
      type: 1,
      consignee: '李小明',
      phone: '13800138000'
    },
    {
      id: 2,
      province: '浙江省',
      city: '杭州市',
      region: '西湖区',
      detailAddr: '文三路199号创业大厦',
      type: 2,
      consignee: '王芳',
      phone: '13912345678'
    },
    {
      id: 3,
      province: '广东省',
      city: '深圳市',
      region: '南山区',
      detailAddr: '科技园科发路1号',
      type: 2,
      consignee: '张伟',
      phone: '13698765432'
    },
    {
      id: 4,
      province: '江苏省',
      city: '南京市',
      region: '鼓楼区',
      detailAddr: '中山路321号金陵大厦',
      type: 2,
      consignee: '刘丽',
      phone: '15876543210'
    },
    {
      id: 5,
      province: '四川省',
      city: '成都市',
      region: '锦江区',
      detailAddr: '春熙路88号',
      type: 2,
      consignee: '陈建国',
      phone: '15123456789'
    }
  ]
});

export {
  getUserInfoApi,
  getAddressApi,
};
