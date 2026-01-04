const orderList = {
  success: true,
  status: 200,
  data: [
    {
      id: 1,
      orderNum: '215529966046623',
      orderState: '01',
      orderMoney: 100,
      actualMoney: 100,
      createDate: '2019-03-23',
      goodsList: [
        {
          id: 1,
          price: 30,
          cover: 'https://m.360buyimg.com/mobilecms/s1125x1125_jfs/t1/317073/5/1451/74194/68283fbaF78dca0a7/0f8c4d139b4e5b98.jpg',
        },
        {
          id: 2,
          price: 31,
          cover: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/319261/19/19460/103089/68872a42F38e19ba2/2fd48e500d188a19.jpg',
        }
      ]
    },
    {
      id: 2,
      orderNum: '215529966046622',
      orderState: '02',
      orderMoney: 101,
      actualMoney: 101,
      createDate: '2019-03-23',
      goodsList: [
        {
          id: 3,
          price: 32,
          cover: 'https://img12.360buyimg.com/n2/s270x270_jfs/t1/187386/30/50437/169241/673c50b7Fed849f02/e3a87e14b9fe5ad8.jpg',
        },
        {
          id: 4,
          price: 33,
          cover: 'https://img12.360buyimg.com/n2/s270x270_jfs/t1/192431/18/38016/125936/6508026dF9d31e62d/393bc114da06d6fa.jpg',
        }
      ]
    },
    {
      id: 3,
      orderNum: '215529966046621',
      orderState: '01',
      orderMoney: 102,
      actualMoney: 102,
      createDate: '2019-03-23',
      goodsList: [
        {
          id: 5,
          price: 34,
          cover: 'https://img14.360buyimg.com/n2/s270x270_jfs/t1/229787/37/25917/167558/676291c3F0361338b/e68bf8ad2aa2cf03.jpg',
        },
        {
          id: 6,
          price: 35,
          cover: 'https://img10.360buyimg.com/n2/s270x270_jfs/t1/291345/2/6739/105705/682bd7a2Ff2d9f751/3128e8c7aa2c84cf.jpg',
        }
      ]
    },
    {
      id: 4,
      orderNum: '215529966046624',
      orderState: '03',
      orderMoney: 103,
      actualMoney: 103,
      createDate: '2019-03-23',
      goodsList: [
        {
          id: 7,
          price: 36,
          cover: 'https://img12.360buyimg.com/n2/s270x270_jfs/t1/257795/8/21947/107237/67b5a517F907482c4/05418a60a63e82f7.jpg',
        },
        {
          id: 8,
          price: 37,
          cover: 'https://img13.360buyimg.com/n2/s270x270_jfs/t1/324745/32/6612/73031/68a2d524F539da18a/f5011879cae7110c.jpg',
        }
      ]
    },
    {
      id: 5,
      orderNum: 215529966046624,
      orderState: '03',
      orderMoney: 104,
      actualMoney: 104,
      createDate: '2019-03-23',
      goodsList: [
        {
          id: 9,
          price: 38,
          cover: 'https://img14.360buyimg.com/n2/s270x270_jfs/t1/20956/17/20563/72057/6690ec97F501727f9/ac223ff455097d4c.jpg',
        },
        {
          id: 10,
          price: 39,
          cover: 'https://img13.360buyimg.com/n2/s270x270_jfs/t1/137400/32/23144/247054/621c4aecE4159e8e4/934fdfff3634f6e6.jpg',
        }
      ]
    }
  ]
};

// 获取订单列表
const getOrderListApi = async () => Promise.resolve(orderList);

const orderDetail = {
  success: true,
  status: 200,
  data: {
    headerInfo: {
      province: '广东省',
      city: '深圳市',
      region: '福田区',
      detailAddr: '金安大厦11楼1011室',
      consignee: '佚名',
      phone: '13312345678',
      company: '佚名科技技术有限公司'
    },
    goodsList: [
      {
        id: 1,
        cover: 'https://m.360buyimg.com/mobilecms/s1125x1125_jfs/t1/317073/5/1451/74194/68283fbaF78dca0a7/0f8c4d139b4e5b98.jpg',
        price: 100,
        name: '纯血鸿蒙HARMONYOS NEXT原生开发之旅',
        num: 1
      },
      {
        id: 2,
        cover: 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/319261/19/19460/103089/68872a42F38e19ba2/2fd48e500d188a19.jpg',
        price: 101,
        name: 'HarmonyOS NEXT进阶 : 纯血鸿蒙开发实践(博文视点出品)',
        num: 2
      }
    ],
    couponInfo: {
      orderMoney: 300,
      couponName: '金沙滩啤酒节优惠券',
      integralDiscount: 10
    }
  }
}

// 获取订单详情
const getOrderInfoApi = () => Promise.resolve(orderDetail)

export { getOrderListApi, getOrderInfoApi };
