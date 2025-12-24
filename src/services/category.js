const data = [
  {
    name: '食品',
    id: 1,
    children: [
      {
        name: '休闲食品',
        id: 5,
      },
      {
        name: '粮油调味',
        id: 6,
      },
      {
        name: '乳品饮料',
        id: 7,
      },
      {
        name: '冲饮谷物',
        id: 8,
      },
      {
        name: '方便速食',
        id: 9,
      },
      {
        name: '茗茶',
        id: 10,
      },
      {
        name: '中外名酒',
        id: 11,
      }
    ]
  },
  {
    name: '图书',
    id: 2,
    children: [
      {
        name: '童书',
        id: 12,
      },
      {
        name: '文学小说',
        id: 13,
      },
      {
        name: '经管励志',
        id: 14,
      },
      {
        name: '人文社科',
        id: 15,
      },
      {
        name: '科技IT',
        id: 16,
      },
      {
        name: '艺术生活',
        id: 17,
      },
    ]
  },
  {
    name: '数码',
    id: 3,
    children: [
      {
        name: '影音娱乐',
        id: 18,
      },
      {
        name: '数码配件',
        id: 19,
      },
      {
        name: '智能设备',
        id: 20,
      },
      {
        name: '摄影摄像',
        id: 21,
      },
      {
        name: '电子教育',
        id: 22,
      },
    ]
  },
  {
    name: '家装',
    id: 4,
    children: [
      {
        name: '五金工具',
        id: 23,
      },
      {
        name: '厨房卫浴',
        id: 24,
      },
      {
        name: '智能设备',
        id: 25,
      },
      {
        name: '灯饰照明',
        id: 26,
      },
      {
        name: '基建材料',
        id: 27,
      },,
      {
        name: '电工电料',
        id: 28,
      },
      {
        name: '桌椅床柜',
        id: 29,
      },
    ]
  }
];

// 获取分类列表
const getCategoryListApi = async () => ({ status: 200, data });

export { getCategoryListApi };
