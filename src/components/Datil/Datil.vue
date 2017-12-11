<template>
  <div class="dat" ref="datil">
    <div>
        <div class="imgbig">
          <span @click="over" class="icon-arrow_lift reback"></span>
          <img :src="food.image" alt="">
        </div>
        <div class="blockone">
          <p class="blockone-name">{{food.name}}</p>
          <p class="xiaoliang"><span>月售{{food.sellCount}}份</span><span
            style="padding-left: 2.4rem">好评率{{food.rating}}%</span></p>
          <p class="dat-pr">
            <span class="dat-price">￥<span>{{food.price}}</span></span>
            <span v-if="food.oldPrice!=''" class="dat-oldprice">￥{{food.oldPrice}}</span>
          </p>
          <div class="dat-cart" @click="addFoods">
            加入购物车
          </div>
        </div>
        <div class="dat-gonggao" v-if="food.info!=''">
          <p class="jstitle">商品介绍</p>
          <div class="jscont">
            {{food.info}}
          </div>
        </div>
        <div class="dat-gonggao">
          <p class="jstitle">商品评价</p>
          <ul>
            <li class="manyi yi" @click='type=2' :class="{click:type==2}">全部 <span>{{food.ratings.length}}</span></li>
            <li class="manyi er" @click='type=0' :class="{click:type==0}">满意  <span>{{manyi[0]}}</span></li>
            <li class="manyi san" @click="type=1" :class="{click:type==1}">不满意 <span>{{manyi[1]}}</span></li>
          </ul>
          <ul style="margin-bottom: 0;">
            <li class="see" @click="content"><span class="icon-check_circle dui" :class="{lan:con}"></span>只看有内容的评价</li>
          </ul>
        </div>
        <div class="ratingss">
          <div v-for="(rate,index) in food.ratings" class="rati" v-if="rate.rateType==type || type==2" v-show="rate.show">
            <p class="rate-one">
              <span class="time t1">{{rate.rateTime | time}}</span>
              <span class="time t2">{{rate.username}}</span>
              <span class="t3"><img :src="rate.avatar" alt=""></span>
            </p>
            <p class="rate-text">
              <span class="icon-thumb_up" v-if="rate.rateType==0" :class="{zan:rate.zan}" @click="dianzan(index)"></span>
              <span class="icon-thumb_down" v-if="rate.rateType==1" :class="{zan:rate.zan}"
                    @click="dianzan(index)"></span>
              {{rate.text}}
            </p>
          </div>
        </div>
    </div>


  </div>
</template>
<script>
  import Vue from 'vue';
  import BetterScroll from 'better-scroll';

  Vue.filter('time', function (val) {
    let year = new Date(val).getFullYear();
    let month = new Date(val).getMonth() + 1;
    let day = new Date(val).getDate();
    let hour = new Date(val).getHours();
    let Minutes = new Date(val).getMinutes();
    let seconds = new Date(val).getSeconds();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    hour = hour > 9 ? hour : '0' + hour;
    Minutes = Minutes > 9 ? Minutes : '0' + Minutes;
    let a = year + "-" + month + '-' + day + ' ' + hour + ':' + Minutes;
    return a;
  });

  export default {
    props: ['food'],
    data() {
      return {
        up: null,
        type: 2,
        con: false,
        flag: false,
        datilScroll:null
      }
    },
    created(){

        this.$nextTick(() => {  //保证数据更新后引起的DOM更新之后会调用
          this.datilScroll = new BetterScroll(this.$refs.datil, {
            click: true
          });
        })
    },
    methods: {
      over() {
        this.$emit('send', this.up);
      },
      addFoods() {
        if (!this.food.cont) {
          Vue.set(this.food, 'cont', 1);
        } else {
          this.food.cont++;
        }
      },
      content() {
        if (this.con == false) {
          this.food.ratings.forEach((rt) => {
            Vue.set(rt, 'show', true);
            if (rt.text != '') {
              rt.show = true;
            } else {
              rt.show = false;
            }
          });
          this.con = true
        } else {
          this.food.ratings.forEach((rt) => {
            rt.show = true;
          });
          this.con = false;
        }
      },
      dianzan(index) {
        if (this.food.ratings[index].zan == undefined) {
          Vue.set(this.food.ratings[index], 'zan', true);
        } else {
          if (this.food.ratings[index].zan == false) {
            this.food.ratings[index].zan = true;
          } else {
            this.food.ratings[index].zan = false;
          }
        }
      }
    },
    computed:{
      manyi(){
        let attiu=[];
        let i=0;
        let j=0;
        this.food.ratings.forEach((my)=>{
          if (my.rateType==0){
            i++;
          }else{
            j++;
          }
        });
        attiu.push(i);
        attiu.push(j);
        return attiu;
      }
    }
  }

