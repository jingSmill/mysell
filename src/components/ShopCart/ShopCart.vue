<template>
  <div class="shop-cart" v-if="sellinfo!=null">
    <span class="icon-shopping_cart cart" :class="{blue:compu!=0}" @click="show"></span>
    <span class="number" v-show="compu!=0">{{compu}}</span>
    <span class="allprice jiaqian" :class="{changda:compu!=0}">￥{{muchmoney}}</span>
    <span
      style="padding:0 0.12rem 0;color: rgba(255,255,255,0.1);font-size: 0.48rem;text-align: center;margin-right: 0.02rem;line-height: 0.85rem;">|</span>
    <span class="ling">另需配送{{datas.deliveryPrice}}元</span>
    <span class="qisong allprice" :class="{jiesuan:muchmoney>=datas.minPrice}">
        <span v-if="compu==0">{{datas.minPrice}}￥起送</span>
        <span v-if="compu!=0&&muchmoney<datas.minPrice">
          还差￥{{datas.minPrice - muchmoney}}起送
        </span>
        <span v-if="muchmoney>=datas.minPrice" @click="pay">
          结算
        </span>
      </span>

    <div v-show="flag&&compu!=0" class="food-list">
      <div class="food-list-head">
        <span>购物车</span>
        <span style="color: rgb(0,160,220);display: block;
        float: right;margin-right: 0.36rem" @click="clear">清空</span>
      </div>
      <div style="margin-left: 0.36rem;margin-right: 0.36rem;max-height: 4rem;overflow: hidden"  ref="shopcart">
        <div>
        <div v-for="food in sellinfo" class="eve">
          <span class="span onee" style="flex:0 0 60%;background: #fff">{{food.name}}</span>
          <div class="span" style="flex:0 0 40%;margin-right: 0rem;">
            <span class="span twoo">￥<span>{{food.price}}</span></span>
            <span class="span last"><shop :food="food"></shop></span>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
      </div>
    </div>
    <div class="mentb" v-if="flag&&compu!=0">
    </div>
    <pay v-if="payflag" :sellinfo="sellinfo"></pay>
  </div>
</template>
<script>
  import pay from '../pay/pay.vue';
  import axios from 'axios';
  import Shop from '../Shop/Shop.vue';
  import BetterScroll from 'better-scroll';
  export default {
    props: ['sellinfo'],
    data() {
      return {
        datas: '',
        flag: false,
        shopScroll:null,
        payflag:false
      }
    },
    computed: {
      compu() {
        let cont = 0;
        this.sellinfo.forEach((food) => {
          cont += food.cont;
        });
        return cont;
      },
      muchmoney() {
        let money = 0;
        this.sellinfo.forEach((food) => {
          money += food.cont * food.price;
        });
        return money;
      }
    },
    created() {
      let that = this;
      axios.get('/api/seller')
        .then((res) => {
          that.datas = res.data.data;
        }).catch((err) => {
        console.log(err)
      });
    },
    components: {
      Shop,
      pay
    },
    methods: {
      show() {
        this.flag = !this.flag;
        this.$nextTick(()=>{
            if(this.shopScroll==null){
              this.shopScroll = new BetterScroll(this.$refs.shopcart, {
                click: true
              });
            }else{
              this.shopScroll.refresh();
            }
        })
      },
      clear() {
        this.sellinfo.forEach((food) => {
          food.cont = 0;
        });
        this.flag = false;
      },
      pay() {
        this.payflag=true;
      }
    }
  }

</script>
<style>
  .shop-cart {
    background: #141d27;
    position: fixed;
    bottom: 0;
    height: 0.92rem;
    text-align: left;
    z-index: 100;
    display: flex
  }

  .cart {
    font-size: 0.48rem;
    color: rgba(255, 255, 255, 0.4);
    width: 0.88rem;
    display: inline-block;
    height: 0.88rem;
    border-radius: 50%;
    background: #2b343b;
    text-align: center;
    line-height: 0.1rem;
    border: 0.15rem solid #141d27;
    z-index: 10;
    position: absolute;
    left: 0.36rem;
    top: -0.32rem;
    line-height: 0.88rem;
  }

  .blue {
    background: rgb(0, 160, 220);
    color: rgb(255, 255, 255);
    z-index: 10;
  }

  .allprice {
    color: rgba(255, 255, 255, 0.4);
    display: block;
    font-size: 0.32rem;
    line-height: 0.92rem;
    font-weight: 700;
    margin-left: 0.16rem;
    float: left;
  }

  .jiaqian {
    margin-left: 1.5rem
  }

  .changda {
    color: rgb(255, 255, 255);
  }

  .ling {
    color: rgba(255, 255, 255, 0.4);
    z-index: 10;
    display: inline-block;
    font-size: 0.2rem;
    line-height: 0.92rem;
  }

  .qisong {
    display: block;
    float: right;
    width: 2.1rem;
    height: 0.92rem;
    background: #2b343b;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 0rem;
    font-size: 0.24rem
  }

  .qisong.jiesuan {
    color: #fff;
    background: red
  }

  .number {
    position: absolute;
    display: block;
    width: 0.58rem;
    top: -0.32rem;
    background: rgb(240, 20, 20);
    line-height: 0.48rem;
    color: rgb(255, 255, 255);
    border-radius: 0.12rem;
    text-align: center;
    left: 0.98rem;
    font-size: 0.18rem;
    z-index: 11;
  }

  .food-list {
    position: absolute;
    bottom: 0.92rem;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    max-height: 4.8rem;
    background: #fff;
  }

  .food-list-head {
    height: 0.8rem;
    background: #f3f5f7;
    line-height: 0.8rem;
    font-size: 0.28rem;
    width: 100%;
  }

  .food-list-head span {
    display: block;
    float: left;
    margin-left: 0.36rem
  }

  .eve {
    height: 0.96rem;
    background: #fff;
    line-height: 0.96rem;
    font-size: 0.28rem;
    border-bottom: 0.01rem solid #f3f5f7;
    display: flex
  }

  .eve .span {
    display: block;
    float: left;
    line-height: 0.8rem;
  }

  .eve .onee {
    font-size: 0.28rem;
    color: rgb(7, 17, 27);
  }

  .eve .span .twoo {
    color: rgb(240, 20, 20);
    font-size: 0.2rem;
    font-weight: normal;
    float: left;
    margin-left: 0.26rem;
    line-height: 1rem;
  }

  .eve .span .two span {
    font-size: 0.28rem;
  }

  .eve .span .last {
    float: right;
    width: 1.26rem
  }

  .eve .span .last .shop {
    width: 1.26rem
  }

  .eve .span .last span {
    line-height: 0.96rem;
  }

  .mentb {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.6);
    bottom: 0.92rem;
    filter: blur(0.01rem);
    left: 0;
    z-index: -1;
  }
</style>
