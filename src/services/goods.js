import { getHomeDataApi } from "./home";
// 获取商品列表
const getGoodsListApi = async () => {
  const { data } = await getHomeDataApi();
  const { promotion, flashSale, recommend } = data;
  const goodsList = promotion.goodsList.concat(flashSale.goodsList).concat(recommend.goodsList);
  return {
    status: 200,
    data: goodsList
  }
};

export { getGoodsListApi };
