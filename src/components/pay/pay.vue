<template>
    <div class="pay" v-if="sellinfo!=null">
      <div class="zong">
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
</template>
<script>
  import Shop from '../Shop/Shop.vue';
    export default {
      props:['sellinfo'],
      data(){
        return {

        }
      },
      created(){
        console.log(this.sellinfo);
      },
      components:{
        Shop
      }
    }

</script>
<style>
  .pay{position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 20;
  }
  .zong{
    margin: 0.2rem 0.2rem;

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
</style>
