<template>
  <div v-if="seller!=null&&goods!=null&&ratings!=null" class="all" ref="main">
    <div class="head">
      <myheader :seller="seller"></myheader>
    </div>
    <div class="tabs">
      <ul>
        <!--<router-link :to="{name:'goods',params:{goods:goods}}" tag="li">商品</router-link>-->
        <router-link to="/goods" tag="li">商品</router-link>
        <router-link to="/ratings" tag="li">评价</router-link>
        <router-link to="/seller" tag="li">商家</router-link>
      </ul>
    </div>
    <div class="content">
      <transition name="fade">
        <router-view :goods="goods" :seller="seller" :ratings="ratings" class="router-view">
        </router-view>
      </transition>

    </div>
    <shop-cart :sellinfo="sellinfo"></shop-cart>
  </div>
</template>

<script>
  import Myheader from '../Header/Header.vue';
  import ShopCart from '../ShopCart/ShopCart.vue';
  import Vue from 'vue';
  import axios from 'axios';
  import VueRouter from 'vue-router';

  export default {
    name: 'app',
    data() {
      return {
        seller: null,
        goods: null,
        ratings: null,
        bus:new Vue()
      }
    },
    components: {
      Myheader,
      ShopCart
    },
    created() {
      let that = this;
      axios.get("http://localhost:8080/api/seller").then(res => {
        that.seller = res.data.data;
      }).catch(err => {
        console.log(err);
      });
      axios.get("http://localhost:8080/api/goods").then(res => {
        that.goods = res.data.data;
      }).catch(err => {
        console.log(err);
      });
      axios.get("http://localhost:8080/api/ratings").then(res => {
        that.ratings = res.data.data;
      }).catch(err => {
        console.log(err);
      });


    },
    methods: {
      cmopuHeight() {
      }
    },
    computed: {
      sellinfo() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.cont) {
              foods.push(food)
            }
          })
        });
        return foods;
      }
    }
  }
</script>

<style>
  .all {
    width: 100%;
    height: 100%;
    position: relative
  }

  .head {
    height: 2.68rem;
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .tabs {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    margin-bottom: 0.1rem;
    position: relative;
    z-index: 0;
    width: 100%;
  }

  .tabs ul {
    width: 100%;
    display: flex;
  }

  .tabs ul li {
    flex: 1;
    line-height: 0.8rem;
    text-align: center;
    cursor: pointer;
    font-size: 0.28rem;
    color: rgb(77, 85, 93)
  }

  .tabs ul li.router-link-active {
    color: rgb(240, 20, 40);
  }

  .content {
    height: 65%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .router-view.fade-enter-active, .router-view.fade-leave-active{
    transition: all 0.5s;
    opacity: 1;
  }
  .router-view.fade-enter, .router-view.fade-leave-to{
    opacity: 0;
  }


</style>

