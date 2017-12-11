<template>
  <div class="goods">
    <div class="goods-left" ref="menuWrapper">
      <div class="foodsNames">
        <div class="foodname" v-for="(name,ind) in goods" :class="{white:menuCurrIndex===ind}"
             @click="change(ind,$event)">
            <span class="text">
              <span class="icon" v-if="name.type>=0" :class="classes[name.type]"></span>
              {{name.name}}
          </span>
        </div>
      </div>
    </div>
    <div class="goods-right" ref="goodsWrapper">
      <div class="change">
        <div v-for="(good,i) in goods" class="every">
          <h2>{{good.name}}</h2>
          <div style="width: 100%;background: #fff;">
            <div v-for="food in good.foods" class="good-introduce">
              <div class="intro-img" @click="fooddatil=food"><img :src="food.icon" alt=""></div>
              <div class="intro-text">
                <span class="food-name">{{food.name}}</span><br>
                <span v-if="food.description!=''" class="food-description">{{food.description}}</span><br
                v-if="food.description!=''">
                <span class="food-description">月售{{food.sellCount}}份</span>
                <span class="food-description" style="padding-left: 0.24rem">好评率{{food.rating}}%</span><br>
                <span class="food-price"><span>￥</span>{{food.price}}</span>
                <span v-if="food.oldPrice!=''" class="food-oldPrice">￥{{food.oldPrice}}</span>
                <div class="shop">
                  <shop :food="food"></shop>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="datil">
    <div class="datil" v-if="fooddatil!=null">
      <datil :food="fooddatil" @send="jieshou" class="dtl"></datil>
    </div>
    </transition>
  </div>
</template>

<script>
  import Datil from '../Datil/Datil.vue';
  import Vue from 'vue';
//  import axios from 'axios';
  import Shop from '../Shop/Shop.vue';
  import BetterScroll from 'better-scroll';
  import ShopCart from '../ShopCart/ShopCart.vue';

  export default {
    props:['goods'],
    data() {
      return {
        index: '',
        top: '0px',
        heights: [],
        height:[],
        scrollY: '',
        goodsScroll: null,
        menuScroll: '',
        fooddatil: null,
        datil: null,
        classes: ['decrease', 'discount', 'special', 'guarantee', 'invoice'],
        bus:new Vue()
      }
    },
    created() {
      let that = this;
        that.$nextTick(() => {  //保证数据更新后引起的DOM更新之后会调用
          that.menuScroll = new BetterScroll(that.$refs.menuWrapper, {
            click: true
          });
          that.goodsScroll = new BetterScroll(that.$refs.goodsWrapper, {
            probeType: 3,
            click: true
          });
          that.goodsScroll.on("scroll", (pos) => {
            that.scrollY = Math.abs(Math.round(pos.y));
          });
          that.getHeight();
        });
        that.goods.forEach((good) => {
          good.foods.forEach((food) => {
            food.ratings.forEach((rat) => {
              Vue.set(rat, 'show', true);
            })
          })
        })
    },
    components: {
      Shop,
      ShopCart,
      Datil
    },
    methods: {
      getHeight() {
        let foodList = this.$refs.goodsWrapper.getElementsByClassName('every');
        let h = 0;
        this.heights.push(h);
        for (let i = 0; i < foodList.length; i++) {
          h += foodList[i].clientHeight;
          this.heights.push(h);
          this.height.push(foodList[i].clientHeight);
        };

      },
      change(ind, event) {
        if (!event._constructed) {
          return false
        } else {
          let every = this.$refs.goodsWrapper.getElementsByClassName('every');
          this.goodsScroll.scrollToElement(every[ind], 500);
        }
      },
      jieshou(dat) {
        this.fooddatil = dat;
      }
    },
    computed: {
      menuCurrIndex() {
        for (let h = 0; h < this.heights.length; h++) {
          let h1 = this.heights[h];
          let h2 = this.heights[h + 1];
          if (!h2||(this.scrollY >= h1 && this.scrollY < h2)) {
            return h;
          }
        }
        return 0;
      }
    }
  }
</script>

