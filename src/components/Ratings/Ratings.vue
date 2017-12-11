<template>
  <div style="height: 100%">
    <div ref="ratWrapper" style="height: 100%">
      <div style="height: auto">
        <div class="rating-head">
          <div class="rating-head-left">
            <div class="left-score">
              <p class="left-score-score">{{seller.score}}</p>
              <p class="left-score-title">综合评分</p>
              <p class="left-score-rate">高于周围商家{{seller.rankRate}}%</p>
            </div>
          </div>
          <div class="rating-head-right">
            <ul>
              <li>
                <span class="right-score-title">服务态度</span>
                <stars :info="seller.serviceScore"></stars>
                <span class="right-score-score">{{seller.serviceScore}}</span>
              </li>
              <li>
                <span class="right-score-title">服务态度</span>
                <stars :info="seller.foodScore"></stars>
                <span class="right-score-score">{{seller.foodScore}}</span>
              </li>
              <li><span class="right-score-title"> 送达时间</span>
                <span class="right-score-score mintes">{{seller.deliveryTime}}分钟</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="manyi-head">
          <ul>
            <li class="manyi yi" @click="type=2" :class="{click:type==2}">全部 <span>{{ratings.length}}</span></li>
            <li class="manyi er" @click="type=0" :class="{click:type==0}">满意{{stnum}}</li>
            <li class="manyi san" @click="type=1" :class="{click:type==1}">不满意{{unstnum}}</li>
          </ul>
          <div style="clear: both"></div>
          <ul>
            <li class="see" @click="content"><span class="icon-check_circle dui" :class="{bianse:con}"></span>只看有内容的评价
            </li>
          </ul>
        </div>
        <div class="rats">
          <div v-for="rat in ratings" class="xunhuan" v-if="rat.rateType==type || type==2" v-show="rat.show">
            <div class="touxiang"><img :src="rat.avatar" alt=""></div>
            <div class="rat-min">
              <p class="username">{{rat.username}}</p>
              <span><stars :info="rat.score"></stars></span>
              <span>{{rat.deliveryTime}}分钟送达</span>
              <p class="rat-text">{{rat.text}}</p>
              <ul>
                <span class="icon-thumb_up" v-if="rat.rateType==0" :class="{zan:rat.zan}"
                      @click="rat.zan=!rat.zan"></span>
                <span class="icon-thumb_down" v-if="rat.rateType==1" :class="{zan:rat.zan}"
                      @click="rat.zan=!rat.zan"></span>
                <li v-for="recommen in rat.recommend">
                  {{recommen}}
                </li>
              </ul>
            </div>
            <div class="rat-right">{{rat.rateTime | time}}</div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';
  import ShopCart from '../ShopCart/ShopCart.vue';
  import Stars from '../Stars/Stars.vue';
  import BetterScroll from 'better-scroll';


  Vue.filter('time', function (val) {
    let year = new Date(val).getFullYear();
    let month = new Date(val).getMonth() + 1;
    let day = new Date(val).getDate();
    let hour = new Date(val).getHours();
    let Minutes = new Date(val).getMinutes();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    hour = hour > 9 ? hour : '0' + hour;
    Minutes = Minutes > 9 ? Minutes : '0' + Minutes;
    let a = year + "-" + month + '-' + day + ' ' + hour + ':' + Minutes;
    return a;
  });

  export default {
    props: ['goods', 'ratings', 'seller'],
    data() {
      return {
        stnum: 0,
        unstnum: 0,
        type: 2,
        rat: true,
        con: false,
        msg: null
      }
    },
    created() {
      let that = this;
      that.ratings.forEach((rat) => {
        Vue.set(rat, 'show', true);
        Vue.set(rat, 'zan', false);
        if (rat.rateType == 0) {
          this.stnum++;
        } else {
          this.unstnum++;
        }
      });
      that.$nextTick(() => {
        that.menuScroll = new BetterScroll(that.$refs.ratWrapper, {
          click: true
        });
      })
    },
    components: {
      Stars,
      ShopCart
    },
    computed: {
      sellinfo() {
        let foodss = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.cont) {
              foodss.push(food);
            }
          })
        });
        return foodss;
      }
    },
    methods: {
      content() {
        if (this.con == false) {
          this.ratings.forEach((rt) => {
            if (rt.text != '') {
            } else {
              rt.show = false;
            }
          });
          this.con = true
        } else {
          this.ratings.forEach((rt) => {
            rt.show = true;
          });
          this.con = false;
        }
      },

    }

  };


</script>

