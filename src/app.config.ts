export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/coupon/index',
    'pages/goods/index',
    'pages/activity/index',
    'pages/order/payment/index',
    'pages/order/orderList/index',
    'pages/order/orderInfo/index',
    'pages/user/userInfo/index',
    'pages/user/userEdit/index',
    'pages/user/addrList/index',
    'pages/user/addrEdit/index',
    'pages/user/phoneEdit/index',
    'pages/user/invoiceEdit/index',
    'pages/user/suggestion/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro Mall',
    navigationBarTextStyle: 'black'
  },
    tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/tabbar_icon01.png',
        selectedIconPath: './assets/tabbar_icon01_active.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: './assets/tabbar_icon02.png',
        selectedIconPath: './assets/tabbar_icon02_active.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: './assets/tabbar_icon03.png',
        selectedIconPath: './assets/tabbar_icon03_active.png',
      },
      {
        pagePath: 'pages/user/userInfo/index',
        text: '我的',
        iconPath: './assets/tabbar_icon04.png',
        selectedIconPath: './assets/tabbar_icon04_active.png',
      },
    ],
    color: '#999',
    selectedColor: '#e80e27',
    backgroundColor: '#fff',
    borderStyle: 'black',
  },
})
