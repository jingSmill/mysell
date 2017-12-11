<template>
  <div class="sell" style="height: 100%">
    <div ref="sellWrapper" style="height: 100%">
      <div class="auto">
        <div class="seller">
          <div class="seller-left">
            <p class="data-name">{{seller.name}}</p>
            <p class="seller-star">
              <stars :info="seller.score"></stars>
              <span>({{parseInt(seller.score / 5 * seller.sellCount)}})</span>
              <span style="padding-left: 0.24rem;">月售{{seller.sellCount}}单</span>
            </p>
          </div>
          <div class="seller-right" @click="collect">
            <p :class="{heartin:flag}"><span class="icon-favorite heart"></span></p>
            <p class="heart-text"><span v-show="flag">已</span>收藏</p>
          </div>

        </div>
        <div style="clear: both"></div>
        <div class="tiaojian">
          <div class="block">
            <p class="tj-title">起送价</p>
            <p><span class="tj-con-big">{{seller.minPrice}}</span>
              <span class="tj-con-small">元</span></p>
          </div>
          <div class="block">
            <p class="tj-title">商家配送</p>
            <p><span class="tj-con-big">{{seller.deliveryPrice}}</span>
              <span class="tj-con-small">元</span></p>
          </div>
          <div class="block">
            <p class="tj-title">平均配送时间</p>
            <p><span class="tj-con-big">{{seller.deliveryTime}}</span>
              <span class="tj-con-small">分钟</span></p>
          </div>
        </div>
        <div class="hair">
          <p class="moment">公告与活动</p>
          <div class="moment-content">
            {{seller.bulletin}}
          </div>
        </div>
        <div class="supports">
          <ul>
            <li v-for="support in seller.supports">
              <div :class="classes[support.type]"></div>
              <span>{{support.description}}</span>
            </li>
          </ul>
        </div>
        <div class="view">
          <p class="moment">商家实景</p>
          <div style="width: 100%" ref="picWrapper">
            <div class="pics">
              <div v-for="pic in seller.pics">
                <img :src="pic" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="msg">
          <p class="moment">商家信息</p>
          <ul>
            <li v-for="inf in seller.infos"><span>{{inf}}</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopCart from '../ShopCart/ShopCart.vue';
  import BetterScroll from 'better-scroll';
  import Stars from '../Stars/Stars.vue';
  import Sellinfo from '../Sellinfo/Sellinfo.vue';

  export default {
    props:['goods','ratings','seller'],
    data() {
      return {
        flag: false,
        classes: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    created() {
      let that = this;
        that.$nextTick(() => {
          that.menuScroll = new BetterScroll(that.$refs.sellWrapper, {
            click: true
          });
          that.picWrapper = new BetterScroll(that.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
    },
    components: {
      Stars,
      ShopCart
    },
    methods: {
      collect() {
        this.flag = !this.flag;
      }
    }
  }
</script>

<style>
  .sell {
    background: #fff;
  }

  .seller {
    width: 100%;
  }

  .auto {
    height: auto;
    padding-bottom: 0.92rem;
  }

  .seller .seller-left {
    float: left;
    margin: 0.36rem 0 0 0.36rem;
  }

  .seller .seller-left .data-name {
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
    text-align: left;
    font-weight: 600;
  }

  .seller .seller-left .seller-star {
    margin: 0.16rem 0 0 0;
  }

  .seller .seller-left .seller-star div {
    float: left
  }

  .seller .seller-left .seller-star div img {
    height: 0.3rem;
    margin-right: 0.1rem
  }

  .seller .seller-left .seller-star span {
    font-size: 0.24rem;
    color: rgb(77, 85, 93);
    line-height: 0.4rem;
  }

  .seller .seller-right {
    float: right;
    margin-right: 0.36rem;
    margin-top: 0.36rem;
    width: 1rem;
  }

  .seller .seller-right .heart {
    font-size: 0.48rem;
    line-height: 0.48rem;
  }

  .seller .seller-right .heartin {
    color: rgb(240, 20, 20);
  }

  .seller .seller-right .heart-text {
    font-size: 0.2rem;
    color: rgb(77, 85, 93);
    line-height: 0.3rem;

    padding-right: 0;
  }

  .tiaojian {
    width: 90%;
    display: flex;
    border-top: 0.02rem solid #f3f5f7;
    margin: 0.36rem 0.36rem 0
  }

  .tiaojian .block {
    flex: 1;
    height: 0.96rem;
    margin-top: 0.36rem;
    border-right: 0.01rem solid #f3f5f7
  }

  .tiaojian .block .tj-title {
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
  }

  .tiaojian .block .tj-con-big {
    font-size: 0.48rem;
    font-weight: 200;
    color: rgb(7, 17, 27)
  }

  .tiaojian .block .tj-con-small {
    font-size: 0.2rem;
    color: rgb(7, 17, 27)
  }

  .hair {
    width: 100%;
    margin-top: 0.36rem;
    background: #fff;
  }

  .hair .moment {
    padding-top: 0.36rem;
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
    text-align: left;
    margin-left: 0.36rem;
    font-weight: 600;
  }

  .hair .moment-content {
    font-size: 0.24rem;
    font-weight: 200;
    color: rgb(240, 20, 20);
    line-height: 0.48rem;
    text-align: left;
    margin: 0.16rem 0.36rem 0.32rem;
    padding-left: 0.12rem;
  }

  .supports {
    width: 100%;
    background: #fff
  }

  .supports ul li {
    margin-left: 0.36rem;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: left;
    border-top: 0.01rem solid rgba(7, 17, 27, 0.1);
    margin-right: 0.36rem;
  }

  .supports ul li span {
    color: rgb(7, 17, 27);
    font-size: 0.24rem;
    font-weight: 200
  }

  .supports ul li div {
    float: left;
    margin: 0.32rem 0.12rem 0 0.24rem;
    width: 0.32rem;
    height: 0.32rem
  }

  div.decrease {
    background: url("./images/decrease_2@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  div.discount {
    background: url("./images/discount_2@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  div.guarantee {
    background: url("./images/guarantee_2@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  div.invoice {
    background: url("./images/invoice_2@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  div.special {
    background: url("./images/special_2@2x.png") no-repeat;
    background-size: 100% 100%;
  }

  .view {
    margin-top: 0.36rem;
    background: #fff;
    width: 100%;
    overflow: hidden
  }

  .view .moment {
    padding-top: 0.36rem;
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
    text-align: left;
    margin-left: 0.36rem;
    font-weight: 600;
  }

  .view div.pics {
    margin-left: 0.32rem;
    width: 180%;
    margin-top: 0.24rem
  }

  .view div.pics div {
    margin-right: 0.12rem;
    float: left
  }

  .view div.pics div img {
    width: 2.4rem;
    height: 1.8rem
  }

  .msg {
    margin-top: 0.36rem;
    background: #fff;
    width: 100%;
  }

  .msg .moment {
    padding-top: 0.36rem;
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
    text-align: left;
    margin-left: 0.36rem;
    font-weight: 600;
    margin-bottom: 0.24rem
  }

  .msg ul li {
    margin-left: 0.36rem;
    height: 0.96rem;
    padding-left: 0.24rem;
    text-align: left;
    border-top: 0.01rem solid rgba(7, 17, 27, 0.1);
    margin-right: 0.36rem;
    font-size: 0.24rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    line-height: 0.32rem
  }

  .seller-cart {
    width: 100%;
  }
</style>
