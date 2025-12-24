import { allGoodsList } from "./data";
// 获取商品列表
const getGoodsListApi = async (params) => ({
    status: 200,
    success: true,
    data: allGoodsList
});

export { getGoodsListApi };