<style>
  .rating-head {
    width: 100%;
    margin-top: 0.1rem;
    background: #fff;
    height: 2.04rem;
    display: flex;
  }

  .rating-head-left {
   flex: 0 0 2.75rem;
    margin-left: 0.36rem;
  }

  .rating-head-left .left-score {
    margin: 0.36rem 0;
    border-right: 0.01rem solid #f3f5f7;
  }

  .rating-head-left .left-score .left-score-score {
    font-size: 0.48rem;
    color: rgb(255, 153, 0);
    line-height: 0.56rem;
  }

  .rating-head-left .left-score .left-score-title {
    font-size: 0.24rem;
    color: rgb(7, 17, 27);
    line-height: 0.24rem;
    margin: 0.12rem 0 0.16rem;
    font-weight: 600;
  }

  .rating-head-left .left-score .left-score-rate {
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
    line-height: 0.2rem;
  }

  .rating-head-right {
    flex: 0 0 4.74rem;
  }

  .rating-head-right ul {
    margin: 0.36rem 0.48rem 0 0;
    text-align: left;
  }

  .rating-head-right ul li {
    margin-top: 0.16rem;
  }

  .rating-head-right ul li div {
    display: inline-block
  }

  .rating-head-right ul li img {
    margin-left: 0.08rem;
    width: 0.22rem;
  }

  .rating-head-right .right-score-title {
    font-size: 0.24rem;
    color: rgb(7, 17, 27);
    line-height: 0.36rem;
    padding: 0rem 0 0rem 0.35rem;
    font-weight: 600;
  }

  .rating-head-right .right-score-score {
    font-size: 0.24rem;
    line-height: 0.36rem;
    color: rgb(255, 153, 0);
    padding-left: 0.15rem;
  }

  .rating-head-right .right-score-score.mintes {
    color: rgb(147, 153, 159)
  }

  .manyi-head {
    margin-top: 0.36rem;
    background: #fff;
    width: 100%;
    height: 2.4rem
  }

  .manyi-head ul {
    margin-left: 0.36rem;
    margin-right: 0.36rem;
    text-align: left
  }

  .manyi-head ul li.manyi {
    float: left;
    margin: 0.36rem 0.18rem 0.36rem 0;
    height: 0.72rem;
    padding: 0 0.36rem;
    font-size: 0.24rem;
    line-height: 0.72rem;
    border-radius: 0.05rem
  }

  .manyi-head ul li.manyi.yi {
    background: rgb(0,160,220);
    color: #fff
  }
  .manyi-head ul li.manyi.yi.click {
    background: blue;
  }

  .manyi-head ul li.manyi.er {
    background: rgba(0,160,220,0.2);
  }

  .manyi-head ul li.manyi.er.click {
    background: rgba(0,160,220,0.4);
  }

  .manyi-head ul li.manyi.san {
    background: rgba(77,85,93,0.2);
  }
  .manyi-head ul li.manyi.san.click {
    background: rgba(77,85,93,0.4);
  }

  .manyi-head ul li.see {
    display: flex;
    line-height: 0.72rem;
    font-size: 0.24rem;
    color: rgb(147, 153, 159);
    border-top: 0.01rem solid #f3f5f7
  }

  .manyi-head ul li.see span.dui {
    flex: 0 0 0.48rem;
    padding-right: 0.05rem;
    font-size: 0.48rem;
    display: inline-block;
    margin-top: 0.07rem;
  }

  .manyi-head ul li.see span.dui.bianse {
    color: rgb(0, 160, 220)
  }

  .rats {
    width: 100%;
    border-top: 0.1rem solid #f3f5f7;
    background: #fff;
    padding-bottom: 0.92rem;
  }

  .rats .xunhuan {
    margin: 0.36rem 0.24rem 0.36rem 0.36rem;
    border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
  }

  .rats .xunhuan .touxiang {
    width: 0.56rem;
    height:0.56rem;
    border-radius: 50%;
    float: left
  }

  .rats .xunhuan .touxiang img {
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%
  }

  .rats .xunhuan .rat-min {
    text-align: left;
    margin-left: 0.24rem;
    float: left;
    width: 80%
  }

  .rats .xunhuan .rat-min .username {
    font-size: 0.2rem;
    color: rgb(7, 17, 27);
    margin-bottom: 0.08rem;
  }

  .rats .xunhuan .rat-min img {
    width: 0.24rem;
    height: 0.24rem;
    margin-right: 0.05rem;
  }

  .rats .xunhuan .rat-min span {
    float: left;
    font-size: 0.2rem;
    color: rgb(147, 153, 159);
    line-height: 0.24rem;
    font-weight: 200;
  }

  .rats .xunhuan .rat-min .rat-text {
    clear: both;
    color: rgb(7, 17, 27);
    font-size: 0.24rem;
    line-height: 0.36rem;
    padding-top: 0.12rem
  }

  .rats .xunhuan ul {
    width: 100%;
    min-height: 0.32rem;
    margin-bottom: 0.36rem;
    margin-top: 0.16rem
  }

  .rats .xunhuan .rat-min ul span.zan {
    color: rgb(0, 160, 220)
  }

  .rats .xunhuan ul li {
    float: left;
    border: 0.02rem solid rgba(7, 17, 27, 0.1);
    padding: 0 0.12rem;
    line-height: 0.32rem;
    color: rgb(147, 153, 157);
    font-size: 0.18rem;
    margin-left: 0.16rem;
    margin-bottom: 0.12rem;
    max-width: 1.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 0.01rem
  }

  .rats .rat-right {
    position: absolute;
    right: 0.36rem;
    font-size: 0.2rem;
    font-weight: 200;
    color: rgb(147, 153, 157)
  }

  .seller-cart {
    width: 100%;
  }
</style>
