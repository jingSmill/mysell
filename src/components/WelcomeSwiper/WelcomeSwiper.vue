<template>
    <swiper :options="swiperOption">
      <swiper-slide class="one">
        <h2>hello</h2>
      </swiper-slide>
      <swiper-slide class="two">
        <div>
          <p>Welcome</p>
          <router-link to="/main" tag="h2">立即体验</router-link>
        </div>
      </swiper-slide>
    </swiper>
</template>
<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  require('swiper/dist/css/swiper.css');
  import VueRouter from 'vue-router';
  export default {
    data(){
      return {
        swiperOption:{
          autoplayStopOnLast:true,
          autoplay:30000,
          paginationClickable: true,
          autoplayDisableOnInteraction: false
        }
      }
    },
    components:{
      swiper,
      swiperSlide
    }

  }

</script>
<style>
  .swiper-container{
    height: 100%;
  }
  .swiper-wrapper{
    height: 100%;
  }
  .one{
    height: 100%;
    background: mistyrose;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .one h2{
   font-size: 45px;
    color: #fff;
  }
  .two{
    height: 100%;
    background: lawngreen;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .two p{
    font-size: 45px;
    color: #fff;
  }
  .two h2{
    margin-top: 20px;
    font-size: 35px;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    border: 2px solid #fff;
    border-radius: 10px;
  }
</style>