<style>
  .goods {
    position: relative;
    width: 100%;
    top: 0rem;
    left: 0;
    bottom: 9.6rem;
    height: 100%;
    overflow: hidden;
  }

  .goods-left {
    width: 1.6rem;
    float: left;
    background: #f3f5f7;
    height: 100%;
  }

  .foodsNames {
    width: 100%;
    height: auto;
    padding-bottom: 0.92rem;
  }

  .white {
    background: #fff;
  }

  .foodname {
    font-size: 0.24rem;
    color: rgb(7, 17, 27);
    height: 1.08rem;
    line-height: 0.32rem;
    text-align: left;
    width: 100%;
    display: table;
    height: 1.08rem;
  }

  .foodname .text {
    display: table-cell;
    width: 100%;
    text-align: left;
    padding-left: 0.24rem;
    vertical-align: middle;
    font-size: 0.26rem;
    position: relative;

  }

  .icon {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;

    background-size: 0.32rem;
    vertical-align: bottom;
  }

  .icon.decrease {
    background-image: url('./images/decrease_3@2x.png');
  }

  .icon.discount {
    background-image: url('./images/discount_3@2x.png');
  }

  .icon.guarantee {
    background-image: url('./images/guarantee_3@2x.png');
  }

  .icon.invoice {
    background-image: url('./images/invoice_3@2x.png');
  }

  .icon.special {
    background-image: url('./images/special_3@2x.png');
  }

  .foodsNames:hover {
    background: #fff;
  }

  .goods-right {
    float: left;
    position: absolute;
    left: 1.6rem;
    top: 0;
    width: 80%;
    text-align: left;
    height: 100%;
    bottom: 10%;
  }

  .change {
    position: absolute;
    width: 100%;
    height: auto;
    padding-bottom: 0.92rem;
  }

  .every {
    font-size: 0.2rem;
  }

  .every h2 {
    padding-left: 0.28rem;
    font-size: 0.24rem;
    color: rgb(147, 153, 159);
    line-height: 0.52rem;
    border-left: 0.02rem solid #d9dde1;
  }

  .good-introduce {
    min-height: 1.8rem;
    background: #fff;
    padding-top: 0.36rem;
    margin-left: 0.36rem;
    margin-right: 0.36rem;
    clear: both;
    display: flex;
    box-sizing: border-box;
    border-bottom: 0.02rem solid #f3f5f7
  }

  .intro-img {
    width: 0.96rem;
    height: 100%;
    margin: 0 0.2rem 0 0rem;
    flex: 0 0 0.96rem;
  }

  .intro-img img {
    width: 0.96rem;
    height: 0.96rem
  }

  .good-introduce .intro-text {
    flex: 0 0 75%;
    padding-bottom: 0.36rem;
  }

  .good-introduce span.food-name {
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
    line-height: 0.28rem;
  }

  .good-introduce span.food-description {
    font-size: 0.2rem;
    display: inline-block;
    color: rgb(147, 153, 159);
    line-height: 0.36rem;
    margin-top: 0.16rem;
  }

  .good-introduce span.food-price {
    color: rgb(240, 20, 20);
    font-size: 0.28rem;
    line-height: 0.48rem;
  }

  .good-introduce span.food-price span {
    font-size: 0.2rem
  }

  .good-introduce span.food-oldPrice {
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
    font-weight: 700;
    text-decoration: line-through;
    line-height: 0.48rem;
    padding-left: 0.16rem
  }

  .good-introduce .shop {
    float: right;
    right: 0rem;
    height: 0.48rem;
    display: flex;
    width: 1.2rem;
  }

  .good-introduce .shop span {
    display: block;
    float: right
  }

  .shop-cart {
    width: 100%;
  }

  .datil {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f3f5f7;
    overflow: hidden;
    bottom: 0.9rem;
  }

  .datil.datil-enter-active, .datil.datil-leave-active{
    transition: all 1s;
    opacity: 1;
    top: 0;
  }
  .datil.datil-enter, .datil.datil-leave-to{
    opacity: 0;
    top: -100%;
  }

</style>
