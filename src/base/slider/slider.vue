<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index}"></div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "common/js/dom.js";
export default {
  name: "Slider",
  data() {
    return {
      children: [],
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSilderWidth();
      this._initDots();
      this._initSlider();
      this._play();
      window.addEventListener("resize", () => {
        if (!this.slider) {
          return;
        }
        this._setSilderWidth(true);
        this.slider.refresh();
      });
    }, 20);
  },
  methods: {
    _setSilderWidth(isResize) {
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      this.children = this.$refs.sliderGroup.children;
      for (let i = 0; i < this.children.length; i++) {
        addClass(this.children[i], "slider-item");
        this.children[i].style.width = sliderWidth + "px";
        width += this.children[i].clientWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: { loop: this.loop, threshold: 0.3, Speed: 400 }
      });
      this.slider.on("scrollEnd", () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX;
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _play() {
      if (this.autoPlay) {
        this.timer = setTimeout(() => {
          let pageIndex = this.currentPageIndex + 1;
          //  this.slider.goToPage(pageIndex, 0, 400)
          this.slider.next(1000);
        }, this.interval);
      }
    }
  },
  destroyed(){
    clearTimeout(this.timer)
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;
  overflow: hidden;

  .slider-group {
    position: relative;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>