import React, { useState, useEffect } from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { getHomeDataApi } from '@/services/home';

import Loading from '@/components/Loading/index';
import Category from './components/Category/index';
import Promotion from './components/Promotion/index';
import FlashSale from './components/FlashSale/index';
import Recommend from './components/Recommend/index';

import './index.scss';

function Index() {
  const [imgList, setImgList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [promotion, setPromotion] = useState({});
  const [flashSale, setFlashSale] = useState({});
  const [recommend, setRecommend] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * @desc 获取商品列表
   * @return { void }
   */
  const fetchHomeData = async () => {
    setLoading(true);
    const res = await getHomeDataApi();

    if (res.status === 200) {
      setImgList(res.data.imgList);
      setCategoryList(res.data.categoryList);
      setPromotion(res.data.promotion);
      setFlashSale(res.data.flashSale);
      setRecommend(res.data.recommend);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <View className="container">
      <Swiper 
        indicatorColor="#999" 
        indicatorActiveColor="#fff"
        circular 
        indicatorDots 
        autoplay
        className="swiper"
      >
        {Array.isArray(imgList) &&
          imgList.map((img) => (
            <SwiperItem key={img.id}>
              <View 
                className="swiper__img-container"
                style={{backgroundImage: `url(${img.imgUrl})`}}
              />
            </SwiperItem>
          ))}
      </Swiper>

      <Category data={categoryList} />

      <Promotion data={promotion} />

      <FlashSale data={flashSale} />

      <Recommend data={recommend} />

      <Loading isLoading={loading} />
    </View>
  );
}

export default Index;
