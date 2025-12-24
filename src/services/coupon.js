const data = {
  success: true,
  status: 200,
  data: [
    {
      id: 1,
      name: '外卖节优惠券',
      type: '所有外卖类型',
      minCost: 100,
      amount: 100,
      startDate: '2019-04-18',
      endDate: '2019-12-31'
    },
    {
      id: 2,
      name: '果蔬优惠券',
      type: '时令果蔬',
      minCost: 101,
      amount: 101,
      startDate: '2019-04-18',
      endDate: '2019-05-04'
    },
    {
      id: 3,
      name: '影城优惠券',
      type: '各大影城',
      minCost: 102,
      amount: 102,
      startDate: '2019-04-18',
      endDate: '2019-05-01'
    },
    {
      id: 4,
      name: 'KTV优惠券',
      type: '量贩式KTV',
      minCost: 103,
      amount: 103,
      startDate: '2019-04-18',
      endDate: '2019-05-31'
    },
    {
      id: 5,
      name: '金沙滩啤酒节优惠券',
      type: '金沙滩啤酒节',
      minCost: 104,
      amount: 104,
      startDate: '2019-04-18',
      endDate: '2019-10-09'
    }
  ]
}

// 获取优惠券列表
const getCouponListApi = () => Promise.resolve(data);

export { getCouponListApi };