</script>
<style>
  .dat {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-bottom: 0.9rem;
  }
  .imgbig {
    height: 7.5rem;
    width: 100%;
  }

  .imgbig span.reback {
    display: block;
    position: absolute;
    font-size: 0.36rem;
    color: #fff;
    margin: 0.15rem 0 0 0.15rem
  }

  .imgbig img {
    width: 100%;
    height: 100%;
  }

  .blockone {
    width: 100%;
    background: #fff;
    height: 1.6rem;
    padding-top: 0.36rem;
    text-align: left;
    margin-right: 0.36rem;
    padding-left: 0.36rem;
  }

  .blockone-name {
    text-align: left;
    color: rgb(7, 17, 27);
    font-size: 0.28rem;
    font-weight: 700;
  }

  .xiaoliang {
    margin-top: 0.16rem;
    color: rgb(147, 153, 159);
    font-size: 0.2rem;
    line-height: 0.2rem;
  }

  .dat-pr {
    font-size: 0.2rem;
    font-weight: normal;
    margin-top:0.36rem;
    float: left
  }

  .dat-price {
    color: rgb(240, 20, 20);
    line-height: 0.48rem;
  }

  .dat-price span {
    font-size: 0.28rem;
    font-weight: 700
  }

  .dat-oldprice {
    color: rgb(147, 153, 159);
    text-decoration: line-through;
    padding-left: 0.05rem;
  }

  .dat-cart {
    float: right;
    margin-right: 0.72rem;
    background: rgb(0, 160, 220);
    width: 1.48rem;
    border-radius: 0.48rem;
    line-height: 0.48rem;
    color: rgb(255, 255, 255);
    font-size: 0.2rem;
    text-align: center;
    margin-top: 0.36rem;
    padding: 0 0.12rem;
  }

  .dat-gonggao {
    margin-top: 0.32rem;
    width: 100%;
    background: #fff;
    text-align: left;
    height: auto;
  }

  .jstitle {
    padding: 0.36rem 0 0 0.36rem;
    color: rgb(7, 17, 27);
    font-size: 0.28rem;
    font-weight: 700;
  }

  .jscont {
    margin: 0 0.36rem 0;
    text-align: left;
    line-height: 0.48rem;
    color: rgb(77, 85, 93);
    font-size: 0.24rem;
    font-weight: 200;
  }

  .dat-gonggao ul {
    margin: 0.36rem;
    text-align: left;
    background: #fff;
    display: flex;
  }

  .dat-gonggao ul li.manyi {
    margin-right: 0.16rem;
    height: 0.72rem;
    padding: 0 0.36rem;
    font-size: 0.24rem;
    line-height: 0.72rem;
    border-radius: 0.05rem
  }

  .dat-gonggao ul li.manyi.yi {
    background: rgb(0,160,220);
    color: #fff
  }
  .dat-gonggao ul li.manyi.yi.click{
    background: blue;
  }

  .dat-gonggao ul li.manyi.er {
    background: rgba(0,160,220,0.2);
  }

  .dat-gonggao ul li.manyi.er.click{
    background: rgba(0,160,220,0.4);
  }


  .dat-gonggao ul li.manyi.san {
    background: rgba(77,85,93,0.2);
  }

  .dat-gonggao ul li.manyi.san.click{
    background: rgba(77,85,93,0.4);
  }

  .dat-gonggao ul li.see {
    display: flex;
    line-height: 0.72rem;
    font-size: 0.24rem;
    color: rgb(147, 153, 159);
    border-top: 0.01rem solid #f3f5f7
  }

  .dat-gonggao ul li.see span.dui {
    flex: 0 0 0.48rem;
    padding-right: 0.05rem;
    font-size: 0.48rem;
    display: inline-block;
    margin-top: 0.07rem;
  }

  .dat-gonggao ul li.see span.dui.lan {
    color: rgb(0, 160, 220);
  }

  .ratingss {
    width: 100%;
    height: auto;
    background: #fff;
    padding-bottom: 0.9rem;
    margin-top: 0.02rem solid #f3f5f7;
  }

  .rati {
    margin: 0 0.36rem;
    padding-top: 0.36rem;
    border-bottom: 0.01rem solid #f3f5f7;
  }

  .time {
    color: rgb(147, 153, 159);
    font-size: 0.2rem;
    line-height: 0.24rem;
  }

  .rate-one {
    display: flex
  }

  .rate-one span {
  }

  .rate-one span.t1 {
    flex: 0 0 3rem;
    text-align: left;
  }

  .rate-one span.t2 {
    flex: 0 0 3rem;
    text-align: right;
    padding-right: 0.12rem
  }

  .rate-one span.t3 {
    flex: 0 0 0.24rem
  }

  .rate-one span.t3 img {
    width: 0.24rem;
    height: 0.24rem;
    border-radius: 50%
  }

  .rate-text {
    font-size: 0.24rem;
    color: rgb(147, 153, 157);
    line-height: 0.32rem;
    margin-top: 0.12rem;
    text-align: left;

    margin-bottom: 0.24rem
  }

  .rate-text span.zan {
    color: rgb(0, 160, 220)
  }

</style>
