<template>
  <div class="info">
    <p class="myname">{{sell.name}}</p>
    <div class="stars">
      <stars :info="sell.score"></stars>
    </div>
    <div class="youhui">
      <div class="adv-line left">
      </div>
      <div class="adv-head"><span>优惠信息</span></div>
      <div class="adv-line right">
      </div>
    </div>

    <div style="clear: both"></div>
    <div class="adv-msg">
      <div v-for="support in sell.supports" class="support">
        <span :class="classes[support.type]"></span>
        <span class="text">{{support.description}}</span>
      </div>
    </div>
    <div class="gonggao">
      <div class="adv-line left">
      </div>
      <div class="adv-head"><span>商家公告</span></div>
      <div class="adv-line right">
      </div>
    </div>
    <div style="clear: both"></div>
    <div class="gonggaocont">
      {{sell.bulletin}}
    </div>
    <div class="close" @click="send">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Stars from '../Stars/Stars.vue';
  import BetterScroll from 'better-scroll';

  export default {
    props: ['flag', 'sell'],
    data() {
      return {
        fl: '',
        classes: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        sjScroll: null
      }
    },
    created() {

    },
    methods: {
      send() {
        this.fl = false;
        this.$emit('sendMsg', this.fl);
      }
    },
    components: {
      Stars
    }
  }
</script>

<style>
  .info {
    text-align: center;
    position: absolute;
    top: 0;
  }

  .myname {
    font-size: 0.32rem;
    color: #fff;
    font-weight: bold;
    line-height: 0.36rem;
    text-align: center;
    margin: 1.28rem 0 0.32rem
  }

  .stars {
    margin-left: 13%;
    width: 70%;
    height: 0.48rem;
    margin-bottom: 0.56rem;
  }

  .stars div {
    width: 100%;
  }

  .stars div img {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0 0.15rem
  }

  .youhui {
    width: 100%;
    height: 0.24rem;
  }

  .youhui .adv-line {
    width: 2.24rem;
    height: 0.03rem;
    background: rgba(255, 255, 255, 0.2);
    float: left;
  }
  .youhui .adv-line.left{
    margin:0 0.2rem 0 0.72rem;
  }
  .youhui .adv-line.right{
    margin:0 0.72rem 0 0.24rem;
  }

  .youhui .adv-head {
    font-size: 0.28rem;
    color: rgb(255, 255, 255);
    font-weight: 700;
    text-align: center;
    float: left;
    margin-top: -0.12rem;
  }

  .adv-msg {
    line-height: 0.24rem;
    font-size: 0.24rem;
    color: rgb(255, 255, 255);
    margin-top: 0.48rem;
    text-align: left;
    width: 80%;
    margin: 0 auto;
    font-weight: 200;
    margin-bottom: 0.56rem;
    margin-left: 0.96rem;
  }

  .adv-msg div.support {
    width: 100%;
    margin-top: 0.24rem;
    position: relative;
    height: 0.24rem;
  }

  .adv-msg div.support span.decrease {
    height: 0.32rem;
    width: 0.32rem;
    display: block;
    position: absolute;
    background: url("./images/decrease_2@2x.png") no-repeat;
    background-size: 100% 100%
  }

  .adv-msg div.support span.discount {
    height: 0.32rem;
    width: 0.32rem;
    display: block;
    position: absolute;
    background: url("./images/discount_2@2x.png") no-repeat;
    background-size: 100% 100%
  }

  .adv-msg div.support span.guarantee {
    height: 0.32rem;
    width: 0.32rem;
    display: block;
    position: absolute;
    background: url("./images/guarantee_2@2x.png") no-repeat;
    background-size: 100% 100%
  }

  .adv-msg div.support span.invoice {
    height: 0.32rem;
    width: 0.32rem;
    display: block;
    position: absolute;
    background: url("./images/invoice_2@2x.png") no-repeat;
    background-size: 100% 100%
  }

  .adv-msg div.support span.special {
    height: 0.32rem;
    width: 0.32rem;
    display: block;
    position: absolute;
    background: url("./images/special_2@2x.png") no-repeat;
    background-size: 100% 100%
  }

  .adv-msg div.support .text {
    display: block;
    position: absolute;
    left: 0.5rem;
    top: 0.05rem
  }

  .gonggao {
    width: 100%;
    height: 0.24rem;
    line-height: 0.28rem;
    margin-top: 0.56rem;
  }

  .gonggao .adv-line {
    width: 2.24rem;
    height: 0.03rem;
    background: rgba(255, 255, 255, 0.2);
    float: left;
  }
  .gonggao .adv-line.left{
    margin:0 0.2rem 0 0.72rem;
  }
  .gonggao .adv-line.right{
    margin:0 0.72rem 0 0.24rem;
  }
  .gonggao .adv-head {
    font-size: 0.28rem;
    color: rgb(255, 255, 255);
    font-weight: 700;
    text-align: center;
    float: left;
    margin-top: -0.12rem;
  }

  .gonggaocont {
    text-align: left;
    font-size: 0.24rem;
    line-height: 0.48rem;
    color: rgb(255, 255, 255);
    margin: 0.36rem 0.96rem 0.5rem;
  }

  .close {
    width: 100%;
    position: fixed;
    top: 85%;
    text-align: center;
    font-size: 0.64rem;
    color: rgb(255, 255, 255);
  }
</style>
